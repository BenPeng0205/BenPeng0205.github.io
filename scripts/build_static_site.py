from pathlib import Path
import shutil


PROJECT_ROOT = Path(__file__).resolve().parents[1]
DIST = PROJECT_ROOT / "dist"
SRC_APP = PROJECT_ROOT / "src" / "app"
SRC_STYLES = PROJECT_ROOT / "src" / "styles"
SRC_LIB = PROJECT_ROOT / "src" / "lib"
SRC_CONTENT = PROJECT_ROOT / "src" / "content"
PUBLIC = PROJECT_ROOT / "public"


def copy_tree(source: Path, target: Path) -> None:
    if target.exists():
        shutil.rmtree(target)
    shutil.copytree(source, target)


def main() -> None:
    if DIST.exists():
        shutil.rmtree(DIST)
    DIST.mkdir(parents=True)

    # 发布根目录：GitHub Pages 直接读取 dist/index.html。
    html = (SRC_APP / "index.html").read_text(encoding="utf-8")
    html = html.replace("../styles/site.css", "styles/site.css")
    html = html.replace("../content/site-data.js", "content/site-data.js")
    html = html.replace("../lib/site.js", "lib/site.js")
    html = html.replace("../../public/", "")
    (DIST / "index.html").write_text(html, encoding="utf-8")

    copy_tree(SRC_STYLES, DIST / "styles")
    copy_tree(SRC_LIB, DIST / "lib")
    copy_tree(SRC_CONTENT, DIST / "content")

    for item in PUBLIC.iterdir():
        target = DIST / item.name
        if item.is_dir():
            copy_tree(item, target)
        else:
            shutil.copy2(item, target)

    # GitHub Pages 不需要 Jekyll 处理，避免下划线目录或静态资源被特殊处理。
    (DIST / ".nojekyll").write_text("", encoding="utf-8")
    print(f"BUILD_OK {DIST}")


if __name__ == "__main__":
    main()
