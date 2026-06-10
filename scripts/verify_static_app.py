from pathlib import Path
from playwright.sync_api import sync_playwright


PROJECT_ROOT = Path(__file__).resolve().parents[1]
APP_HTML = PROJECT_ROOT / "src" / "app" / "index.html"


def main() -> None:
    file_url = APP_HTML.resolve().as_uri()
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
        page.goto(file_url, wait_until="networkidle")

        title = page.title()
        if "ControlRookie" not in title:
            raise SystemExit("页面 title 异常。")

        description = page.locator("meta[name='description']").get_attribute("content")
        if not description or "AI" not in description:
            raise SystemExit("SEO description 异常。")

        data_loaded = page.evaluate("Boolean(window.CONTROLROOKIE_SITE_DATA && window.CONTROLROOKIE_SITE_DATA.articles.length)")
        if not data_loaded:
            raise SystemExit("内容数据源未加载。")

        for selector in [
            ".portrait-image",
            "img[src*='wechat-peaceandbless-qr.jpg']",
            "img[src*='wechat-official-account-controlrookie-qr.jpg']",
        ]:
            loaded = page.locator(selector).evaluate("node => node.complete && node.naturalWidth > 0")
            if not loaded:
                raise SystemExit(f"素材未正常加载: {selector}")

        page.click("#searchButton")
        page.fill("#siteSearch", "MQTT")
        page.wait_for_timeout(200)
        if "CODESYS MQTT" not in page.locator("#searchPanel").inner_text():
            raise SystemExit("搜索 MQTT 未匹配文章结果。")

        page.keyboard.press("Escape")
        page.wait_for_timeout(120)
        expanded = page.locator("#searchButton").get_attribute("aria-expanded")
        if expanded != "false":
            raise SystemExit("搜索 Escape 收起失败。")

        page.click("#langToggle")
        page.wait_for_timeout(200)
        nav_text = page.locator(".nav-links").inner_text()
        if "Resources" not in nav_text or "Contact" not in nav_text:
            raise SystemExit("英文导航切换失败。")

        page.click("#langToggle")
        page.wait_for_timeout(200)
        nav_text = page.locator(".nav-links").inner_text()
        if "资源" not in nav_text or "联系" not in nav_text:
            raise SystemExit("中文导航切换失败。")

        for anchor in ["#works", "#articles", "#products", "#contact"]:
            page.goto(f"{file_url}{anchor}", wait_until="networkidle")
            page.wait_for_timeout(200)
            visible = page.locator(anchor).evaluate(
                "node => { const r = node.getBoundingClientRect(); return r.bottom > 0 && r.top < window.innerHeight; }"
            )
            if not visible:
                raise SystemExit(f"页面锚点不可见: {anchor}")

        browser.close()

    print("STATIC_APP_OK")


if __name__ == "__main__":
    main()
