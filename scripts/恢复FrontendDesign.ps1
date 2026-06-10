param(
    [string]$FrontendDesignRoot = ""
)

$ErrorActionPreference = "Stop"

if ([string]::IsNullOrWhiteSpace($FrontendDesignRoot)) {
    $candidateRoot = Split-Path -Parent $PSScriptRoot
    if (Test-Path -LiteralPath (Join-Path $candidateRoot "docker-compose.yml")) {
        $FrontendDesignRoot = $candidateRoot
    } else {
        $FrontendDesignRoot = "E:\ai-relavant\frontenddesign-env"
    }
}

$codexAuthPath = Join-Path $env:USERPROFILE ".codex\auth.json"
$codexConfigPath = Join-Path $env:USERPROFILE ".codex\config.toml"
$composePath = Join-Path $FrontendDesignRoot "docker-compose.yml"
$envPath = Join-Path $FrontendDesignRoot ".env"

if (-not (Test-Path -LiteralPath $codexAuthPath)) {
    throw "Codex auth.json was not found: $codexAuthPath"
}

if (-not (Test-Path -LiteralPath $codexConfigPath)) {
    throw "Codex config.toml was not found: $codexConfigPath"
}

if (-not (Test-Path -LiteralPath $composePath)) {
    throw "FrontendDesign docker-compose.yml was not found: $composePath"
}

$auth = Get-Content -LiteralPath $codexAuthPath -Raw | ConvertFrom-Json
$openAiKey = [string]$auth.OPENAI_API_KEY
if ([string]::IsNullOrWhiteSpace($openAiKey)) {
    throw "Codex auth.json does not contain OPENAI_API_KEY."
}

$codexConfig = Get-Content -LiteralPath $codexConfigPath -Raw
$openAiBaseUrl = $null
if ($codexConfig -match '(?m)^base_url\s*=\s*"([^"]+)"') {
    $openAiBaseUrl = $Matches[1]
}
if ([string]::IsNullOrWhiteSpace($openAiBaseUrl)) {
    throw "Codex config.toml does not contain model provider base_url."
}

$openAiModel = $null
if ($codexConfig -match '(?m)^model\s*=\s*"([^"]+)"') {
    $openAiModel = $Matches[1]
}
if ([string]::IsNullOrWhiteSpace($openAiModel)) {
    $openAiModel = "gpt-5.5"
}

$envLines = @(
    "OPENAI_API_KEY=$openAiKey",
    "OPENAI_BASE_URL=$openAiBaseUrl",
    "OPENAI_MODEL=$openAiModel",
    "ANTHROPIC_API_KEY=",
    "GEMINI_API_KEY=",
    "REPLICATE_API_KEY=",
    "IS_DEBUG_ENABLED="
)
[System.IO.File]::WriteAllText(
    $envPath,
    [string]::Join("`r`n", $envLines) + "`r`n",
    [System.Text.UTF8Encoding]::new($false)
)

docker compose -f $composePath up -d --force-recreate backend frontend | Out-Host

$deadline = (Get-Date).AddSeconds(90)
do {
    Start-Sleep -Seconds 3
    $health = docker inspect frontend-design-backend --format "{{.State.Health.Status}}" 2>$null
} while ($health -ne "healthy" -and (Get-Date) -lt $deadline)

if ($health -ne "healthy") {
    throw "FrontendDesign backend did not become healthy."
}

$patchCode = @'
from pathlib import Path

path = Path("/app/llm.py")
text = path.read_text(encoding="utf-8")

if "import os" not in text.splitlines()[:5]:
    text = "import os\n" + text

old = "def get_openai_api_name(model: Llm) -> str:\n    return OPENAI_MODEL_CONFIG[model][\"api_name\"]\n"
new = "def get_openai_api_name(model: Llm) -> str:\n    override_model = os.environ.get(\"OPENAI_MODEL\")\n    if override_model:\n        return override_model\n    return OPENAI_MODEL_CONFIG[model][\"api_name\"]\n"

if old in text:
    text = text.replace(old, new)
elif "override_model = os.environ.get(\"OPENAI_MODEL\")" not in text:
    raise SystemExit("Could not patch get_openai_api_name.")

path.write_text(text, encoding="utf-8")
print("PATCH_OK")
'@
$patchB64 = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($patchCode))
docker exec -e FD_PATCH_B64=$patchB64 frontend-design-backend python -c "import os,base64; exec(base64.b64decode(os.environ['FD_PATCH_B64']).decode('utf-8'))" | Out-Host

docker restart frontend-design-backend | Out-Host

$deadline = (Get-Date).AddSeconds(90)
do {
    Start-Sleep -Seconds 3
    $health = docker inspect frontend-design-backend --format "{{.State.Health.Status}}" 2>$null
} while ($health -ne "healthy" -and (Get-Date) -lt $deadline)

if ($health -ne "healthy") {
    throw "FrontendDesign backend did not become healthy after patch restart."
}

$verifyCode = @'
import os, asyncio
from openai import AsyncOpenAI
from agent.providers.openai import OpenAIProviderSession
from agent.providers.factory import serialize_openai_tools
from agent.tools import canonical_tool_definitions
from llm import Llm, get_openai_api_name

async def main():
    assert os.environ.get("OPENAI_API_KEY")
    assert os.environ.get("OPENAI_BASE_URL")
    assert os.environ.get("OPENAI_MODEL")
    client = AsyncOpenAI(api_key=os.environ["OPENAI_API_KEY"], base_url=os.environ.get("OPENAI_BASE_URL"))
    response = await client.responses.create(model=os.environ["OPENAI_MODEL"], input="OK")
    text = getattr(response, "output_text", "") or ""
    print("RESPONSES_OK id_present=%s text_len=%d model=%s" % (bool(getattr(response, "id", None)), len(text), os.environ["OPENAI_MODEL"]))

    tools = serialize_openai_tools(canonical_tool_definitions(image_generation_enabled=False))
    session = OpenAIProviderSession(
        client=client,
        model=Llm.GPT_5_2_CODEX_HIGH,
        prompt_messages=[{"role": "user", "content": "Reply with OK only. Do not call tools."}],
        tools=tools,
    )
    events = {"assistant_delta": 0, "thinking_delta": 0, "tool_call_delta": 0}

    async def on_event(event):
        events[event.type] = events.get(event.type, 0) + 1

    turn = await session.stream_turn(on_event)
    await session.close()
    print("PROVIDER_OK api_model=%s text_len=%d tool_calls=%d assistant_events=%d" % (get_openai_api_name(Llm.GPT_5_2_CODEX_HIGH), len(turn.assistant_text or ""), len(turn.tool_calls), events.get("assistant_delta", 0)))

asyncio.run(main())
'@
$verifyB64 = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($verifyCode))
docker exec -e FD_VERIFY_B64=$verifyB64 frontend-design-backend python -c "import os,base64; exec(base64.b64decode(os.environ['FD_VERIFY_B64']).decode('utf-8'))" | Out-Host

$rows = @()
foreach ($line in [System.IO.File]::ReadAllLines($envPath, [System.Text.Encoding]::UTF8)) {
    $idx = $line.IndexOf("=")
    if ($idx -ge 0) {
        $name = $line.Substring(0, $idx)
        $value = $line.Substring($idx + 1)
        $rows += [pscustomobject]@{ Name = $name; Present = ($value.Length -gt 0); Length = $value.Length }
    }
}
$rows | Format-Table -AutoSize
