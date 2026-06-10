from playwright.sync_api import sync_playwright


LIVE_URL = "https://benpeng0205.github.io/"


def main() -> None:
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
        page.goto(LIVE_URL, wait_until="networkidle")
        if "ControlRookie" not in page.title():
            raise SystemExit("线上标题异常。")
        for selector in [".portrait-image", "img[src*='wechat-peaceandbless-qr.jpg']", "img[src*='wechat-official-account-controlrookie-qr.jpg']"]:
            loaded = page.locator(selector).evaluate("node => node.complete && node.naturalWidth > 0")
            if not loaded:
                raise SystemExit(f"线上素材未加载: {selector}")
        page.click("#searchButton")
        page.fill("#siteSearch", "MQTT")
        page.wait_for_timeout(200)
        if "CODESYS MQTT" not in page.locator("#searchPanel").inner_text():
            raise SystemExit("线上搜索异常。")
        page.click("#langToggle")
        page.wait_for_timeout(200)
        if "Resources" not in page.locator(".nav-links").inner_text():
            raise SystemExit("线上双语切换异常。")
        browser.close()
    print("LIVE_SITE_OK")


if __name__ == "__main__":
    main()
