#!/usr/bin/env python3
"""Convierte un guion de texto en un vídeo vertical estilo brainrot.

    python3 brainrot/make.py \
        --script brainrot/scripts/44-foso-de-los-leones.txt \
        --bg assets/mc_parkour.mp4 \
        --out out/44-foso-de-los-leones.mp4
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from captions import CaptionStyle, build_ass  # noqa: E402
from render import render  # noqa: E402
from tts import narrate  # noqa: E402


def read_script(path: Path) -> str:
    """Lee el guion ignorando líneas de comentario que empiezan por '#'."""
    lines = [
        line.rstrip()
        for line in path.read_text(encoding="utf-8").splitlines()
        if not line.lstrip().startswith("#")
    ]
    return "\n".join(lines).strip()


def main() -> int:
    p = argparse.ArgumentParser(description="Genera un vídeo brainrot a partir de un guion.")
    p.add_argument("--script", required=True, type=Path)
    p.add_argument("--bg", required=True, type=Path, help="Vídeo de gameplay de fondo")
    p.add_argument("--out", required=True, type=Path)
    p.add_argument("--music", type=Path, default=None)
    p.add_argument("--voice", default="es-MX-JorgeNeural")
    p.add_argument("--rate", default="+18%", help="Velocidad del TTS, p. ej. +18%%")
    p.add_argument("--pitch", default="+0Hz")
    p.add_argument("--font", default="Anton")
    p.add_argument("--size", type=int, default=132)
    p.add_argument("--highlight", default="&H0000DEFF", help="Color ASS (&HBBGGRR)")
    p.add_argument("--max-words", type=int, default=3)
    p.add_argument("--bg-start", type=float, default=None)
    p.add_argument("--seed", type=int, default=None)
    p.add_argument("--keep", action="store_true", help="Conserva mp3/ass intermedios")
    args = p.parse_args()

    script = read_script(args.script)
    if not script:
        print("El guion está vacío.", file=sys.stderr)
        return 1

    work = args.out.parent / ".work"
    work.mkdir(parents=True, exist_ok=True)
    stem = args.out.stem
    audio = work / f"{stem}.mp3"
    timings = work / f"{stem}.words.json"
    ass = work / f"{stem}.ass"

    print(f"[1/3] Narrando con {args.voice} ({len(script.split())} palabras)...")
    words = narrate(script, audio, timings, voice=args.voice, rate=args.rate, pitch=args.pitch)
    print(f"      {len(words)} palabras con timing -> {audio.name}")

    print("[2/3] Generando subtítulos...")
    style = CaptionStyle(
        font=args.font, size=args.size, highlight=args.highlight, max_words=args.max_words
    )
    build_ass(words, style, ass)

    print("[3/3] Renderizando vídeo...")
    render(
        background=args.bg,
        narration=audio,
        ass=ass,
        out_path=args.out,
        music=args.music,
        bg_start=args.bg_start,
        seed=args.seed,
    )

    if not args.keep:
        for f in (audio, timings, ass):
            f.unlink(missing_ok=True)

    print(f"\nListo: {args.out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
