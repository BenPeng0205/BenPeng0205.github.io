from pathlib import Path
from playwright.sync_api import sync_playwright


PROJECT_ROOT = Path(__file__).resolve().parents[1]
ARTICLE = PROJECT_ROOT / "src" / "app" / "articles" / "mqtt-client-open-source-codesys-layer" / "index.html"


def main() -> None:
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 1000}, device_scale_factor=1)
        page.goto(ARTICLE.resolve().as_uri(), wait_until="networkidle")
        title = page.title()
        if "MQTT" not in title or "ControlRookie" not in title:
            raise SystemExit("文章页标题异常。")
        if page.locator(".article-hero").count() != 1:
            raise SystemExit("文章页 Hero 缺失。")
        if page.locator(".article-toc a").count() < 5:
            raise SystemExit("文章目录数量异常。")
        if page.locator(".article-content h2").count() < 5:
            raise SystemExit("文章正文标题层级异常。")
        if page.locator(".code-card").count() < 2:
            raise SystemExit("代码块未按官网样式渲染。")
        if page.locator(".mermaid-card").count() < 2:
            raise SystemExit("Mermaid 块未按官网样式渲染。")
        if page.locator(".article-table-wrap").count() < 1:
            raise SystemExit("表格未按官网样式渲染。")
        browser.close()
    print("ARTICLE_PAGES_OK")


if __name__ == "__main__":
    main()
