from pathlib import Path
from playwright.sync_api import sync_playwright


PROJECT_ROOT = Path(__file__).resolve().parents[1]
ARTICLE = PROJECT_ROOT / "dist" / "articles" / "mqtt-client-open-source-codesys-layer" / "index.html"
OUTPUT = PROJECT_ROOT / "tests" / "visual" / "article-preview-mqtt-client-01.png"


def main() -> None:
    if not ARTICLE.exists():
        raise SystemExit("请先运行 scripts/build_static_site.py，再截取 dist 文章页预览。")
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 1200}, device_scale_factor=1)
        page.goto(ARTICLE.resolve().as_uri(), wait_until="networkidle")
        page.screenshot(path=str(OUTPUT), full_page=False)
        browser.close()
    print(f"ARTICLE_PREVIEW_OK {OUTPUT}")


if __name__ == "__main__":
    main()
