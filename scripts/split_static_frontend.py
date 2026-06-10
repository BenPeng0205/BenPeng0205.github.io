from pathlib import Path
import re


PROJECT_ROOT = Path(__file__).resolve().parents[1]
PROTOTYPE = PROJECT_ROOT / "prototypes" / "homepage-open-design" / "index.html"
APP_HTML = PROJECT_ROOT / "src" / "app" / "index.html"
STYLE_FILE = PROJECT_ROOT / "src" / "styles" / "site.css"
SCRIPT_FILE = PROJECT_ROOT / "src" / "lib" / "site.js"


def main() -> None:
    source = PROTOTYPE.read_text(encoding="utf-8")
    style_match = re.search(r"<style>\n(.*?)\n  </style>", source, re.S)
    script_match = re.search(r"  <script>\n(.*?)\n  </script>", source, re.S)
    body_match = re.search(r"<body>\n(.*?)\n  <script>", source, re.S)
    if not style_match or not script_match or not body_match:
        raise RuntimeError("无法从当前高保真原型中提取 style、script 或 body。")

    head = source.split("<style>")[0].rstrip()
    app_html = (
        f"{head}\n"
        '  <link rel="stylesheet" href="../styles/site.css">\n'
        "</head>\n"
        "<body>\n"
        f"{body_match.group(1)}\n"
        '  <script src="../lib/site.js"></script>\n'
        "</body>\n"
        "</html>\n"
    )

    APP_HTML.parent.mkdir(parents=True, exist_ok=True)
    STYLE_FILE.parent.mkdir(parents=True, exist_ok=True)
    SCRIPT_FILE.parent.mkdir(parents=True, exist_ok=True)

    STYLE_FILE.write_text(style_match.group(1).strip() + "\n", encoding="utf-8")
    SCRIPT_FILE.write_text(script_match.group(1).strip() + "\n", encoding="utf-8")
    APP_HTML.write_text(app_html, encoding="utf-8")


if __name__ == "__main__":
    main()
