from pathlib import Path
from playwright.sync_api import sync_playwright


PROJECT_ROOT = Path(__file__).resolve().parents[1]
APP_HTML = PROJECT_ROOT / "src" / "app" / "index.html"


def require(condition: bool, message: str) -> None:
    if not condition:
        raise SystemExit(message)


def assert_close(value: float, expected: float, tolerance: float, message: str) -> None:
    if abs(value - expected) > tolerance:
        raise SystemExit(f"{message}: actual={value:.2f}, expected={expected:.2f}, tolerance={tolerance:.2f}")


def rect_top(page, selector: str) -> float:
    box = page.locator(selector).first.bounding_box()
    if not box:
        raise SystemExit(f"无法获取元素位置: {selector}")
    return float(box["y"])


def rect(page, selector: str) -> dict[str, float]:
    box = page.locator(selector).first.bounding_box()
    if not box:
        raise SystemExit(f"无法获取元素位置: {selector}")
    return {key: float(value) for key, value in box.items()}


def hover_delta_y(page, selector: str) -> float:
    before = page.locator(selector).first.bounding_box()
    if not before:
        raise SystemExit(f"无法获取 hover 前元素位置: {selector}")
    page.hover(selector)
    page.wait_for_timeout(320)
    after = page.locator(selector).first.bounding_box()
    if not after:
        raise SystemExit(f"无法获取 hover 后元素位置: {selector}")
    page.mouse.move(8, 8)
    page.wait_for_timeout(80)
    return float(after["y"] - before["y"])


def horizontal_center(box: dict[str, float]) -> float:
    return box["x"] + box["width"] / 2


def check_page_frame_and_cards(page, file_url: str) -> None:
    page.goto(file_url, wait_until="networkidle")
    page.wait_for_timeout(350)
    metrics = page.evaluate(
        """() => {
            const root = getComputedStyle(document.documentElement);
            const frameGapValue = root.getPropertyValue("--content-frame-gap").trim();
            const pageGutterValue = root.getPropertyValue("--page-gutter").trim();
            const navHeight = parseFloat(root.getPropertyValue("--nav-height"));
            const frameGap = frameGapValue ? parseFloat(frameGapValue) : NaN;
            const pseudoHasVisibleFrame = (selector) => {
                const node = document.querySelector(selector);
                if (!node) return false;
                const style = getComputedStyle(node, "::before");
                const borderWidths = [
                    style.borderTopWidth,
                    style.borderRightWidth,
                    style.borderBottomWidth,
                    style.borderLeftWidth,
                ].map((value) => parseFloat(value) || 0);
                return style.content !== "none" && borderWidths.some((value) => value > 0);
            };
            return {
                navHeight,
                frameGap,
                pageGutterDefined: Boolean(pageGutterValue),
                brandLeft: document.querySelector(".brand-logo").getBoundingClientRect().left,
                langRight: document.querySelector("#langToggle").getBoundingClientRect().right,
                visibleFrames: [".hero-inner", "#works", "#about", "#articles", "#products", "#contact"]
                    .filter((selector) => pseudoHasVisibleFrame(selector)),
            };
        }"""
    )
    require(metrics["frameGap"] == metrics["frameGap"], "缺少 --content-frame-gap 正文边界间距变量。")
    require(metrics["pageGutterDefined"], "缺少 --page-gutter 正文左右边界变量。")
    require(not metrics["visibleFrames"], f"正文边界不应显示为可见框线: {metrics['visibleFrames']}")

    for selector in ["#works", "#about", "#articles", "#products", "#contact"]:
        area = rect(page, selector)
        assert_close(area["x"], metrics["brandLeft"], 2, f"{selector} 左边界未对齐 CR logo 左缘")
        assert_close(area["x"] + area["width"], metrics["langRight"], 2, f"{selector} 右边界未对齐 EN 按钮右缘")

    content_groups = [
        ("#top", ".hero-inner"),
        ("#works", "#works .work-grid"),
        ("#about", "#about .about-shell"),
        ("#articles", "#articles .article-grid"),
        ("#products", "#products .product-grid"),
        ("#contact", "#contact .contact-shell"),
    ]
    viewport_center = page.viewport_size["width"] / 2
    for anchor, selector in content_groups:
        page.goto(f"{file_url}{anchor}", wait_until="networkidle")
        page.wait_for_timeout(420)
        area = rect(page, anchor)
        group = rect(page, selector)
        require(group["x"] >= area["x"] + 18, f"{anchor} 内容过度贴近左边界。")
        require(group["x"] + group["width"] <= area["x"] + area["width"] - 18, f"{anchor} 内容过度贴近右边界。")
        assert_close(horizontal_center(group), viewport_center, 100, f"{anchor} 内容视觉重心明显偏离页面中心轴")

    for part in [".work-index", ".work-title", ".work-meta"]:
        tops = page.locator(f"#works .work-card:nth-child(-n+4) {part}").evaluate_all(
            "nodes => nodes.map((node) => node.getBoundingClientRect().top)"
        )
        require(max(tops) - min(tops) <= 1, f"资源卡片同一行 {part} 未严格对齐: {tops}")

    static_cards = [
        ("#works", "#works .work-card"),
        ("#products", "#products .info-card"),
        ("#contact", "#contact .qr-card"),
    ]
    for anchor, selector in static_cards:
        page.goto(f"{file_url}{anchor}", wait_until="networkidle")
        page.wait_for_timeout(420)
        delta = hover_delta_y(page, selector)
        assert_close(delta, 0, 0.75, f"不可点击灰色卡片不应 hover 位移: {selector}")

    page.goto(f"{file_url}#articles", wait_until="networkidle")
    page.wait_for_timeout(420)
    require(hover_delta_y(page, "#articles a.info-card") < -1.5, "可点击文章卡片缺少 hover 动画。")


def check_single_card_heading_attachment(page, file_url: str, anchor: str, label_selector: str, card_selector: str) -> None:
    page.goto(f"{file_url}{anchor}", wait_until="networkidle")
    page.wait_for_timeout(420)
    label = rect(page, label_selector)
    card = rect(page, card_selector)
    require(label["y"] < card["y"], f"{anchor} 标题必须位于主体卡片上方。")
    require(card["y"] - (label["y"] + label["height"]) <= 18, f"{anchor} 标题与主体卡片距离过远。")
    assert_close(label["x"], card["x"], 8, f"{anchor} 标题未与主体卡片左侧对齐。")


def check_about_timeline(page, file_url: str) -> None:
    page.goto(f"{file_url}#about", wait_until="networkidle")
    page.wait_for_timeout(300)
    about_text = page.locator("#about").inner_text()
    for token in ["关于我", "达姆施达特工业大学", "Bosch", "Fraunhofer IWES", "新能源 HIL", "烟草", "冶金传动", "控制器厂家", "能力描述"]:
        if token not in about_text:
            raise SystemExit(f"关于我页缺少关键内容: {token}")

    ordered_nodes = page.locator("#about .timeline-node strong").evaluate_all("nodes => nodes.map((node) => node.textContent.trim())")
    require(
        ordered_nodes == ["达姆施达特工业大学", "Bosch", "Fraunhofer IWES", "新能源 HIL", "烟草", "冶金传动", "控制器厂家"],
        f"关于我时间线顺序错误: {ordered_nodes}",
    )
    visual_line = page.locator("#about .about-timeline").evaluate(
        """node => {
            const style = getComputedStyle(node, "::before");
            return {
                content: style.content,
                width: parseFloat(style.width) || 0,
                height: parseFloat(style.height) || 0,
                background: style.backgroundColor,
                display: style.display,
            };
        }"""
    )
    require(visual_line["content"] != "none", "关于我时间线缺少可见轴线。")
    require(visual_line["height"] > 200 or visual_line["width"] > 200, "关于我时间线轴线长度不足。")


def main() -> None:
    file_url = APP_HTML.resolve().as_uri()
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
        page.goto(file_url, wait_until="networkidle")

        title = page.title()
        if "ControlRookie" not in title:
            raise SystemExit("页面 title 异常。")

        description = page.locator("meta[name='description']").get_attribute("content")
        if not description or "AI" not in description:
            raise SystemExit("SEO description 异常。")

        data_loaded = page.evaluate("Boolean(window.CONTROLROOKIE_SITE_DATA && window.CONTROLROOKIE_SITE_DATA.articles.length)")
        if not data_loaded:
            raise SystemExit("内容数据源未加载。")

        for selector in [
            ".portrait-image",
            "img[src*='wechat-peaceandbless-qr.jpg']",
            "img[src*='wechat-official-account-controlrookie-qr.jpg']",
        ]:
            loaded = page.locator(selector).evaluate("node => node.complete && node.naturalWidth > 0")
            if not loaded:
                raise SystemExit(f"素材未正常加载: {selector}")

        page.click("#searchButton")
        page.fill("#siteSearch", "MQTT")
        page.wait_for_timeout(200)
        if "CODESYS MQTT" not in page.locator("#searchPanel").inner_text():
            raise SystemExit("搜索 MQTT 未匹配文章结果。")

        page.keyboard.press("Escape")
        page.wait_for_timeout(120)
        expanded = page.locator("#searchButton").get_attribute("aria-expanded")
        if expanded != "false":
            raise SystemExit("搜索 Escape 收起失败。")

        page.click("#langToggle")
        page.wait_for_timeout(200)
        nav_links = page.locator(".nav-links a").evaluate_all("nodes => nodes.map((node) => node.textContent.trim())")
        if nav_links[:5] != ["About Me", "Resources", "Articles", "Products", "Contact"]:
            raise SystemExit("英文导航切换失败。")

        page.click("#langToggle")
        page.wait_for_timeout(200)
        nav_links = page.locator(".nav-links a").evaluate_all("nodes => nodes.map((node) => node.textContent.trim())")
        if nav_links[:5] != ["关于我", "资源", "文章", "产品", "联系"]:
            raise SystemExit("中文导航切换失败。")

        if page.locator(".hero .kicker").count() != 0:
            raise SystemExit("首页仍显示 kicker 文案。")
        assert_close(rect_top(page, ".hero h1"), rect_top(page, ".portrait-frame"), 8, "ControlRookie 顶部未与照片顶端对齐")
        title_box = rect(page, ".hero h1")
        statement_box = rect(page, ".hero-statement")
        description_box = rect(page, ".hero-description")
        require(statement_box["y"] - (title_box["y"] + title_box["height"]) >= 32, "首页标题与定位句间距不足。")
        require(description_box["y"] - (statement_box["y"] + statement_box["height"]) >= 22, "首页定位句与描述句间距不足。")

        check_about_timeline(page, file_url)
        check_single_card_heading_attachment(page, file_url, "#articles", "#articles .single-section-label", "#articles .info-card")
        check_single_card_heading_attachment(page, file_url, "#products", "#products .single-section-label", "#products .info-card")

        page.goto(f"{file_url}#contact", wait_until="networkidle")
        page.wait_for_timeout(250)
        contact_text = page.locator("#contact").inner_text()
        if "工控人太苦了，让我们一起告别水深火热" not in contact_text:
            raise SystemExit("联系页主文案未更新。")
        for removed in ["聊聊工程效率。", "文章合作、工具试用、工程咨询、AI 自动化方案", "ControlRookie / AI Automation Architect"]:
            if removed in contact_text:
                raise SystemExit(f"联系页仍包含应删除文案: {removed}")
        require(page.locator("#contact > .section-head").count() == 0, "联系页正文顶部不应再显示“联系”标题。")
        statement_style = page.locator(".contact-statement").evaluate(
            """node => {
                const style = getComputedStyle(node);
                return {
                    background: style.backgroundColor,
                    borderTopWidth: parseFloat(style.borderTopWidth) || 0,
                    borderRightWidth: parseFloat(style.borderRightWidth) || 0,
                    borderBottomWidth: parseFloat(style.borderBottomWidth) || 0,
                    borderLeftWidth: parseFloat(style.borderLeftWidth) || 0,
                };
            }"""
        )
        require(statement_style["background"] in ["rgba(0, 0, 0, 0)", "transparent"], "联系页主文案不得使用灰色卡片背景。")
        require(
            statement_style["borderTopWidth"] == 0
            and statement_style["borderRightWidth"] == 0
            and statement_style["borderBottomWidth"] == 0
            and statement_style["borderLeftWidth"] == 0,
            "联系页主文案不得使用卡片边框。",
        )
        heading_box = rect(page, ".contact-statement h2")
        require(heading_box["y"] <= page.viewport_size["height"] * 0.29, "联系页主文案需要适当上移。")
        logo_loaded = page.locator(".contact-visual-card img").evaluate("node => node.complete && node.naturalWidth > 0")
        if not logo_loaded:
            raise SystemExit("联系页辅助 Logo 图片未加载。")
        logo_src = page.locator(".contact-visual-card img").get_attribute("src") or ""
        if "controlrookie-mark-gray.png" in logo_src or not logo_src.endswith(".svg"):
            raise SystemExit(f"联系页 Logo 不得继续使用带白角风险的 PNG: {logo_src}")
        require(page.locator(".contact-visual-card .contact-link-stack").count() == 0, "右侧图片卡片下方不应再包含邮箱/CSDN 灰色区域。")
        visual_card_style = page.locator(".contact-visual-card").evaluate(
            """node => {
                const style = getComputedStyle(node);
                return {
                    background: style.backgroundColor,
                    backgroundImage: style.backgroundImage,
                    borderTopWidth: parseFloat(style.borderTopWidth) || 0,
                    borderRightWidth: parseFloat(style.borderRightWidth) || 0,
                    borderBottomWidth: parseFloat(style.borderBottomWidth) || 0,
                    borderLeftWidth: parseFloat(style.borderLeftWidth) || 0,
                };
            }"""
        )
        require(
            visual_card_style["background"] in ["rgba(0, 0, 0, 0)", "transparent"]
            and visual_card_style["backgroundImage"] == "none"
            and visual_card_style["borderTopWidth"] == 0
            and visual_card_style["borderRightWidth"] == 0
            and visual_card_style["borderBottomWidth"] == 0
            and visual_card_style["borderLeftWidth"] == 0,
            "Logo 图片外层灰色卡片必须删除。",
        )
        link_stack = rect(page, ".contact-link-stack")
        visual_image = rect(page, ".contact-visual-card img")
        require(visual_image["width"] >= 250, "Logo 图片必须保持原有尺寸，不应被缩小。")
        require(visual_image["y"] + visual_image["height"] <= link_stack["y"] - 8, "右侧 Logo 图片不得与邮箱/CSDN 卡片区域重叠。")
        wechat_card = rect(page, "#contact .qr-card:nth-of-type(1)")
        official_card = rect(page, "#contact .qr-card:nth-of-type(2)")
        require(wechat_card["y"] >= 450 and official_card["y"] >= 450, "微信和公众号卡片需要保持原有纵向坐标，不应上移。")
        require(wechat_card["height"] >= 310 and official_card["height"] >= 310, "微信和公众号卡片需要保持原有高度，不应被压缩。")
        assert_close(link_stack["height"], official_card["height"], 2, "邮箱和 CSDN 组合总高度必须与公众号卡片一致")
        link_colors = page.locator("#contact").evaluate(
            """section => {
                const official = section.querySelector(".qr-card:nth-of-type(2)");
                const links = [...section.querySelectorAll(".contact-link-stack .contact-card")];
                const cardStyle = getComputedStyle(official);
                return links.map((node) => {
                    const style = getComputedStyle(node);
                    return {
                        backgroundColor: style.backgroundColor,
                        backgroundImage: style.backgroundImage,
                        borderColor: style.borderTopColor,
                        expectedBackgroundColor: cardStyle.backgroundColor,
                        expectedBackgroundImage: cardStyle.backgroundImage,
                        expectedBorderColor: cardStyle.borderTopColor,
                    };
                });
            }"""
        )
        require(len(link_colors) == 2, "邮箱和 CSDN 应保持两个横向联系方式卡片。")
        for color in link_colors:
            require(
                color["backgroundColor"] == color["expectedBackgroundColor"]
                and color["backgroundImage"] == color["expectedBackgroundImage"]
                and color["borderColor"] == color["expectedBorderColor"],
                "邮箱和 CSDN 卡片色调必须与公众号卡片一致。",
            )
        contact_shell = rect(page, ".contact-shell")
        require(contact_shell["y"] + contact_shell["height"] > page.viewport_size["height"] * 0.72, "联系页内容仍集中在上半屏。")

        check_page_frame_and_cards(page, file_url)

        for anchor in ["#about", "#works", "#articles", "#products", "#contact"]:
            page.goto(f"{file_url}{anchor}", wait_until="networkidle")
            page.wait_for_timeout(200)
            visible = page.locator(anchor).evaluate(
                "node => { const r = node.getBoundingClientRect(); return r.bottom > 0 && r.top < window.innerHeight; }"
            )
            if not visible:
                raise SystemExit(f"页面锚点不可见: {anchor}")

        browser.close()

    print("STATIC_APP_OK")


if __name__ == "__main__":
    main()
