from __future__ import annotations

from html.parser import HTMLParser
from pathlib import Path
import json
import re
import subprocess
import sys
import xml.etree.ElementTree as ET


PROJECT_ROOT = Path(__file__).resolve().parents[1]
PYTHON = sys.executable


class HeadParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.in_title = False
        self.title = ""
        self.tags: list[tuple[str, dict[str, str]]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr_map = {key: value or "" for key, value in attrs}
        self.tags.append((tag, attr_map))
        if tag == "title":
            self.in_title = True

    def handle_endtag(self, tag: str) -> None:
        if tag == "title":
            self.in_title = False

    def handle_data(self, data: str) -> None:
        if self.in_title:
            self.title += data


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def require(condition: bool, message: str) -> None:
    if not condition:
        raise SystemExit(message)


def check_utf8() -> None:
    for path in [
        PROJECT_ROOT / "README.md",
        PROJECT_ROOT / "项目规划与TODO.md",
        PROJECT_ROOT / "docs" / "requirements" / "网站需求说明.md",
        PROJECT_ROOT / "docs" / "design" / "设计规范草案.md",
        PROJECT_ROOT / "docs" / "operations" / "技术路线与工具链.md",
        PROJECT_ROOT / "src" / "app" / "index.html",
        PROJECT_ROOT / "src" / "styles" / "site.css",
        PROJECT_ROOT / "src" / "lib" / "site.js",
        PROJECT_ROOT / "src" / "content" / "site-data.js",
    ]:
        text = read_text(path)
        bad = [token for token in ["�", "锛", "鈥", "??"] if token in text]
        require(not bad, f"疑似中文乱码: {path} {bad}")


def check_seo() -> None:
    html = read_text(PROJECT_ROOT / "src" / "app" / "index.html")
    parser = HeadParser()
    parser.feed(html)
    tags = parser.tags

    def has_meta(name: str | None = None, prop: str | None = None) -> bool:
        return any(
            tag == "meta"
            and (name is None or attrs.get("name") == name)
            and (prop is None or attrs.get("property") == prop)
            and bool(attrs.get("content"))
            for tag, attrs in tags
        )

    def has_link(rel: str) -> bool:
        return any(tag == "link" and attrs.get("rel") == rel and bool(attrs.get("href")) for tag, attrs in tags)

    require("ControlRookie" in parser.title, "缺少有效 title。")
    require(has_meta("description"), "缺少 description。")
    require(has_meta("robots"), "缺少 robots meta。")
    require(has_meta(prop="og:title"), "缺少 og:title。")
    require(has_meta(prop="og:image"), "缺少 og:image。")
    require(has_meta("twitter:card"), "缺少 twitter:card。")
    require(has_link("canonical"), "缺少 canonical。")
    require(has_link("manifest"), "缺少 manifest。")
    require(has_link("icon"), "缺少 favicon。")
    require("application/ld+json" in html and "AI 自动化架构师" in html, "缺少结构化数据。")


def check_public_assets() -> None:
    required = [
        "favicon.ico",
        "apple-touch-icon.png",
        "icon-192.png",
        "icon-512.png",
        "site.webmanifest",
        "robots.txt",
        "sitemap.xml",
        "assets/images/brand/controlrookie-og.png",
        "assets/images/brand/controlrookie-portrait.jpg",
        "assets/images/contact/wechat-peaceandbless-qr.jpg",
        "assets/images/contact/wechat-official-account-controlrookie-qr.jpg",
    ]
    for rel in required:
        path = PROJECT_ROOT / "public" / rel
        require(path.exists() and path.stat().st_size > 0, f"缺少发布资产: {rel}")

    manifest = json.loads(read_text(PROJECT_ROOT / "public" / "site.webmanifest"))
    require(manifest.get("name") == "ControlRookie", "manifest name 不正确。")
    ET.parse(PROJECT_ROOT / "public" / "sitemap.xml")
    require("Sitemap:" in read_text(PROJECT_ROOT / "public" / "robots.txt"), "robots.txt 缺少 Sitemap。")


def check_content_data() -> None:
    data_js = read_text(PROJECT_ROOT / "src" / "content" / "site-data.js")
    for token in [
        "CONTROLROOKIE_SITE_DATA",
        "resources",
        "articles",
        "products",
        "contacts",
        "codesys-llm-synchronizer",
        "CODESYS MQTT 系列",
        "PeaceAndBless",
        "ben_peng0205@hotmail.com",
    ]:
        require(token in data_js, f"内容数据缺少关键字段: {token}")
    require(len(re.findall(r"id:", data_js)) >= 10, "内容数据条目数量异常。")


def check_code_contract() -> None:
    html = read_text(PROJECT_ROOT / "src" / "app" / "index.html")
    css = read_text(PROJECT_ROOT / "src" / "styles" / "site.css")
    js = read_text(PROJECT_ROOT / "src" / "lib" / "site.js")
    require("../content/site-data.js" in html, "页面未加载内容数据源。")
    require("aria-expanded" in html and "aria-controls" in html, "搜索按钮缺少 aria 状态。")
    require(".skip-link" in css, "缺少跳转主内容样式。")
    require("hydrateContentFromData" in js, "JS 未从内容数据源同步页面。")
    require("keydown" in js and "Escape" in js, "搜索缺少键盘退出逻辑。")
    require("as any" not in js and "@ts-ignore" not in js, "存在禁止的类型绕过标记。")


def check_dist_build() -> None:
    result = subprocess.run(
        [PYTHON, str(PROJECT_ROOT / "scripts" / "build_static_site.py")],
        cwd=str(PROJECT_ROOT),
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        timeout=60,
    )
    print(result.stdout.strip())
    require(result.returncode == 0, "静态站构建失败。")

    dist = PROJECT_ROOT / "dist"
    for rel in [
        "index.html",
        "styles/site.css",
        "lib/site.js",
        "content/site-data.js",
        "assets/images/brand/controlrookie-og.png",
        "robots.txt",
        "sitemap.xml",
        ".nojekyll",
    ]:
        path = dist / rel
        require(path.exists(), f"dist 缺少发布文件: {rel}")

    dist_html = read_text(dist / "index.html")
    require("../../public/" not in dist_html, "dist/index.html 仍包含开发期 public 相对路径。")
    require("styles/site.css" in dist_html and "content/site-data.js" in dist_html, "dist/index.html 资源路径异常。")


def run_script(script: str) -> None:
    result = subprocess.run(
        [PYTHON, str(PROJECT_ROOT / "scripts" / script)],
        cwd=str(PROJECT_ROOT),
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        timeout=120,
    )
    print(result.stdout.strip())
    require(result.returncode == 0, f"{script} 执行失败。")


def main() -> None:
    check_utf8()
    check_seo()
    check_public_assets()
    check_content_data()
    check_code_contract()
    check_dist_build()
    run_script("verify_static_app.py")
    run_script("verify_visual_parity.py")
    print("PRODUCTION_READY_OK")


if __name__ == "__main__":
    main()
