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
        PROJECT_ROOT / "AGENTS.md",
        PROJECT_ROOT / "README.md",
        PROJECT_ROOT / "项目规划与TODO.md",
        PROJECT_ROOT / "docs" / "requirements" / "网站需求说明.md",
        PROJECT_ROOT / "docs" / "design" / "设计规范草案.md",
        PROJECT_ROOT / "docs" / "operations" / "技术路线与工具链.md",
        PROJECT_ROOT / "src" / "app" / "index.html",
        PROJECT_ROOT / "src" / "styles" / "site.css",
        PROJECT_ROOT / "src" / "lib" / "site.js",
        PROJECT_ROOT / "src" / "content" / "articles-data.js",
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
        "assets/images/brand/controlrookie-mark.svg",
        "assets/images/brand/controlrookie-logo-latest.png",
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
    article_data_js = read_text(PROJECT_ROOT / "src" / "content" / "articles-data.js")
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
    require("CONTROLROOKIE_ARTICLES" in article_data_js and article_data_js.count('"id":') == 30, "文章目录数据必须包含 30 篇 MQTT 官网文章。")
    require(len(re.findall(r"id:", data_js)) >= 10, "内容数据条目数量异常。")


def check_project_rules() -> None:
    rules = read_text(PROJECT_ROOT / "AGENTS.md")
    for token in [
        "E:\\ai-workspace\\projects\\controlrookie-website",
        "E:\\ai-workspace\\controlrookie-pages-publish",
        "正文边界",
        "不可见",
        "CR` logo",
        "EN` 语言按钮",
        "灰色卡片只有在可以点击",
        "序号标题、卡片名称、概述",
        "自动弹出浏览器界面预览",
        "最大安全范围",
        "首页主体已经由用户确认满意并固定",
        "关于我",
        "About Me",
        "清晰可见的时间线",
        "标题必须与主体卡片形成同一内容组",
        "主文案不得放在灰色卡片背景中",
        "四个圆角露白",
        "Control Rookie Logo.svg",
        "当前在用老Logo",
        "禁止 AI 自行重绘",
        "工控人太苦了",
        "文章系统规则",
        "禁止在单一文章入口页无限罗列文章卡片",
        "浅导航原则",
        "左侧固定目录",
        "目录锚点必须唯一",
        "固定专家阅读栏策略",
        "长章节标题必须在目录内部自然换行",
        "禁止出现表情、emoji",
        "未逐项校验通过不得交付",
        "一键回到顶端和一键到底端",
        "代码块必须使用适合代码阅读的等宽字体",
        "评论和回复区",
        "scripts/verify_production_ready.py",
    ]:
        require(token in rules, f"项目规则缺少关键约束: {token}")


def check_code_contract() -> None:
    html = read_text(PROJECT_ROOT / "src" / "app" / "index.html")
    article_template = read_text(PROJECT_ROOT / "src" / "app" / "article-template.html")
    article_html = read_text(PROJECT_ROOT / "src" / "app" / "articles" / "mqtt-client-open-source-codesys-layer" / "index.html")
    import_script = read_text(PROJECT_ROOT / "scripts" / "import_article_package.py")
    css = read_text(PROJECT_ROOT / "src" / "styles" / "site.css")
    js = read_text(PROJECT_ROOT / "src" / "lib" / "site.js")
    require("../content/articles-data.js" in html and "../content/site-data.js" in html, "页面未加载文章目录或内容数据源。")
    require("aria-expanded" in html and "aria-controls" in html, "搜索按钮缺少 aria 状态。")
    require('href="#about"' in html and 'data-i18n="nav.about"' in html, "导航缺少关于我首位入口。")
    require('class="about-timeline"' in html and 'class="timeline-node"' in html, "关于我页缺少真实时间线结构。")
    for removed_label in ['id="about-title"', 'id="works-title"', 'id="articles-title"', 'id="products-title"', 'class="section-head compact"', 'class="single-section-label"']:
        require(removed_label not in html, f"正文顶部不得显示冗余页名标签: {removed_label}")
    require(
        'class="article-grid article-hub"' in html
        and 'class="article-index-panel"' in html
        and 'class="article-index-tree"' in html
        and "<details" in html
        and "<summary" in html
        and 'class="article-library-panel"' in html
        and 'class="article-series-heading"' in html
        and 'class="article-list-card"' in html
        and 'class="article-subnav"' not in html,
        "文章入口页必须采用左侧知识库索引栏，禁止继续使用胶囊按钮式导航。",
    )
    require('class="article-row-list"' not in html and 'class="article-row"' not in html, "文章中心右侧不应继续保留浅导航卡片。")
    require('class="nav-article-menu"' in html and 'class="nav-article-panel"' in html, "顶部文章导航缺少轻量快捷入口。")
    require('data-i18n="nav.article.menu.center"' not in html and 'href="#articles" data-i18n="nav.article.menu.center"' not in html, "文章按钮本身已导航到文章中心，下拉菜单不应重复包含文章中心。")
    require('class="article-tree-node article-tree-selected" open' in html and 'data-i18n="articles.index.mqtt.client">客户端</span><em>1</em></summary>' in html and '<details class="article-tree-node" open>\n                            <summary><span data-i18n="articles.index.mqtt.client"' not in html, "文章目录树必须默认展开到系列专题，专题下文章文件夹默认折叠。")
    require('data-i18n="nav.article.menu.resources"' not in html and 'href="#products"><span>LLM Synchronizer</span>' not in html, "文章导航不得混入资源页或产品页入口。")
    require('class="contact-statement"' in html and "contact-lead" not in html, "联系页主文案仍使用旧灰卡结构。")
    require(
        "controlrookie-logo-latest.png" in html
        and "controlrookie-nav-mark.svg" not in html
        and "controlrookie-contact-lockup.svg" not in html
        and "controlrookie-mark-gray.png" not in html,
        "页面 Logo 必须使用最新母版派生 PNG，禁止使用旧图或 AI 自绘 SVG。",
    )
    require(".skip-link" in css, "缺少跳转主内容样式。")
    require(".about-timeline::before" in css and ".contact-statement" in css, "样式缺少关于我时间线或联系页无卡片标题约束。")
    require("01 · 客户端" in html and "02 · 服务器 / Broker" in html and "01 · MQTT Client" not in html, "文章卡片左上角必须使用序号加所在文件夹名称，禁止用英文技术名替代文件夹名。")
    require(".article-hub" in css and ".article-index-panel" in css and ".article-series-heading::before" in css and ".article-list-card" in css and ".nav-article-menu::after" in css and "counter-reset: nav-article-item" in css and ".article-scroll-actions" in css and ".copy-code-button" in css and "--link: #4f6f63" in css, "样式缺少文章中心、顶部文章快捷入口、文章阅读页或琉璃绿链接视觉关键控件。")
    require("grid-template-areas:" in css and "\"meta title\"" in css and "background: transparent" in css and ".article-tree-selected > summary" in css and "color: #050505" in css, "文章中心必须使用黑白灰编辑式系列标题板，并减少绿琉璃大面积使用。")
    require("margin-top: 60px" in css and ".article-index-head strong" in css, "文章目录顶端对齐或知识库索引标题样式缺少硬性约束。")
    require("--toc-preserved-right" in css and "--toc-target-left" in css and "--toc-min-readable" in css and "white-space: normal" in css and "overflow-x: hidden" in css, "文章目录未采用固定宽度、左侧扩展和长标题换行策略。")
    for token in ["article-main", "article-scroll-actions", "article-series-nav", "series-nav-card", "article-comments", "copy-code-button"]:
        require(token in article_template and token in article_html, f"文章模板或样例页缺少关键结构: {token}")
    require('href="{{HOME_HREF}}#about"' in article_template and 'href="../../index.html#about"' in article_html, "单篇文章导航缺少关于我入口。")
    require("{{CATEGORY_PRIMARY}}" in article_template and "{{CATEGORY_SECONDARY}}" in article_template, "文章模板未把面包屑分类层级拆开。")
    require("len(articles) != 30" in import_script and "ARTICLE_IMPORT_OK" in import_script and "第1篇/共16篇" in article_html, "文章页缺少批量导入后的系列进度属性框。")
    require(">通信<" in article_html and ">CODESYS<" in article_html and ">通信 / CODESYS<" not in article_html, "文章面包屑仍把通信和 CODESYS 粘成同一层级。")
    require("article-relations" not in article_template and "article-relations" not in article_html, "文章页仍包含旧的连体相关入口结构。")
    require("article-kicker" not in article_template and "article-kicker" not in article_html, "文章页仍把系列/分类放在标题容器内。")
    require("SKIPPED_SECTION_TITLES" in import_script and "系列导航" in import_script and "项目与资料" in import_script, "文章导入脚本未过滤重复导航章节。")
    require("unique_anchor" in import_script and "anchor_counts" in import_script, "文章导入脚本未保证目录锚点唯一。")
    require("EMOJI_RE" in import_script, "文章导入脚本未过滤专家文章中禁止出现的 emoji。")
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
        "content/articles-data.js",
        "content/site-data.js",
        "articles/mqtt-client-open-source-codesys-layer/index.html",
        "assets/images/brand/controlrookie-og.png",
        "assets/images/brand/controlrookie-mark.svg",
        "assets/images/brand/controlrookie-logo-latest.png",
        "robots.txt",
        "sitemap.xml",
        ".nojekyll",
    ]:
        path = dist / rel
        require(path.exists(), f"dist 缺少发布文件: {rel}")

    dist_html = read_text(dist / "index.html")
    require("../../public/" not in dist_html, "dist/index.html 仍包含开发期 public 相对路径。")
    require("styles/site.css" in dist_html and "content/articles-data.js" in dist_html and "content/site-data.js" in dist_html, "dist/index.html 资源路径异常。")


def run_script(script: str) -> None:
    result = subprocess.run(
        [PYTHON, str(PROJECT_ROOT / "scripts" / script)],
        cwd=str(PROJECT_ROOT),
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        timeout=240,
    )
    output = (result.stdout or b"").decode("utf-8", errors="replace").strip()
    print(output)
    require(result.returncode == 0, f"{script} 执行失败。")


def main() -> None:
    check_utf8()
    check_seo()
    check_public_assets()
    check_content_data()
    check_project_rules()
    check_code_contract()
    check_dist_build()
    run_script("verify_static_app.py")
    run_script("verify_article_pages.py")
    run_script("verify_visual_parity.py")
    print("PRODUCTION_READY_OK")


if __name__ == "__main__":
    main()
