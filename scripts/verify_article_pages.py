from pathlib import Path
import re
from playwright.sync_api import sync_playwright


PROJECT_ROOT = Path(__file__).resolve().parents[1]
ARTICLE = PROJECT_ROOT / "dist" / "articles" / "mqtt-client-open-source-codesys-layer" / "index.html"
EMOJI_RE = re.compile("[\U0001F300-\U0001FAFF\U00002700-\U000027BF\U00002600-\U000026FF]")


def check_toc_links(page) -> None:
    audit = page.evaluate(
        """() => {
            const links = [...document.querySelectorAll(".article-toc a")].map((link) => ({
                href: link.getAttribute("href"),
                text: link.textContent.trim(),
            }));
            const ids = [...document.querySelectorAll("[id]")].map((node) => node.id).filter(Boolean);
            const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
            const missing = [];
            const mismatched = [];
            for (const link of links) {
                const id = link.href && link.href.startsWith("#") ? link.href.slice(1) : "";
                const target = id ? document.getElementById(id) : null;
                if (!target) {
                    missing.push(link.href);
                    continue;
                }
                if (target.textContent.trim() !== link.text) {
                    mismatched.push({ href: link.href, linkText: link.text, targetText: target.textContent.trim() });
                }
            }
            return { links, duplicates: [...new Set(duplicates)], missing, mismatched };
        }"""
    )
    if audit["duplicates"]:
        raise SystemExit(f"文章目录或正文存在重复 id: {audit['duplicates']}")
    if audit["missing"]:
        raise SystemExit(f"文章目录存在缺失目标: {audit['missing']}")
    if audit["mismatched"]:
        raise SystemExit(f"文章目录链接文字与目标标题不一致: {audit['mismatched']}")

    for index, link in enumerate(audit["links"]):
        href = link["href"]
        page.locator(".article-toc a").nth(index).click()
        page.wait_for_timeout(120)
        hash_value = page.evaluate("window.location.hash")
        if hash_value != href:
            raise SystemExit(f"文章目录第 {index + 1} 项跳转 hash 错误: {href} -> {hash_value}")
        visible = page.evaluate(
            """(href) => {
                const target = document.getElementById(href.slice(1));
                if (!target) return false;
                const rect = target.getBoundingClientRect();
                return rect.bottom > 80 && rect.top < window.innerHeight * 0.72;
            }""",
            href,
        )
        if not visible:
            raise SystemExit(f"文章目录第 {index + 1} 项跳转后目标不可见: {href}")


def check_article_bounds(page, *, wide: bool = False) -> None:
    layout = page.evaluate(
        """() => {
            const rect = (selector) => {
                const node = document.querySelector(selector);
                const box = node.getBoundingClientRect();
                return { left: box.left, right: box.right, width: box.width };
            };
            const toc = rect(".article-toc");
            const main = rect(".article-main");
            const brand = rect(".brand");
            const logo = rect(".brand-logo");
            const back = rect(".article-back");
            const actions = rect(".article-scroll-actions");
            return {
                viewport: window.innerWidth,
                brand,
                logo,
                toc,
                main,
                back,
                actions,
                gapToMain: main.left - toc.right,
            };
        }"""
    )
    tolerance = 1.5
    if layout["toc"]["left"] < layout["logo"]["left"] - tolerance:
        raise SystemExit(f"Article TOC crosses the left content boundary: {layout}")
    if layout["main"]["right"] > layout["back"]["right"] + tolerance:
        raise SystemExit(f"Article main crosses the right content boundary: {layout}")
    if layout["actions"]["right"] > layout["back"]["right"] + tolerance:
        raise SystemExit(f"Article scroll actions cross the right content boundary: {layout}")
    if layout["gapToMain"] < 40:
        raise SystemExit(f"Article TOC/main gap is too narrow: {layout}")
    if layout["toc"]["width"] < 340:
        raise SystemExit(f"Article TOC is too narrow for stable long headings: {layout}")
    if wide and abs(layout["toc"]["left"] - layout["brand"]["right"]) > 3:
        raise SystemExit(f"Wide article TOC must expand left to the ControlRookie text edge: {layout}")


def main() -> None:
    if not ARTICLE.exists():
        raise SystemExit("请先运行 scripts/build_static_site.py，再验证 dist 文章页。")
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
        check_toc_links(page)
        check_article_bounds(page, wide=False)
        if page.locator(".article-main .article-hero").count() != 1:
            raise SystemExit("文章标题未放入目录右侧主阅读列。")
        hero_style = page.locator(".article-hero").evaluate(
            """node => {
                const style = getComputedStyle(node);
                return {
                    background: style.backgroundColor,
                    backgroundImage: style.backgroundImage,
                    borderLeftWidth: parseFloat(style.borderLeftWidth) || 0,
                    borderRadius: parseFloat(style.borderTopLeftRadius) || 0,
                };
            }"""
        )
        if hero_style["backgroundImage"] == "none" or hero_style["borderLeftWidth"] < 4 or hero_style["borderRadius"] != 0:
            raise SystemExit("文章总标题区缺少独立设计色块或仍是普通圆角卡片。")
        breadcrumb_colors = page.locator(".article-breadcrumb").evaluate(
            """node => {
                const link = node.querySelector("a");
                const sep = node.querySelector("span");
                return {
                    linkColor: getComputedStyle(link).color,
                    sepColor: getComputedStyle(sep).color,
                    decoration: getComputedStyle(link).textDecorationLine,
                };
            }"""
        )
        if breadcrumb_colors["linkColor"] == breadcrumb_colors["sepColor"] or "underline" not in breadcrumb_colors["decoration"]:
            raise SystemExit("面包屑链接缺少明显可点击样式。")
        breadcrumb_items = page.locator(".article-breadcrumb a").evaluate_all("nodes => nodes.map(node => node.textContent.trim())")
        if breadcrumb_items != ["文章", "MQTT Client 系列教程", "通信", "CODESYS"]:
            raise SystemExit(f"文章面包屑层级异常: {breadcrumb_items}")
        meta_items = page.locator(".article-meta span").evaluate_all("nodes => nodes.map(node => node.textContent.trim())")
        if "第1篇/共12篇" not in meta_items:
            raise SystemExit("文章总标题属性框缺少系列进度。")
        toc_color = page.locator(".article-toc a").first.evaluate("node => getComputedStyle(node).color")
        if toc_color == breadcrumb_colors["linkColor"]:
            raise SystemExit("文章目录链接不应使用正文/面包屑强调色。")
        toc_font_size = page.locator(".article-toc a").first.evaluate("node => parseFloat(getComputedStyle(node).fontSize)")
        body_list_font_size = page.locator(".article-content li").first.evaluate("node => parseFloat(getComputedStyle(node).fontSize)")
        if abs(toc_font_size - body_list_font_size) > 1.6:
            raise SystemExit(f"目录字体应接近正文列表字号: toc={toc_font_size}, body={body_list_font_size}")
        toc_layout = page.locator(".article-toc").evaluate(
            """node => {
                const style = getComputedStyle(node);
                const rect = node.getBoundingClientRect();
                const main = document.querySelector(".article-main").getBoundingClientRect();
                const firstLink = node.querySelector("a");
                const linkStyle = getComputedStyle(firstLink);
                return {
                    width: rect.width,
                    gapToMain: main.left - rect.right,
                    overflowX: style.overflowX,
                    whiteSpace: linkStyle.whiteSpace,
                    scrollWidth: node.scrollWidth,
                    clientWidth: node.clientWidth,
                };
            }"""
        )
        if toc_layout["whiteSpace"] != "normal" or toc_layout["overflowX"] != "hidden":
            raise SystemExit(f"目录长标题必须自然换行且禁止横向滚动: {toc_layout}")
        if toc_layout["width"] < 340 or toc_layout["gapToMain"] < 40:
            raise SystemExit(f"目录固定阅读栏宽度或正文间距异常: {toc_layout}")
        toc_position = page.locator(".article-toc").evaluate("node => getComputedStyle(node).position")
        if toc_position != "sticky":
            raise SystemExit("桌面文章目录必须保持 sticky 固定。")
        page.locator(".article-content h2").nth(3).scroll_into_view_if_needed()
        page.wait_for_timeout(180)
        active_toc = page.locator(".article-toc a.is-active")
        if active_toc.count() != 1:
            raise SystemExit("目录中当前阅读章节必须有且仅有一个高亮项。")
        active_weight = active_toc.first.evaluate("node => parseFloat(getComputedStyle(node).fontWeight)")
        active_color = active_toc.first.evaluate("node => getComputedStyle(node).color")
        if active_weight < 650 or active_color == toc_color:
            raise SystemExit("当前章节目录项必须使用琉璃绿并加粗。")
        if page.locator(".article-content h2").count() < 5:
            raise SystemExit("文章正文标题层级异常。")
        if page.locator(".code-card").count() < 2:
            raise SystemExit("代码块未按官网样式渲染。")
        if page.locator(".copy-code-button").count() < page.locator(".code-card").count():
            raise SystemExit("代码块缺少复制按钮。")
        code_font = page.locator(".code-card pre code").first.evaluate("node => getComputedStyle(node).fontFamily")
        if "Consolas" not in code_font:
            raise SystemExit(f"代码块字体应优先使用 Consolas，当前为: {code_font}")
        code_texts = page.locator(".code-card pre code").evaluate_all("nodes => nodes.map(node => node.textContent)")
        if any("\t" in text for text in code_texts):
            raise SystemExit("代码块仍包含 tab，ST 代码对齐不稳定。")
        if page.locator(".article-scroll-actions a").count() != 2:
            raise SystemExit("文章页缺少一键到顶/到底按钮。")
        if page.locator(".article-series-nav .series-nav-card").count() != 2:
            raise SystemExit("文章页缺少上一篇/下一篇系列导航。")
        series_radius = page.locator(".series-nav-card").first.evaluate("node => parseFloat(getComputedStyle(node).borderTopLeftRadius) || 0")
        if series_radius != 0:
            raise SystemExit("上一篇/下一篇导航不应继续使用圆角矩形。")
        if page.locator(".article-comments").count() != 1:
            raise SystemExit("文章页缺少评论和回复预留区。")
        article_text = page.locator(".article-main").inner_text()
        if EMOJI_RE.search(article_text):
            raise SystemExit("专家文章内容中禁止出现表情或 emoji。")
        content_text = page.locator(".article-content").inner_text()
        for removed in ["系列导航", "项目与资料"]:
            if removed in content_text:
                raise SystemExit(f"文章正文仍包含应删除的重复章节: {removed}")
        if page.locator(".mermaid-card").count() < 2:
            raise SystemExit("Mermaid 块未按官网样式渲染。")
        if page.locator(".mermaid-card svg").count() < 2:
            raise SystemExit("Mermaid 未渲染为图形。")
        repeated_heading = page.locator(".article-content h1").count()
        if repeated_heading != 0:
            raise SystemExit("文章正文开头仍存在与总标题重复的一级标题。")
        if page.locator(".article-table-wrap").count() < 1:
            raise SystemExit("表格未按官网样式渲染。")
        page.set_viewport_size({"width": 2048, "height": 1000})
        page.goto(ARTICLE.resolve().as_uri(), wait_until="networkidle")
        check_article_bounds(page, wide=True)
        browser.close()
    print("ARTICLE_PAGES_OK")


if __name__ == "__main__":
    main()
