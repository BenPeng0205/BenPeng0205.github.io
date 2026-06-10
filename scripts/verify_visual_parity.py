from pathlib import Path
from PIL import Image, ImageChops, ImageStat
from playwright.sync_api import sync_playwright


PROJECT_ROOT = Path(__file__).resolve().parents[1]
APP_HTML = PROJECT_ROOT / "src" / "app" / "index.html"
BASELINE_DIR = PROJECT_ROOT / "tests" / "visual" / "baseline"
CURRENT_DIR = PROJECT_ROOT / "tests" / "visual" / "current"

CAPTURES = [
    ("01-home-zh.png", "#top"),
    ("02-resources-zh.png", "#works"),
    ("03-articles-zh.png", "#articles"),
    ("04-products-zh.png", "#products"),
    ("05-contact-zh.png", "#contact"),
]


def capture_current() -> None:
    CURRENT_DIR.mkdir(parents=True, exist_ok=True)
    file_url = APP_HTML.resolve().as_uri()

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900}, device_scale_factor=1)

        for filename, anchor in CAPTURES:
            page.goto(f"{file_url}{anchor}", wait_until="networkidle")
            page.wait_for_timeout(350)
            page.screenshot(path=str(CURRENT_DIR / filename), full_page=False)

        page.goto(file_url, wait_until="networkidle")
        page.click("#searchButton")
        page.fill("#siteSearch", "MQTT")
        page.wait_for_timeout(350)
        page.screenshot(path=str(CURRENT_DIR / "06-search-mqtt-zh.png"), full_page=False)

        page.click("#langToggle")
        page.wait_for_timeout(350)
        page.screenshot(path=str(CURRENT_DIR / "07-home-en.png"), full_page=False)
        browser.close()


def image_difference_ratio(expected: Path, actual: Path) -> float:
    with Image.open(expected).convert("RGB") as baseline, Image.open(actual).convert("RGB") as current:
        if baseline.size != current.size:
            return 1.0
        diff = ImageChops.difference(baseline, current)
        stat = ImageStat.Stat(diff)
        mean = sum(stat.mean) / len(stat.mean)
        return mean / 255


def main() -> None:
    capture_current()
    failures: list[str] = []
    for baseline in sorted(BASELINE_DIR.glob("*.png")):
        current = CURRENT_DIR / baseline.name
        ratio = image_difference_ratio(baseline, current)
        print(f"{baseline.name}: diff_ratio={ratio:.6f}")
        if ratio > 0.01:
            failures.append(f"{baseline.name} diff_ratio={ratio:.6f}")

    if failures:
        raise SystemExit("视觉差异超过阈值: " + "; ".join(failures))


if __name__ == "__main__":
    main()
