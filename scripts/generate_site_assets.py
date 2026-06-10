from pathlib import Path
from PIL import Image, ImageDraw, ImageFont


PROJECT_ROOT = Path(__file__).resolve().parents[1]
PUBLIC_DIR = PROJECT_ROOT / "public"
ASSET_DIR = PUBLIC_DIR / "assets" / "images" / "brand"


def load_font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        Path("C:/Windows/Fonts/segoeuib.ttf"),
        Path("C:/Windows/Fonts/arialbd.ttf"),
    ]
    for candidate in candidates:
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size)
    return ImageFont.load_default()


def make_icon(size: int) -> Image.Image:
    image = Image.new("RGB", (size, size), "#050505")
    draw = ImageDraw.Draw(image)
    font = load_font(max(12, int(size * 0.32)))
    text = "CR"
    box = draw.textbbox((0, 0), text, font=font)
    x = (size - (box[2] - box[0])) / 2
    y = (size - (box[3] - box[1])) / 2 - size * 0.02
    draw.text((x, y), text, fill="#ffffff", font=font)
    return image


def make_og_image() -> Image.Image:
    width, height = 1200, 630
    image = Image.new("RGB", (width, height), "#f1f1f1")
    draw = ImageDraw.Draw(image)
    title_font = load_font(92)
    subtitle_font = load_font(36)
    small_font = load_font(26)

    draw.rounded_rectangle((72, 72, width - 72, height - 72), radius=34, fill="#ffffff", outline="#d7d7d7", width=2)
    draw.rounded_rectangle((104, 104, 164, 164), radius=14, fill="#050505")
    draw.text((119, 122), "CR", fill="#ffffff", font=load_font(22))
    draw.text((188, 118), "ControlRookie", fill="#050505", font=small_font)
    draw.text((104, 244), "ControlRookie", fill="#050505", font=title_font)
    draw.text((108, 368), "AI Automation Architect", fill="#565656", font=subtitle_font)
    draw.text((108, 448), "PLC  /  AI  /  Code  /  Share", fill="#050505", font=small_font)
    return image


def main() -> None:
    ASSET_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    make_icon(32).save(PUBLIC_DIR / "favicon.ico", sizes=[(32, 32)])
    make_icon(180).save(PUBLIC_DIR / "apple-touch-icon.png")
    make_icon(192).save(PUBLIC_DIR / "icon-192.png")
    make_icon(512).save(PUBLIC_DIR / "icon-512.png")
    make_og_image().save(ASSET_DIR / "controlrookie-og.png", quality=92)


if __name__ == "__main__":
    main()
