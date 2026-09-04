"""Compone el vídeo vertical final con ffmpeg: gameplay + narración + subtítulos."""

from __future__ import annotations

import json
import random
import shlex
import subprocess
from pathlib import Path

WIDTH, HEIGHT, FPS = 1080, 1920, 30


def probe_duration(path: Path) -> float:
    out = subprocess.run(
        [
            "ffprobe", "-v", "error", "-show_entries", "format=duration",
            "-of", "default=nw=1:nk=1", str(path),
        ],
        capture_output=True, text=True, check=True,
    )
    return float(out.stdout.strip())


def _escape_filter_path(path: Path) -> str:
    """Escapa una ruta para usarla dentro de un filtro de ffmpeg."""
    s = str(path)
    for a, b in (("\\", "\\\\"), (":", "\\:"), ("'", "\\'"), ("[", "\\["), ("]", "\\]"), (",", "\\,")):
        s = s.replace(a, b)
    return s


def render(
    background: Path,
    narration: Path,
    ass: Path,
    out_path: Path,
    music: Path | None = None,
    music_db: float = -22.0,
    bg_start: float | None = None,
    saturation: float = 1.18,
    seed: int | None = None,
    crf: int = 20,
) -> Path:
    """Renderiza el vídeo 1080x1920 y devuelve la ruta de salida."""
    duration = probe_duration(narration) + 0.45  # cola corta al final
    bg_duration = probe_duration(background)

    if bg_start is None:
        rng = random.Random(seed)
        # Arranca en un punto al azar para que dos vídeos no se vean iguales.
        bg_start = rng.uniform(0, max(0.0, bg_duration - duration)) if bg_duration > duration else 0.0

    # Recorte central 9:16, escalado nítido y un poco de saturación.
    video_chain = (
        f"[0:v]crop='min(iw,ih*9/16)':'min(ih,iw*16/9)',"
        f"scale={WIDTH}:{HEIGHT}:flags=lanczos,"
        f"unsharp=5:5:0.9:3:3:0.5,"
        f"eq=saturation={saturation}:contrast=1.05,"
        f"fps={FPS},setsar=1,"
        f"ass='{_escape_filter_path(ass)}'[v]"
    )

    cmd = ["ffmpeg", "-y", "-hide_banner", "-loglevel", "error",
           "-stream_loop", "-1", "-ss", f"{bg_start:.3f}", "-i", str(background),
           "-i", str(narration)]

    if music:
        cmd += ["-stream_loop", "-1", "-i", str(music)]
        audio_chain = (
            f";[2:a]volume={music_db}dB,afade=t=out:st={duration - 1.2:.2f}:d=1.2[m];"
            f"[1:a][m]amix=inputs=2:duration=first:dropout_transition=0,"
            f"loudnorm=I=-14:TP=-1.5:LRA=11[a]"
        )
        audio_map = ["-map", "[a]"]
    else:
        audio_chain = ";[1:a]loudnorm=I=-14:TP=-1.5:LRA=11[a]"
        audio_map = ["-map", "[a]"]

    out_path.parent.mkdir(parents=True, exist_ok=True)
    cmd += [
        "-filter_complex", video_chain + audio_chain,
        "-map", "[v]", *audio_map,
        "-t", f"{duration:.3f}",
        "-c:v", "libx264", "-preset", "medium", "-crf", str(crf),
        "-profile:v", "high", "-pix_fmt", "yuv420p", "-g", str(FPS * 2),
        "-c:a", "aac", "-b:a", "192k", "-ar", "48000",
        "-movflags", "+faststart",
        str(out_path),
    ]

    print("  ffmpeg:", " ".join(shlex.quote(c) for c in cmd[:8]), "...")
    subprocess.run(cmd, check=True)
    return out_path
