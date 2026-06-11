from __future__ import annotations

from dataclasses import dataclass
from html import escape
from pathlib import Path
import hashlib
import json
import re
import shutil


PROJECT_ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = Path(r"E:\Obsidian\Work\03_资源\通信\MQTT\MqttClient系列教程")
SOURCE_MD = SOURCE_DIR / "第1篇_官方MQTT库要花钱_那我就自己开源一套CODESYS MQTT客户端_以及MQTT到底跑在哪一层.md"
SLUG = "mqtt-client-open-source-codesys-layer"
ARTICLE_DIR = PROJECT_ROOT / "src" / "app" / "articles" / SLUG
PUBLIC_ARTICLE_ASSETS = PROJECT_ROOT / "public" / "assets" / "articles" / SLUG
TEMPLATE = PROJECT_ROOT / "src" / "app" / "article-template.html"
ARTICLE_INDEX = PROJECT_ROOT / "src" / "content" / "articles.json"


@dataclass
class Heading:
    level: int
    text: str
    anchor: str


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
            assert isinstance(data[current_key], list)
            data[current_key].append(line[4:].strip())
            continue
        if ":" in line:
            key, value = line.split(":", 1)
            current_key = key.strip()
            value = value.strip()
            data[current_key] = value if value else []
    return data, body


def slugify(text: str) -> str:
    digest = hashlib.md5(text.encode("utf-8")).hexdigest()[:8]
    ascii_part = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return ascii_part or f"section-{digest}"


def inline_markdown(text: str) -> str:
    text = escape(text)
    text = re.sub(r"`([^`]+)`", r"<code>\1</code>", text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", text)
    text = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r'<a href="\2" target="_blank" rel="noreferrer">\1</a>', text)
    return text


def render_table(lines: list[str]) -> str:
    rows = [[cell.strip() for cell in line.strip().strip("|").split("|")] for line in lines]
    if len(rows) < 2:
        return "".join(f"<p>{inline_markdown(line)}</p>" for line in lines)
    head = rows[0]
    body = rows[2:]
    html = ["<div class=\"article-table-wrap\"><table>"]
    html.append("<thead><tr>" + "".join(f"<th>{inline_markdown(cell)}</th>" for cell in head) + "</tr></thead>")
    html.append("<tbody>")
    for row in body:
        html.append("<tr>" + "".join(f"<td>{inline_markdown(cell)}</td>" for cell in row) + "</tr>")
    html.append("</tbody></table></div>")
    return "\n".join(html)


def copy_image(src: str) -> str:
    source = (SOURCE_DIR / src).resolve()
    if not source.exists():
        source = (SOURCE_DIR / "images" / Path(src).name).resolve()
    if not source.exists():
        return src
    PUBLIC_ARTICLE_ASSETS.mkdir(parents=True, exist_ok=True)
    target = PUBLIC_ARTICLE_ASSETS / source.name
    shutil.copy2(source, target)
    return f"../../../public/assets/articles/{SLUG}/{source.name}"


def render_markdown(markdown: str) -> tuple[str, list[Heading]]:
    lines = markdown.splitlines()
    html: list[str] = []
    headings: list[Heading] = []
    paragraph: list[str] = []
    list_items: list[str] = []
    table_lines: list[str] = []
    quote_lines: list[str] = []
    in_code = False
    code_lang = ""
    code_lines: list[str] = []

    def flush_paragraph() -> None:
        nonlocal paragraph
        if paragraph:
            html.append(f"<p>{inline_markdown(' '.join(paragraph).strip())}</p>")
            paragraph = []

    def flush_list() -> None:
        nonlocal list_items
        if list_items:
            html.append("<ul>" + "".join(f"<li>{inline_markdown(item)}</li>" for item in list_items) + "</ul>")
            list_items = []

    def flush_table() -> None:
        nonlocal table_lines
        if table_lines:
            html.append(render_table(table_lines))
            table_lines = []

    def flush_quote() -> None:
        nonlocal quote_lines
        if quote_lines:
            body = " ".join(line for line in quote_lines if line and not line.startswith("[!"))
            html.append(f"<blockquote>{inline_markdown(body)}</blockquote>")
            quote_lines = []

    def flush_all() -> None:
        flush_paragraph()
        flush_list()
        flush_table()
        flush_quote()

    for line in lines:
        if line.startswith("```"):
            if in_code:
                code = escape("\n".join(code_lines))
                if code_lang == "mermaid":
                    html.append(f"<div class=\"mermaid-card\"><small>Mermaid</small><pre><code>{code}</code></pre></div>")
                else:
                    html.append(f"<div class=\"code-card\"><small>{escape(code_lang or 'code')}</small><pre><code>{code}</code></pre></div>")
                in_code = False
                code_lang = ""
                code_lines = []
            else:
                flush_all()
                in_code = True
                code_lang = line.strip("`").strip()
            continue
        if in_code:
            code_lines.append(line)
            continue

        stripped = line.strip()
        if not stripped:
            flush_all()
            continue
        if stripped == "---":
            flush_all()
            html.append("<hr>")
            continue
        if stripped.startswith("#"):
            flush_all()
            level = min(3, len(stripped) - len(stripped.lstrip("#")))
            text = stripped[level:].strip()
            anchor = slugify(text)
            headings.append(Heading(level, text, anchor))
            html.append(f"<h{level} id=\"{anchor}\">{inline_markdown(text)}</h{level}>")
            continue
        image_match = re.match(r"!\[([^\]]*)\]\(([^)]+)\)", stripped)
        if image_match:
            flush_all()
            alt, src = image_match.groups()
            html_src = copy_image(src)
            html.append(f"<figure><img src=\"{html_src}\" alt=\"{escape(alt or Path(src).stem)}\"><figcaption>{inline_markdown(alt or Path(src).stem)}</figcaption></figure>")
            continue
        if stripped.startswith(">"):
            flush_paragraph()
            flush_list()
            flush_table()
            quote_lines.append(stripped.lstrip("> "))
            continue
        if re.match(r"^[-*]\s+", stripped):
            flush_paragraph()
            flush_table()
            flush_quote()
            list_items.append(re.sub(r"^[-*]\s+", "", stripped))
            continue
        if re.match(r"^\d+\.\s+", stripped):
            flush_paragraph()
            flush_table()
            flush_quote()
            list_items.append(re.sub(r"^\d+\.\s+", "", stripped))
            continue
        if "|" in stripped and stripped.startswith("|"):
            flush_paragraph()
            flush_list()
            flush_quote()
            table_lines.append(stripped)
            continue
        flush_list()
        flush_table()
        flush_quote()
        paragraph.append(stripped)

    flush_all()
    return "\n".join(html), headings


def build_toc(headings: list[Heading]) -> str:
    items = [heading for heading in headings if heading.level <= 2]
    if not items:
        return "<p>暂无目录</p>"
    return "<ol>" + "".join(f'<li><a href="#{heading.anchor}">{inline_markdown(heading.text)}</a></li>' for heading in items) + "</ol>"


def reading_time(markdown: str) -> str:
    chars = len(re.sub(r"\s+", "", markdown))
    minutes = max(1, round(chars / 550))
    return f"约 {minutes} 分钟阅读"


def main() -> None:
    raw = SOURCE_MD.read_text(encoding="utf-8")
    meta, body = parse_frontmatter(raw)
    content, headings = render_markdown(body)
    title = str(meta.get("title") or headings[0].text)
    tags = meta.get("tags") if isinstance(meta.get("tags"), list) else []
    summary = "这一篇先解决为什么要做开源 CODESYS MQTT 客户端、MQTT 在协议分层中的位置，以及 NBS TCP 与 MQTT 的工程关系。"

    article_html = TEMPLATE.read_text(encoding="utf-8")
    replacements = {
        "{{TITLE}}": escape(title),
        "{{DESCRIPTION}}": escape(summary),
        "{{CANONICAL}}": f"https://benpeng0205.github.io/articles/{SLUG}/",
        "{{ASSET_PREFIX}}": "../../../public/",
        "{{STYLE_HREF}}": "../../styles/site.css",
        "{{HOME_HREF}}": "../../index.html",
        "{{SERIES}}": "MQTT Client 系列教程",
        "{{CATEGORY}}": "通信 / CODESYS",
        "{{DATE}}": str(meta.get("created") or "2026-05-06"),
        "{{READING_TIME}}": reading_time(body),
        "{{TAGS}}": " / ".join(str(tag) for tag in tags),
        "{{TOC}}": build_toc(headings),
        "{{CONTENT}}": content,
    }
    for key, value in replacements.items():
        article_html = article_html.replace(key, value)

    ARTICLE_DIR.mkdir(parents=True, exist_ok=True)
    (ARTICLE_DIR / "index.html").write_text(article_html, encoding="utf-8")

    ARTICLE_INDEX.parent.mkdir(parents=True, exist_ok=True)
    index = {
        "articles": [
            {
                "id": SLUG,
                "title": title,
                "series": "MQTT Client 系列教程",
                "category": "通信 / CODESYS",
                "summary": summary,
                "date": str(meta.get("created") or "2026-05-06"),
                "tags": tags,
                "path": f"articles/{SLUG}/index.html",
                "source": str(SOURCE_MD),
            }
        ]
    }
    ARTICLE_INDEX.write_text(json.dumps(index, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"ARTICLE_IMPORT_OK {ARTICLE_DIR / 'index.html'}")


if __name__ == "__main__":
    main()
