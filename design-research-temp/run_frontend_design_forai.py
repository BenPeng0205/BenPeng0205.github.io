import asyncio, json, time, pathlib
import websockets

OUT = pathlib.Path(r"/tmp/frontend-design-forai")
OUT.mkdir(parents=True, exist_ok=True)

prompt = """
Generate a high-fidelity static HTML prototype that reconstructs the ForAI homepage style for comparison. Use one self-contained HTML file with inline CSS and JavaScript only.

ForAI visual evidence to match:
- White background, black and gray minimal palette, #565656 gray copy.
- Geist-like typography, zero letter spacing.
- Top navigation: left black dot + wordmark, centered nav Works / Services / Pricing / Testimonials / Mission / Archive, right black pill Contact.
- Hero has huge whitespace, centered title "Design ForAI" around 88px, thin clean weight; subtitle below in gray: "A creative design studio for AI companies."
- Below subtitle, centered glass/liquid/blurred grayscale sphere, soft edge, about 400px desktop.
- Continue below with works grid: eight black/white/gray cards named Ozone, Instant, IO.NET, ForAI Pocket Contact, B3 Future of Onchain Gaming, Rise Calendar, Garage Lab AI, 2030 Forecast by Doconomy.
- Include testimonials, mission, services, pricing and archive sections so the homepage feels complete.
- Static page plus simple hover/fade only; no complex scroll animation.
- No external assets; create visuals with CSS.

ControlRookie adaptation:
- Wordmark: ControlRookie.
- Hero title: Design ControlRookie.
- Subtitle: AI automation architecture for industrial engineers.
- Keep the ForAI structure, proportions, spacing, nav style and monochrome aesthetic. Do not create a generic SaaS landing page.
"""

async def main():
    started = time.time()
    payload = {
        "generatedCodeConfig": "html_css",
        "inputMode": "text",
        "generationType": "create",
        "isImageGenerationEnabled": False,
        "prompt": {"text": prompt, "images": [], "videos": []},
        "history": [],
        "optionCodes": [],
    }
    events=[]
    best_code=""
    async with websockets.connect("ws://127.0.0.1:7001/generate-code", max_size=20_000_000, ping_timeout=120) as ws:
        await ws.send(json.dumps(payload))
        deadline = time.time() + 420
        while time.time() < deadline:
            try:
                raw = await asyncio.wait_for(ws.recv(), timeout=45)
            except asyncio.TimeoutError:
                events.append({"type":"timeout_tick", "t": round(time.time()-started, 1)})
                continue
            msg = json.loads(raw)
            events.append({k: msg.get(k) for k in ("type","variantIndex","value") if k in msg})
            if msg.get("type") == "setCode" and isinstance(msg.get("value"), str):
                if len(msg["value"]) > len(best_code):
                    best_code = msg["value"]
                    (OUT / "index.html").write_text(best_code, encoding="utf-8")
            if msg.get("type") == "error":
                break
            if msg.get("type") == "variantComplete" and best_code:
                break
        try:
            await ws.close()
        except Exception:
            pass
    elapsed = round(time.time() - started, 2)
    (OUT / "generation-log.json").write_text(json.dumps({"elapsed_seconds": elapsed, "events": events[-100:], "code_length": len(best_code)}, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({"elapsed_seconds": elapsed, "code_length": len(best_code), "out": str(OUT / "index.html")}, ensure_ascii=False))

asyncio.run(main())