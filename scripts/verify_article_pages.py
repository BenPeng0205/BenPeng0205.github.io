from __future__ import annotations

from pathlib import Path
import json
import re
from playwright.sync_api import sync_playwright


PROJECT_ROOT = Path(__file__).resolve().parents[1]
DIST = PROJECT_ROOT / "dist"
ARTICLE_INDEX = DIST / "content" / "articles.json"
INDEX_HTML = DIST / "index.html"
EMOJI_RE = re.compile("[\U0001F300-\U0001FAFF\U00002700-\U000027BF\U00002600-\U000026FF]")


def fail(message: str) -> None:
    raise SystemExit(message)


def load_articles() -> list[dict[str, object]]:
    if not ARTICLE_INDEX.exists():
        fail("请先运行 scripts/build_static_site.py，再验证 dist 文章页。")
    articles = json.loads(ARTICLE_INDEX.read_text(encoding="utf-8")).get("articles", [])
    if len(articles) != 30:
        fail(f"文章目录数量异常，期望 30 篇，实际 {len(articles)} 篇。")
    return articles


def check_toc_links(page, article_title: str) -> None:
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
        fail(f"{article_title} 存在重复 id: {audit['duplicates']}")
    if audit["missing"]:
        fail(f"{article_title} 目录存在缺失目标: {audit['missing']}")
    if audit["mismatched"]:
        fail(f"{article_title} 目录链接文字与目标标题不一致: {audit['mismatched']}")
    if len(audit["links"]) < 2:
        fail(f"{article_title} 目录数量过少。")

    for index, link in enumerate(audit["links"]):
        href = link["href"]
        page.locator(".article-toc a").nth(index).click()
        page.wait_for_timeout(80)
        hash_value = page.evaluate("window.location.hash")
        if hash_value != href:
            fail(f"{article_title} 目录第 {index + 1} 项跳转 hash 错误: {href} -> {hash_value}")
        visible = page.evaluate(
            """(href) => {
                const target = document.getElementById(href.slice(1));
                if (!target) return false;
                const rect = target.getBoundingClientRect();
                return rect.bottom > 76 && rect.top < window.innerHeight * 0.78;
            }""",
            href,
        )
        if not visible:
            fail(f"{article_title} 目录第 {index + 1} 项跳转后目标不可见: {href}")


def check_article_bounds(page, article_title: str, *, wide: bool = False) -> None:
    layout = page.evaluate(
        """() => {
            const rect = (selector) => {
                const node = document.querySelector(selector);
                const box = node.getBoundingClientRect();
                return { left: box.left, right: box.right, top: box.top, width: box.width };
            };
            const toc = rect(".article-toc");
            const main = rect(".article-main");
            const hero = rect(".article-hero");
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
                hero,
                back,
                actions,
                gapToMain: main.left - toc.right,
            };
        }"""
    )
    tolerance = 1.5
    if layout["toc"]["left"] < layout["logo"]["left"] - tolerance:
        fail(f"{article_title} 目录越过左边界: {layout}")
    if layout["main"]["right"] > layout["back"]["right"] + tolerance:
        fail(f"{article_title} 正文越过右边界: {layout}")
    if layout["actions"]["right"] > layout["back"]["right"] + tolerance:
        fail(f"{article_title} 滚动按钮越过右边界: {layout}")
    if layout["gapToMain"] < 40:
        fail(f"{article_title} 目录与正文间距过窄: {layout}")
    if layout["toc"]["width"] < 340:
        fail(f"{article_title} 目录宽度不足: {layout}")
    if abs(layout["toc"]["top"] - layout["hero"]["top"]) > 2:
        fail(f"{article_title} 左侧目录上边缘未与标题卡片对齐: {layout}")
    if wide and abs(layout["toc"]["left"] - layout["brand"]["right"]) > 3:
        fail(f"{article_title} 宽屏目录左侧未扩展到 ControlRookie 文字右缘: {layout}")


def scroll_to_top_and_dispatch(page) -> None:
    page.evaluate(
        """() => {
            window.scrollTo({ top: 0, behavior: "instant" });
            window.dispatchEvent(new Event("scroll"));
        }"""
    )
    page.wait_for_timeout(180)


def scroll_to_heading_and_dispatch(page, index: int) -> None:
    page.evaluate(
        """(index) => {
            const heading = document.querySelectorAll(".article-content h2")[index];
            if (!heading) return;
            const navHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-height")) || 0;
            const targetTop = heading.getBoundingClientRect().top + window.scrollY - navHeight - 96;
            window.scrollTo({ top: Math.max(0, targetTop), behavior: "instant" });
            window.dispatchEvent(new Event("scroll"));
        }""",
        index,
    )
    page.wait_for_timeout(250)


def check_article_page(page, article: dict[str, object]) -> None:
    title = str(article["title"])
    path = DIST / str(article["path"])
    if not path.exists():
        fail(f"文章页不存在: {path}")
    page.goto(path.resolve().as_uri(), wait_until="networkidle")
    if title not in page.title() or "ControlRookie" not in page.title():
        fail(f"{title} 页面 title 异常。")
    if page.locator(".article-hero").count() != 1:
        fail(f"{title} 缺少文章标题区。")
    if page.locator(".article-main .article-hero").count() != 1:
        fail(f"{title} 标题区未放入右侧主阅读列。")

    nav_items = page.locator(".article-nav .nav-links a").evaluate_all("nodes => nodes.map(node => node.textContent.trim())")
    if nav_items[:5] != ["关于我", "资源", "文章", "产品", "联系"]:
        fail(f"{title} 单篇文章导航缺少关于我或顺序异常: {nav_items}")

    scroll_to_top_and_dispatch(page)
    check_article_bounds(page, title, wide=False)
    check_toc_links(page, title)
    scroll_to_top_and_dispatch(page)

    hero_style = page.locator(".article-hero").evaluate(
        """node => {
            const style = getComputedStyle(node);
            return {
                backgroundImage: style.backgroundImage,
                borderLeftWidth: parseFloat(style.borderLeftWidth) || 0,
                borderRadius: parseFloat(style.borderTopLeftRadius) || 0,
            };
        }"""
    )
    if hero_style["backgroundImage"] == "none" or hero_style["borderLeftWidth"] < 4 or hero_style["borderRadius"] != 0:
        fail(f"{title} 总标题区缺少独立设计层级。")

    breadcrumb_items = page.locator(".article-breadcrumb a").evaluate_all("nodes => nodes.map(node => node.textContent.trim())")
    if breadcrumb_items != ["文章", str(article["series"]), "通信", "CODESYS"]:
        fail(f"{title} 面包屑层级异常: {breadcrumb_items}")
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
        fail(f"{title} 面包屑链接缺少可点击样式。")

    meta_items = page.locator(".article-meta span").evaluate_all("nodes => nodes.map(node => node.textContent.trim())")
    if not any(re.match(r"第\d+篇/共\d+篇", item) for item in meta_items):
        fail(f"{title} 缺少系列进度属性框。")

    toc_color = page.locator(".article-toc a:not(.is-active)").first.evaluate("node => getComputedStyle(node).color")
    if toc_color == breadcrumb_colors["linkColor"]:
        fail(f"{title} 目录链接不应使用正文/面包屑强调色。")
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
                position: style.position,
            };
        }"""
    )
    if toc_layout["whiteSpace"] != "normal" or toc_layout["overflowX"] != "hidden":
        fail(f"{title} 目录长标题必须自然换行且禁止横向滚动: {toc_layout}")
    if toc_layout["position"] != "sticky":
        fail(f"{title} 桌面目录必须 sticky 固定。")

    h2_count = page.locator(".article-content h2").count()
    scroll_to_heading_and_dispatch(page, min(2, h2_count - 1))
    active_toc = page.locator(".article-toc a.is-active")
    if active_toc.count() != 1:
        fail(f"{title} 当前阅读章节目录高亮数量异常。")
    active_weight = active_toc.first.evaluate("node => parseFloat(getComputedStyle(node).fontWeight)")
    active_color = active_toc.first.evaluate("node => getComputedStyle(node).color")
    if active_weight < 650 or active_color == toc_color:
        fail(f"{title} 当前章节目录项必须用琉璃绿加粗。")

    code_cards = page.locator(".code-card").count()
    copy_buttons = page.locator(".copy-code-button").count()
    if copy_buttons < code_cards:
        fail(f"{title} 代码块缺少复制按钮。")
    if "源码加更" in str(article.get("source", "")):
        if page.locator(".article-source-scope").count() != 1:
            fail(f"{title} 源码加更文章必须明确源码范围，避免误认为是 1.0 全量源码包。")
        if code_cards < 1:
            fail(f"{title} 源码加更文章必须至少包含一个可复制源码代码块。")
        if page.locator("text=~~~").count() > 0:
            fail(f"{title} 源码加更文章仍泄漏未渲染的 Markdown 代码围栏。")
    if code_cards:
        code_font = page.locator(".code-card pre code").first.evaluate("node => getComputedStyle(node).fontFamily")
        if "Consolas" not in code_font:
            fail(f"{title} 代码块字体应优先使用 Consolas，当前为: {code_font}")
        code_texts = page.locator(".code-card pre code").evaluate_all("nodes => nodes.map(node => node.textContent)")
        if any("\t" in text for text in code_texts):
            fail(f"{title} 代码块仍包含 tab，ST 代码对齐不稳定。")

    mermaid_cards = page.locator(".mermaid-card").count()
    if page.locator(".mermaid-card svg").count() != mermaid_cards:
        fail(f"{title} Mermaid 未全部渲染为图形。")
    if page.locator(".article-scroll-actions a").count() != 2:
        fail(f"{title} 缺少一键到顶/到底按钮。")
    if page.locator(".article-series-nav .series-nav-card").count() != 2:
        fail(f"{title} 缺少上一篇/下一篇系列导航。")
    if page.locator(".article-comments").count() != 1:
        fail(f"{title} 缺少评论和回复预留区。")
    if page.locator(".article-content h1").count() != 0:
        fail(f"{title} 正文仍存在与总标题重复的一级标题。")
    content_text = page.locator(".article-content").inner_text()
    for removed in ["系列导航", "项目与资料", "完整程序源码获取方式", "源码获取方式"]:
        if removed in content_text:
            fail(f"{title} 正文仍包含应移除章节: {removed}")
    article_text = page.locator(".article-main").inner_text()
    if EMOJI_RE.search(article_text):
        fail(f"{title} 专家文章内容中禁止出现 emoji。")


def check_article_center(page, articles: list[dict[str, object]]) -> None:
    page.goto(INDEX_HTML.resolve().as_uri() + "#articles", wait_until="networkidle")
    page.wait_for_timeout(260)
    if page.locator("#articles .article-index-panel").count() != 1:
        fail("文章中心缺少左侧知识库索引。")
    if page.locator("#articles .article-index-tree a").count() != len(articles):
        fail("文章中心目录链接数量未同步到全部文章。")
    if page.locator("#articles .article-list-card").count() != len(articles):
        fail("文章中心文章卡片数量未同步到全部文章。")
    if "已导入 30 篇" not in page.locator("#articles .series-progress").inner_text():
        fail("文章中心系列总标题未显示 30 篇导入进度。")
    if page.locator(".nav-article-panel a").count() != 2:
        fail("顶部文章快捷菜单应只保留两个系列入口。")
    first_meta = page.locator("#articles .article-list-card small").first.inner_text().strip()
    if first_meta != "01 · 客户端":
        fail(f"文章卡片左上角元信息异常: {first_meta}")
    broker_meta = page.locator("#articles .article-list-card small").nth(16).inner_text().strip()
    if broker_meta != "01 · Broker":
        fail(f"Broker 第一篇卡片左上角元信息异常: {broker_meta}")
    status_weight = page.locator("#articles .article-list-card em").first.evaluate("node => parseFloat(getComputedStyle(node).fontWeight)")
    if status_weight > 450:
        fail("文章卡片右上角状态文字不应加粗。")
    tree_state = page.locator("#articles .article-index-tree").evaluate(
        """node => [...node.querySelectorAll("details")].map((item) => ({
            label: item.querySelector(":scope > summary span").textContent.trim(),
            open: item.open,
            selected: item.classList.contains("article-tree-selected"),
        }))"""
    )
    if not any(item["label"] == "CODESYS MQTT" and item["open"] and item["selected"] for item in tree_state):
        fail("文章目录树默认必须展开并选中到系列专题层。")
    for folded_label in ["客户端", "Broker"]:
        if not any(item["label"] == folded_label and not item["open"] for item in tree_state):
            fail(f"专题下文章文件夹默认必须折叠: {folded_label}")
    index_html = page.locator("#articles .article-index-panel").evaluate("node => node.innerHTML")
    if "#works" in index_html or "#products" in index_html or "LLM Synchronizer" in index_html:
        fail("文章中心左侧索引不得混入资源页或产品页导航。")


def main() -> None:
    articles = load_articles()
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 1000}, device_scale_factor=1)
        check_article_center(page, articles)
        for article in articles:
            check_article_page(page, article)
        page.set_viewport_size({"width": 2048, "height": 1000})
        page.goto((DIST / str(articles[0]["path"])).resolve().as_uri(), wait_until="networkidle")
        check_article_bounds(page, str(articles[0]["title"]), wide=True)
        browser.close()
    print("ARTICLE_PAGES_OK count=30")


if __name__ == "__main__":
    main()
