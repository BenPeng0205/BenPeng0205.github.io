from pathlib import Path
from playwright.sync_api import sync_playwright


PROJECT_ROOT = Path(__file__).resolve().parents[1]
APP_HTML = PROJECT_ROOT / "src" / "app" / "index.html"
OUTPUT_DIR = PROJECT_ROOT / "tests" / "visual" / "baseline"


def capture_baseline() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    file_url = APP_HTML.resolve().as_uri()

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
        page.goto(file_url, wait_until="networkidle")

        captures = [
            ("01-home-zh.png", "#top"),
            ("02-resources-zh.png", "#works"),
            ("03-articles-zh.png", "#articles"),
            ("04-products-zh.png", "#products"),
            ("05-contact-zh.png", "#contact"),
            ("08-about-zh.png", "#about"),
        ]

        for filename, anchor in captures:
            page.goto(f"{file_url}{anchor}", wait_until="networkidle")
            page.wait_for_timeout(350)
            page.screenshot(path=str(OUTPUT_DIR / filename), full_page=False)

        page.goto(file_url, wait_until="networkidle")
        page.click("#searchButton")
        page.fill("#siteSearch", "MQTT")
        page.wait_for_timeout(350)
        page.screenshot(path=str(OUTPUT_DIR / "06-search-mqtt-zh.png"), full_page=False)

        page.click("#langToggle")
        page.wait_for_timeout(350)
        page.screenshot(path=str(OUTPUT_DIR / "07-home-en.png"), full_page=False)

        browser.close()


if __name__ == "__main__":
    capture_baseline()
