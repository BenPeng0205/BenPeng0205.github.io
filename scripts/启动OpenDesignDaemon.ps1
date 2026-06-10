param(
    [int]$Port = 7456,
    [string]$HostAddress = "127.0.0.1"
)

$ErrorActionPreference = "Stop"

$openDesignRoot = Get-ChildItem -LiteralPath "E:\" -Directory -Filter "99*" -ErrorAction SilentlyContinue |
    ForEach-Object { Join-Path $_.FullName "Open Design" } |
    Where-Object { Test-Path -LiteralPath (Join-Path $_ "Open Design.exe") } |
    Select-Object -First 1

if (-not $openDesignRoot) {
    throw "Open Design install root was not found under E:\99*."
}

$openDesignExe = Join-Path $openDesignRoot "Open Design.exe"
$daemonCli = Join-Path $openDesignRoot "resources\app\prebundled\daemon\daemon-cli.mjs"
$workdir = Join-Path $openDesignRoot "resources\app"

if (-not (Test-Path -LiteralPath $openDesignExe)) {
    throw "Open Design executable was not found: $openDesignExe"
}

if (-not (Test-Path -LiteralPath $daemonCli)) {
    throw "Open Design daemon CLI was not found: $daemonCli"
}

$listener = Get-NetTCPConnection -State Listen -ErrorAction SilentlyContinue |
    Where-Object { $_.LocalAddress -eq $HostAddress -and $_.LocalPort -eq $Port } |
    Select-Object -First 1

if ($listener) {
    Write-Output "Open Design daemon is already listening at http://$HostAddress`:$Port, PID: $($listener.OwningProcess)"
    exit 0
}

$psi = New-Object System.Diagnostics.ProcessStartInfo
$psi.FileName = $openDesignExe
$psi.WorkingDirectory = $workdir
$psi.UseShellExecute = $false
$psi.CreateNoWindow = $true
$psi.Arguments = '"' + $daemonCli + '" --port ' + $Port + ' --host ' + $HostAddress + ' --no-open'
$psi.EnvironmentVariables["ELECTRON_RUN_AS_NODE"] = "1"

$process = [System.Diagnostics.Process]::Start($psi)
Start-Sleep -Seconds 8

$listener = Get-NetTCPConnection -State Listen -ErrorAction SilentlyContinue |
    Where-Object { $_.LocalAddress -eq $HostAddress -and $_.LocalPort -eq $Port } |
    Select-Object -First 1

if (-not $listener) {
    if ($process.HasExited) {
        throw "Open Design daemon failed to start. Process exited with code: $($process.ExitCode)"
    }

    throw "Open Design daemon did not listen at http://$HostAddress`:$Port after startup. PID: $($process.Id)"
}

Write-Output "Open Design daemon started: http://$HostAddress`:$Port, PID: $($listener.OwningProcess)"
