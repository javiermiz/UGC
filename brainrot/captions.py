"""Genera subtítulos ASS estilo brainrot: frase en pantalla, palabra activa resaltada."""

from __future__ import annotations

import re
from dataclasses import dataclass
from pathlib import Path

from tts import Word

# Puntuación que corta una frase (la palabra que la lleva cierra el grupo).
_BREAK = re.compile(r"[.!?…:;,—]$")
_HARD_BREAK = re.compile(r"[.!?…]$")


# Puntuación que se pronuncia pero no se dibuja (los rótulos van "limpios").
_TRAILING = '.,;:—…"»«)'


@dataclass
class CaptionStyle:
    font: str = "Anton"
    size: int = 132
    color: str = "&H00FFFFFF"  # blanco  (ASS = &HAABBGGRR)
    highlight: str = "&H0000DEFF"  # amarillo #FFDE00
    outline_color: str = "&H00000000"
    outline: int = 10
    shadow: int = 5
    pos_x: int = 540
    pos_y: int = 1090  # un poco por debajo del centro, como en TikTok
    max_chars: int = 13  # ancho máximo de línea antes de partir
    max_words: int = 3  # palabras visibles a la vez
    max_span: float = 1.7  # segundos máximos por grupo
    pop: int = 108  # escala % de la palabra activa
    uppercase: bool = True


def _fmt_time(t: float) -> str:
    t = max(0.0, t)
    h = int(t // 3600)
    m = int((t % 3600) // 60)
    s = t % 60
    return f"{h:d}:{m:02d}:{s:05.2f}"


def _escape(text: str) -> str:
    return text.replace("\\", "\\\\").replace("{", "\\{").replace("}", "\\}")


def group_words(words: list[Word], style: CaptionStyle) -> list[list[Word]]:
    """Agrupa las palabras en frases cortas, cortando en la puntuación."""
    groups: list[list[Word]] = []
    current: list[Word] = []
    for word in words:
        current.append(word)
        span = current[-1].end - current[0].start
        stripped = word.text.strip().strip('"»«')
        if (
            len(current) >= style.max_words
            or _BREAK.search(stripped)
            or span >= style.max_span
        ):
            groups.append(current)
            current = []
    if current:
        groups.append(current)
    return groups


def _wrap(texts: list[str], max_chars: int) -> list[list[int]]:
    """Reparte los índices de palabra en líneas de como mucho `max_chars`."""
    lines: list[list[int]] = [[]]
    length = 0
    for i, t in enumerate(texts):
        add = len(t) + (1 if lines[-1] else 0)
        if lines[-1] and length + add > max_chars:
            lines.append([i])
            length = len(t)
        else:
            lines[-1].append(i)
            length += add
    return lines


def build_ass(words: list[Word], style: CaptionStyle, out_path: Path) -> Path:
    """Escribe el fichero .ass con el resaltado palabra por palabra."""
    groups = group_words(words, style)
    events: list[str] = []

    for gi, group in enumerate(groups):
        texts = [w.text.strip().rstrip(_TRAILING) or w.text.strip() for w in group]
        if style.uppercase:
            texts = [t.upper() for t in texts]
        lines = _wrap(texts, style.max_chars)

        group_start = group[0].start
        next_start = groups[gi + 1][0].start if gi + 1 < len(groups) else None
        # La frase se queda un poco en pantalla tras la última palabra, pero
        # nunca invade el grupo siguiente.
        group_end = group[-1].end + 0.30
        if next_start is not None:
            group_end = min(group_end, next_start)
        group_end = max(group_end, group[-1].end)

        for wi, word in enumerate(group):
            seg_start = group_start if wi == 0 else word.start
            seg_end = group[wi + 1].start if wi + 1 < len(group) else group_end
            if seg_end <= seg_start:
                continue

            rendered_lines = []
            for line in lines:
                parts = []
                for i in line:
                    token = _escape(texts[i])
                    if i == wi:
                        parts.append(
                            f"{{\\c{style.highlight}\\fscx{style.pop}"
                            f"\\fscy{style.pop}}}{token}"
                            f"{{\\c{style.color}\\fscx100\\fscy100}}"
                        )
                    else:
                        parts.append(token)
                rendered_lines.append(" ".join(parts))

            body = "\\N".join(rendered_lines)
            intro = "\\fad(70,0)" if wi == 0 else ""
            text = f"{{\\pos({style.pos_x},{style.pos_y}){intro}}}{body}"
            events.append(
                f"Dialogue: 0,{_fmt_time(seg_start)},{_fmt_time(seg_end)},"
                f"Brainrot,,0,0,0,,{text}"
            )

    header = f"""[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
WrapStyle: 2
ScaledBorderAndShadow: yes
YCbCr Matrix: TV.709

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Brainrot,{style.font},{style.size},{style.color},{style.color},{style.outline_color},&H90000000,0,0,0,0,100,100,0,0,1,{style.outline},{style.shadow},5,60,60,60,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""

    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(header + "\n".join(events) + "\n", encoding="utf-8")
    return out_path
