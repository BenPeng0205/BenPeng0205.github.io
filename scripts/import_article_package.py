from __future__ import annotations

from dataclasses import dataclass
from html import escape
from pathlib import Path
from urllib.parse import unquote
import hashlib
import json
import re
import shutil


PROJECT_ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = Path(r"E:\Obsidian\Work\03_资源\通信\MQTT")
TEMPLATE = PROJECT_ROOT / "src" / "app" / "article-template.html"
ARTICLE_ROOT = PROJECT_ROOT / "src" / "app" / "articles"
PUBLIC_ARTICLE_ASSETS = PROJECT_ROOT / "public" / "assets" / "articles"
ARTICLE_INDEX = PROJECT_ROOT / "src" / "content" / "articles.json"
ARTICLE_DATA_JS = PROJECT_ROOT / "src" / "content" / "articles-data.js"

EMOJI_RE = re.compile(
    "["
    "\U0001F300-\U0001FAFF"
    "\U00002700-\U000027BF"
    "\U00002600-\U000026FF"
    "]"
)


@dataclass(frozen=True)
class SeriesConfig:
    key: str
    source_folder: str
    title_zh: str
    title_en: str
    folder_zh: str
    folder_en: str
    slug_prefix: str
    description_zh: str
    description_en: str


@dataclass
class Heading:
    level: int
    text: str
    anchor: str


@dataclass
class ArticleSource:
    config: SeriesConfig
    source: Path
    title: str
    summary: str
    date: str
    tags: list[str]
    slug: str
    order: int
    kind: str
    kind_zh: str
    kind_en: str
    series_index: int
    series_total: int

    @property
    def href(self) -> str:
        return f"articles/{self.slug}/index.html"


SERIES_CONFIGS = [
    SeriesConfig(
        key="mqtt-client",
        source_folder="MqttClient系列教程",
        title_zh="MQTT Client 系列教程",
        title_en="MQTT Client Series",
        folder_zh="客户端",
        folder_en="Client",
        slug_prefix="mqtt-client",
        description_zh="围绕 CODESYS MQTT 客户端，把协议分层、握手、发布订阅、QoS、状态机和源码结构按工程顺序讲透。",
        description_en="A CODESYS MQTT client series covering protocol layers, handshake, publish/subscribe, QoS, state machines, and source structure.",
    ),
    SeriesConfig(
        key="mqtt-broker",
        source_folder="MqttBroker系列教程",
        title_zh="MQTT Broker 系列教程",
        title_en="MQTT Broker Series",
        folder_zh="Broker",
        folder_en="Broker",
        slug_prefix="mqtt-broker",
        description_zh="围绕 PLC 侧 MQTT Broker，把多客户端连接、订阅路由、Retain、KeepAlive、QoS 调度和现场排障串成完整工程路径。",
        description_en="A PLC-side MQTT Broker series covering multi-client connections, subscription routing, Retain, KeepAlive, QoS scheduling, and field troubleshooting.",
    ),
]

SKIPPED_SECTION_TITLES = {
    "系列导航",
    "项目与资料",
    "读者资源与延伸阅读",
    "完整程序源码获取方式",
    "完整源码获取方式",
    "源码获取方式",
    "发布辅助包",
}


def parse_frontmatter(markdown: str) -> tuple[dict[str, object], str]:
    if not markdown.startswith("---\n"):
        return {}, markdown
    end = markdown.find("\n---", 4)
    if end == -1:
        return {}, markdown
    raw = markdown[4:end].strip().splitlines()
    body = markdown[end + 4 :].lstrip()
    data: dict[str, object] = {}
    current_key = ""
    for line in raw:
        if line.startswith("  - ") and current_key:
            data.setdefault(current_key, [])
            if isinstance(data[current_key], list):
                data[current_key].append(line[4:].strip().strip('"'))
            continue
        if ":" in line:
            key, value = line.split(":", 1)
            current_key = key.strip()
            value = value.strip().strip('"')
            data[current_key] = value if value else []
    return data, body


def strip_markdown(text: str) -> str:
    text = EMOJI_RE.sub("", text)
    text = re.sub(r"!\[[^\]]*]\([^)]+\)", "", text)
    text = re.sub(r"\[([^\]]+)]\([^)]+\)", r"\1", text)
    text = re.sub(r"`([^`]+)`", r"\1", text)
    text = re.sub(r"[*_>#|]", "", text)
    return re.sub(r"\s+", " ", text).strip()


def extract_title(meta: dict[str, object], body: str, source: Path) -> str:
    title = str(meta.get("title") or "").strip()
    if title:
        return title
    match = re.search(r"^#\s+(.+)$", body, re.M)
    if match:
        return strip_markdown(match.group(1))
    return source.stem


def extract_summary(meta: dict[str, object], body: str) -> str:
    for key in ["summary", "description", "excerpt"]:
        value = str(meta.get(key) or "").strip()
        if value:
            return strip_markdown(value)

    in_code = False
    paragraph: list[str] = []
    for line in body.splitlines():
        stripped = line.strip()
        if stripped.startswith("```"):
            in_code = not in_code
            continue
        if in_code or not stripped:
            if paragraph:
                break
            continue
        if stripped.startswith("#") or stripped.startswith("|") or stripped.startswith("!") or stripped.startswith("> [!"):
            continue
        if re.match(r"^[-*]\s+", stripped):
            if paragraph:
                break
            continue
        paragraph.append(stripped)
    summary = strip_markdown(" ".join(paragraph)) or "这篇文章属于 CODESYS MQTT 系列，聚焦协议、源码、状态机和工业现场落地。"
    if len(summary) > 112:
        return summary[:108].rstrip("，。；、 ") + "。"
    return summary


def parse_tags(meta: dict[str, object]) -> list[str]:
    raw = meta.get("tags")
    tags: list[str] = []
    if isinstance(raw, list):
        tags.extend(str(item).strip() for item in raw if str(item).strip())
    elif isinstance(raw, str) and raw:
        tags.extend(item.strip() for item in re.split(r"[,/，]", raw) if item.strip())
    for tag in ["MQTT", "CODESYS", "PLC", "ControlRookie"]:
        if tag not in tags:
            tags.append(tag)
    return tags[:8]


def article_kind(source: Path) -> tuple[int, int, str, str, str]:
    name = source.name
    match = re.match(r"第(\d+)篇", name)
    if match:
        return 0, int(match.group(1)), "main", "主线", "Main"
    match = re.match(r"加更(\d+)", name)
    if match:
        return 1, int(match.group(1)), "extra", "加更", "Extra"
    match = re.match(r"源码加更(\d+)", name)
    if match:
        return 2, int(match.group(1)), "source", "源码加更", "Source"
    return 9, 999, "article", "文章", "Article"


def slug_tokens(text: str) -> str:
    tokens = re.findall(r"[A-Za-z]+[A-Za-z0-9_]*|\d+(?:_\d+)*", text)
    cleaned: list[str] = []
    for token in tokens:
        value = token.lower().replace("_", "-")
        if value in {"codesys", "mqtt"} and value in cleaned:
            continue
        cleaned.append(value)
    return "-".join(cleaned[:7]).strip("-")


def make_slug(config: SeriesConfig, source: Path, group: int, number: int) -> str:
    if config.key == "mqtt-client" and source.name.startswith("第1篇_官方MQTT库要花钱"):
        return "mqtt-client-open-source-codesys-layer"
    kind = {0: "part", 1: "extra", 2: "source"}.get(group, "article")
    tokens = slug_tokens(source.stem)
    suffix = f"-{tokens}" if tokens else ""
    digest = hashlib.md5(source.stem.encode("utf-8")).hexdigest()[:6]
    return f"{config.slug_prefix}-{kind}-{number:02d}{suffix}-{digest}"


def discover_articles() -> list[ArticleSource]:
    discovered: list[tuple[SeriesConfig, Path, int, int, str, str, str]] = []
    for config in SERIES_CONFIGS:
        source_dir = SOURCE_ROOT / config.source_folder
        for source in source_dir.glob("*.md"):
            if not source.name.startswith(("第", "加更", "源码加更")):
                continue
            group, number, kind, kind_zh, kind_en = article_kind(source)
            discovered.append((config, source, group, number, kind, kind_zh, kind_en))

    articles: list[ArticleSource] = []
    for config in SERIES_CONFIGS:
        group_items = [item for item in discovered if item[0] == config]
        group_items.sort(key=lambda item: (item[2], item[3], item[1].name))
        total = len(group_items)
        for index, (cfg, source, group, number, kind, kind_zh, kind_en) in enumerate(group_items, 1):
            raw = EMOJI_RE.sub("", source.read_text(encoding="utf-8"))
            meta, body = parse_frontmatter(raw)
            title = extract_title(meta, body, source)
            date = str(meta.get("created") or meta.get("date") or "2026-05-06")
            articles.append(
                ArticleSource(
                    config=cfg,
                    source=source,
                    title=title,
                    summary=extract_summary(meta, body),
                    date=date,
                    tags=parse_tags(meta),
                    slug=make_slug(cfg, source, group, number),
                    order=index,
                    kind=kind,
                    kind_zh=kind_zh,
                    kind_en=kind_en,
                    series_index=index,
                    series_total=total,
                )
            )
    return articles


def make_link_resolver(articles: list[ArticleSource]):
    by_name = {article.source.name: article for article in articles}
    by_stem = {article.source.stem: article for article in articles}

    def resolve(href: str) -> str:
        clean_href = href.strip()
        if clean_href.startswith(("#", "http://", "https://", "mailto:")):
            return clean_href
        path_part, _, anchor = clean_href.partition("#")
        name = Path(unquote(path_part)).name
        target = by_name.get(name) or by_stem.get(Path(name).stem)
        if not target:
            return clean_href
        suffix = f"#{anchor}" if anchor else ""
        return f"../{target.slug}/index.html{suffix}"

    return resolve


def inline_markdown(text: str, link_resolver=None) -> str:
    text = EMOJI_RE.sub("", text)
    text = escape(text)
    text = re.sub(r"`([^`]+)`", r"<code>\1</code>", text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", text)

    def replace_link(match: re.Match[str]) -> str:
        label = match.group(1)
        href = match.group(2)
        resolved = link_resolver(href) if link_resolver else href
        external = resolved.startswith(("http://", "https://"))
        attrs = ' target="_blank" rel="noreferrer"' if external else ""
        return f'<a href="{escape(resolved, quote=True)}"{attrs}>{label}</a>'

    return re.sub(r"\[([^\]]+)]\(([^)]+)\)", replace_link, text)


def slugify_anchor(text: str) -> str:
    digest = hashlib.md5(text.encode("utf-8")).hexdigest()[:8]
    ascii_part = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return ascii_part or f"section-{digest}"


def render_table(lines: list[str], link_resolver) -> str:
    rows = [[cell.strip() for cell in line.strip().strip("|").split("|")] for line in lines]
    if len(rows) < 2:
        return "".join(f"<p>{inline_markdown(line, link_resolver)}</p>" for line in lines)
    head = rows[0]
    body = rows[2:]
    html = ["<div class=\"article-table-wrap\"><table>"]
    html.append("<thead><tr>" + "".join(f"<th>{inline_markdown(cell, link_resolver)}</th>" for cell in head) + "</tr></thead>")
    html.append("<tbody>")
    for row in body:
        html.append("<tr>" + "".join(f"<td>{inline_markdown(cell, link_resolver)}</td>" for cell in row) + "</tr>")
    html.append("</tbody></table></div>")
    return "\n".join(html)


def copy_image(src: str, article: ArticleSource) -> str:
    if src.startswith(("http://", "https://")):
        return src
    clean = unquote(src.strip()).lstrip("./")
    source_dir = article.source.parent
    candidates = [
        source_dir / clean,
        source_dir / "images" / Path(clean).name,
        source_dir / "assets" / Path(clean).name,
    ]
    source = next((candidate for candidate in candidates if candidate.exists() and candidate.is_file()), None)
    if not source:
        return src
    target_dir = PUBLIC_ARTICLE_ASSETS / article.slug
    target_dir.mkdir(parents=True, exist_ok=True)
    target = target_dir / source.name
    shutil.copy2(source, target)
    return f"../../assets/articles/{article.slug}/{source.name}"


def render_markdown(markdown: str, article: ArticleSource, link_resolver) -> tuple[str, list[Heading]]:
    lines = markdown.splitlines()
    html: list[str] = []
    headings: list[Heading] = []
    paragraph: list[str] = []
    list_items: list[str] = []
    ordered_items: list[str] = []
    table_lines: list[str] = []
    quote_lines: list[str] = []
    in_code = False
    code_lang = ""
    code_lines: list[str] = []
    first_h1_skipped = False
    skip_section_level: int | None = None
    anchor_counts: dict[str, int] = {}

    def parse_code_fence(line: str) -> tuple[str, str] | None:
        stripped = line.strip()
        if stripped.startswith("```"):
            return "```", stripped[3:].strip().split()[0] if stripped[3:].strip() else ""
        if stripped.startswith("~~~"):
            return "~~~", stripped[3:].strip().split()[0] if stripped[3:].strip() else ""
        return None

    def unique_anchor(text: str) -> str:
        base = slugify_anchor(text)
        count = anchor_counts.get(base, 0) + 1
        anchor_counts[base] = count
        return base if count == 1 else f"{base}-{count}"

    def flush_paragraph() -> None:
        nonlocal paragraph
        if paragraph:
            html.append(f"<p>{inline_markdown(' '.join(paragraph).strip(), link_resolver)}</p>")
            paragraph = []

    def flush_list() -> None:
        nonlocal list_items
        if list_items:
            html.append("<ul>" + "".join(f"<li>{inline_markdown(item, link_resolver)}</li>" for item in list_items) + "</ul>")
            list_items = []

    def flush_ordered_list() -> None:
        nonlocal ordered_items
        if ordered_items:
            html.append("<ol>" + "".join(f"<li>{inline_markdown(item, link_resolver)}</li>" for item in ordered_items) + "</ol>")
            ordered_items = []

    def flush_table() -> None:
        nonlocal table_lines
        if table_lines:
            html.append(render_table(table_lines, link_resolver))
            table_lines = []

    def flush_quote() -> None:
        nonlocal quote_lines
        if quote_lines:
            body = " ".join(line for line in quote_lines if line and not line.startswith("[!"))
            if body:
                html.append(f"<blockquote>{inline_markdown(body, link_resolver)}</blockquote>")
            quote_lines = []

    def flush_all() -> None:
        flush_paragraph()
        flush_list()
        flush_ordered_list()
        flush_table()
        flush_quote()

    active_fence = ""
    for line in lines:
        stripped_for_skip = line.strip()
        if skip_section_level is not None and not stripped_for_skip.startswith("#"):
            continue
        fence = parse_code_fence(line)
        if fence and (not in_code or fence[0] == active_fence):
            if in_code:
                code = escape("\n".join(code_lines).expandtabs(4))
                if code_lang.lower() == "mermaid":
                    html.append(f"<div class=\"mermaid-card\"><small>Mermaid</small><pre><code>{code}</code></pre></div>")
                else:
                    label = escape(code_lang or "code")
                    html.append(f"<div class=\"code-card\"><small>{label}</small><pre><code>{code}</code></pre></div>")
                in_code = False
                active_fence = ""
                code_lang = ""
                code_lines = []
            else:
                flush_all()
                in_code = True
                active_fence = fence[0]
                code_lang = fence[1]
            continue
        if in_code:
            code_lines.append(line)
            continue

        stripped = line.strip()
        if not stripped:
            if skip_section_level is not None:
                continue
            flush_all()
            continue
        if stripped == "---":
            flush_all()
            html.append("<hr>")
            continue
        if stripped.startswith("#"):
            flush_all()
            level = min(3, len(stripped) - len(stripped.lstrip("#")))
            text = strip_markdown(stripped[level:].strip())
            if skip_section_level is not None:
                if level <= skip_section_level:
                    skip_section_level = None
                else:
                    continue
            if level == 1 and not first_h1_skipped:
                first_h1_skipped = True
                continue
            if level == 2 and text in SKIPPED_SECTION_TITLES:
                skip_section_level = level
                continue
            anchor = unique_anchor(text)
            headings.append(Heading(level, text, anchor))
            html.append(f"<h{level} id=\"{anchor}\">{inline_markdown(text, link_resolver)}</h{level}>")
            continue
        if skip_section_level is not None:
            continue
        image_match = re.match(r"!\[([^\]]*)]\(([^)]+)\)", stripped)
        if image_match:
            flush_all()
            alt, src = image_match.groups()
            html_src = copy_image(src, article)
            alt_text = strip_markdown(alt or Path(src).stem)
            html.append(f"<figure><img src=\"{escape(html_src, quote=True)}\" alt=\"{escape(alt_text)}\"><figcaption>{inline_markdown(alt_text, link_resolver)}</figcaption></figure>")
            continue
        if stripped.startswith(">"):
            flush_paragraph()
            flush_list()
            flush_ordered_list()
            flush_table()
            quote_lines.append(stripped.lstrip("> "))
            continue
        if re.match(r"^[-*]\s+", stripped):
            flush_paragraph()
            flush_ordered_list()
            flush_table()
            flush_quote()
            list_items.append(re.sub(r"^[-*]\s+", "", stripped))
            continue
        if re.match(r"^\d+\.\s+", stripped):
            flush_paragraph()
            flush_list()
            flush_table()
            flush_quote()
            ordered_items.append(re.sub(r"^\d+\.\s+", "", stripped))
            continue
        if "|" in stripped and stripped.startswith("|"):
            flush_paragraph()
            flush_list()
            flush_ordered_list()
            flush_quote()
            table_lines.append(stripped)
            continue
        flush_list()
        flush_ordered_list()
        flush_table()
        flush_quote()
        paragraph.append(stripped)

    flush_all()
    if in_code:
        code = escape("\n".join(code_lines).expandtabs(4))
        label = escape(code_lang or "code")
        html.append(f"<div class=\"code-card\"><small>{label}</small><pre><code>{code}</code></pre></div>")
    return "\n".join(html), headings


def build_toc(headings: list[Heading]) -> str:
    items = [heading for heading in headings if heading.level == 2]
    if not items:
        items = [heading for heading in headings if heading.level == 3]
    if not items:
        return "<p>暂无目录</p>"
    return "<ol>" + "".join(f'<li><a href="#{heading.anchor}">{inline_markdown(heading.text)}</a></li>' for heading in items) + "</ol>"


def reading_time(markdown: str) -> str:
    chars = len(re.sub(r"\s+", "", markdown))
    minutes = max(1, round(chars / 550))
    return f"约 {minutes} 分钟阅读"


def relative_article_link(from_article: ArticleSource, to_article: ArticleSource | None) -> str:
    if not to_article:
        return "../../index.html#articles"
    return f"../{to_article.slug}/index.html"


def render_article(article: ArticleSource, articles: list[ArticleSource], link_resolver) -> None:
    raw = EMOJI_RE.sub("", article.source.read_text(encoding="utf-8"))
    meta, body = parse_frontmatter(raw)
    content, headings = render_markdown(body, article, link_resolver)
    if article.kind == "source":
        content = (
            "<div class=\"article-source-scope\">"
            "<strong>源码范围说明</strong>"
            "<p>本篇属于 MQTT 源码加更，展示的是 V1.0 运行链路中的核心源码片段、对象职责和阅读顺序；"
            "它不是完整工程源码包，也不等同于 1.0 全量源码清单。完整源码资源后续应在资源/源码页统一维护。</p>"
            "</div>\n"
            f"{content}"
        )
    same_series = [item for item in articles if item.config.key == article.config.key]
    index = same_series.index(article)
    previous_article = same_series[index - 1] if index > 0 else None
    next_article = same_series[index + 1] if index + 1 < len(same_series) else None

    def nav_values(target: ArticleSource | None, fallback_label: str) -> tuple[str, str, str, str]:
        if target:
            label = f"{fallback_label} / 第{target.series_index}篇"
            return relative_article_link(article, target), label, target.title, target.summary
        return "../../index.html#articles", f"{fallback_label} / 系列入口", "返回 CODESYS MQTT 文章中心", "回到文章中心，继续定位同系列文章和相关 MQTT 资料。"

    prev_href, prev_label, prev_title, prev_summary = nav_values(previous_article, "上一篇")
    next_href, next_label, next_title, next_summary = nav_values(next_article, "下一篇")

    article_html = TEMPLATE.read_text(encoding="utf-8")
    replacements = {
        "{{TITLE}}": escape(article.title),
        "{{DESCRIPTION}}": escape(article.summary),
        "{{CANONICAL}}": f"https://benpeng0205.github.io/articles/{article.slug}/",
        "{{ASSET_PREFIX}}": "../../",
        "{{STYLE_HREF}}": "../../styles/site.css",
        "{{HOME_HREF}}": "../../index.html",
        "{{SERIES}}": article.config.title_zh,
        "{{CATEGORY_PRIMARY}}": "通信",
        "{{CATEGORY_SECONDARY}}": "CODESYS",
        "{{DATE}}": article.date,
        "{{READING_TIME}}": reading_time(body),
        "{{SERIES_PROGRESS}}": f"第{article.series_index}篇/共{article.series_total}篇",
        "{{TAGS}}": " / ".join(article.tags),
        "{{TOC}}": build_toc(headings),
        "{{CONTENT}}": content,
        "{{PREV_HREF}}": prev_href,
        "{{PREV_LABEL}}": escape(prev_label),
        "{{PREV_TITLE}}": escape(prev_title),
        "{{PREV_SUMMARY}}": escape(prev_summary),
        "{{NEXT_HREF}}": next_href,
        "{{NEXT_LABEL}}": escape(next_label),
        "{{NEXT_TITLE}}": escape(next_title),
        "{{NEXT_SUMMARY}}": escape(next_summary),
    }
    for key, value in replacements.items():
        article_html = article_html.replace(key, value)

    target = ARTICLE_ROOT / article.slug
    target.mkdir(parents=True, exist_ok=True)
    (target / "index.html").write_text(article_html, encoding="utf-8")


def article_catalog_item(article: ArticleSource) -> dict[str, object]:
    sequence = f"{article.series_index:02d}"
    return {
        "id": article.slug,
        "type": {"zh": "文章", "en": "Article"},
        "title": {"zh": article.title, "en": article.title},
        "copy": {"zh": article.summary, "en": article.summary},
        "href": article.href,
        "category": {"zh": "通信 / CODESYS", "en": "Communication / CODESYS"},
        "series": {"zh": article.config.title_zh, "en": article.config.title_en},
        "seriesKey": article.config.key,
        "seriesTitle": {"zh": article.config.title_zh, "en": article.config.title_en},
        "folder": {"zh": article.config.folder_zh, "en": article.config.folder_en},
        "kind": {"zh": article.kind_zh, "en": article.kind_en},
        "progress": {"zh": f"第{article.series_index}篇/共{article.series_total}篇", "en": f"Part {article.series_index} / {article.series_total}"},
        "status": {"zh": f"官网全文 / 第{article.series_index}篇", "en": f"This Site / Part {article.series_index}"},
        "cardMeta": {"zh": f"{sequence} · {article.config.folder_zh}", "en": f"{sequence} · {article.config.folder_en}"},
        "date": article.date,
        "tags": article.tags,
        "keywords": " ".join(["MQTT", "CODESYS", article.config.folder_zh, article.kind_zh, article.title, *article.tags]),
        "order": article.order,
        "source": str(article.source),
    }


def write_article_indexes(articles: list[ArticleSource]) -> None:
    ARTICLE_INDEX.parent.mkdir(parents=True, exist_ok=True)
    index = {"articles": [
        {
            "id": article.slug,
            "title": article.title,
            "series": article.config.title_zh,
            "category": "通信 / CODESYS",
            "summary": article.summary,
            "date": article.date,
            "tags": article.tags,
            "path": article.href,
            "source": str(article.source),
        }
        for article in articles
    ]}
    ARTICLE_INDEX.write_text(json.dumps(index, ensure_ascii=False, indent=2), encoding="utf-8")

    catalog = [article_catalog_item(article) for article in articles]
    ARTICLE_DATA_JS.write_text(
        "// MQTT 文章目录由 scripts/import_article_package.py 从 Obsidian 发布稿批量生成。\n"
        "window.CONTROLROOKIE_ARTICLES = "
        + json.dumps(catalog, ensure_ascii=False, indent=2)
        + ";\n",
        encoding="utf-8",
    )


def update_sitemap(articles: list[ArticleSource]) -> None:
    urls = [
        "  <url>\n"
        "    <loc>https://benpeng0205.github.io/</loc>\n"
        "    <lastmod>2026-06-11</lastmod>\n"
        "    <changefreq>weekly</changefreq>\n"
        "    <priority>1.0</priority>\n"
        "  </url>"
    ]
    for article in articles:
        urls.append(
            "  <url>\n"
            f"    <loc>https://benpeng0205.github.io/articles/{article.slug}/</loc>\n"
            f"    <lastmod>{article.date}</lastmod>\n"
            "    <changefreq>monthly</changefreq>\n"
            "    <priority>0.8</priority>\n"
            "  </url>"
        )
    sitemap = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n"
    sitemap += "\n".join(urls)
    sitemap += "\n</urlset>\n"
    (PROJECT_ROOT / "public" / "sitemap.xml").write_text(sitemap, encoding="utf-8")


def main() -> None:
    articles = discover_articles()
    if len(articles) != 30:
        raise SystemExit(f"MQTT 文章数量异常，期望 30 篇，实际 {len(articles)} 篇。")

    link_resolver = make_link_resolver(articles)

    if ARTICLE_ROOT.exists():
        for child in ARTICLE_ROOT.iterdir():
            if child.is_dir() and child.name.startswith("mqtt-"):
                shutil.rmtree(child)
    if PUBLIC_ARTICLE_ASSETS.exists():
        for child in PUBLIC_ARTICLE_ASSETS.iterdir():
            if child.is_dir() and child.name.startswith("mqtt-"):
                shutil.rmtree(child)

    for article in articles:
        render_article(article, articles, link_resolver)
    write_article_indexes(articles)
    update_sitemap(articles)
    print(f"ARTICLE_IMPORT_OK count={len(articles)}")


if __name__ == "__main__":
    main()
