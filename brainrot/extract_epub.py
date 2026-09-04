#!/usr/bin/env python3
"""Extrae el texto de cada capítulo de un EPUB a ficheros .txt."""

from __future__ import annotations

import argparse
import html
import re
import zipfile
from pathlib import Path

_TAG = re.compile(r"<[^>]+>")
_BLOCK_END = re.compile(r"</(p|div|h[1-6]|li|blockquote)>", re.I)


def chapter_text(raw: str) -> str:
    text = _BLOCK_END.sub("\n\n", raw)
    text = _TAG.sub(" ", text)
    text = html.unescape(text)
    paragraphs = [re.sub(r"\s+", " ", p).strip() for p in text.split("\n\n")]
    return "\n\n".join(p for p in paragraphs if p)


def main() -> int:
    p = argparse.ArgumentParser(description="EPUB -> un .txt por capítulo")
    p.add_argument("epub", type=Path)
    p.add_argument("--out-dir", type=Path, default=Path("fuente"))
    args = p.parse_args()

    args.out_dir.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(args.epub) as z:
        names = [
            n for n in z.namelist()
            if n.lower().endswith((".xhtml", ".html", ".htm"))
            and "nav" not in n.lower()
            and "cover" not in n.lower()
        ]
        for name in sorted(names):
            text = chapter_text(z.read(name).decode("utf-8", errors="replace"))
            if len(text) < 400:  # páginas de portada, créditos, etc.
                continue
            out = args.out_dir / (Path(name).stem + ".txt")
            out.write_text(text, encoding="utf-8")
            print(f"{out}  ({len(text.split())} palabras)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
