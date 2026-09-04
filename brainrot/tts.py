"""Narración TTS con timings palabra por palabra (Microsoft Edge Neural)."""

from __future__ import annotations

import asyncio
import json
import re
import unicodedata
from dataclasses import dataclass, asdict
from pathlib import Path

import edge_tts

# Los offsets de edge-tts vienen en unidades de 100 nanosegundos.
TICKS_PER_SECOND = 10_000_000


@dataclass
class Word:
    text: str  # palabra tal como se muestra en pantalla (con su puntuación)
    start: float  # segundos
    end: float  # segundos


def _strip(token: str) -> str:
    """Normaliza un token para poder comparar el guion con lo que devuelve el TTS."""
    token = unicodedata.normalize("NFD", token.lower())
    token = "".join(c for c in token if unicodedata.category(c) != "Mn")
    return re.sub(r"[^0-9a-zñ]", "", token)


def _tokenize(script: str) -> list[str]:
    """Parte el guion en tokens conservando la puntuación pegada a cada palabra."""
    return [t for t in re.split(r"\s+", script.strip()) if t]


def _align(script_tokens: list[str], boundaries: list[dict]) -> list[Word]:
    """Devuelve las palabras del guion (con puntuación) con el timing del TTS.

    edge-tts entrega las palabras sin signos de puntuación, así que recorremos
    ambas listas en paralelo y le pegamos a cada token del guion el timing de la
    palabra que le corresponde.
    """
    words: list[Word] = []
    i = 0
    for b in boundaries:
        start = b["offset"] / TICKS_PER_SECOND
        end = (b["offset"] + b["duration"]) / TICKS_PER_SECOND
        target = _strip(b["text"])

        # Busca el siguiente token del guion que coincida (tolerando desfases
        # por comillas, guiones o signos de apertura sueltos).
        match = None
        for j in range(i, min(i + 6, len(script_tokens))):
            if _strip(script_tokens[j]) == target:
                match = j
                break

        if match is None:
            # El TTS dijo algo que no encontramos en el guion: usamos su texto.
            words.append(Word(b["text"], start, end))
            continue

        # Los tokens saltados (puntuación suelta) se pegan al anterior.
        for skipped in script_tokens[i:match]:
            if words:
                words[-1].text += " " + skipped
        words.append(Word(script_tokens[match], start, end))
        i = match + 1

    return words


async def _synthesize(script: str, voice: str, rate: str, pitch: str, out_audio: Path):
    communicate = edge_tts.Communicate(
        script, voice, rate=rate, pitch=pitch, boundary="WordBoundary"
    )
    audio = bytearray()
    boundaries: list[dict] = []
    async for chunk in communicate.stream():
        if chunk["type"] == "audio":
            audio += chunk["data"]
        elif chunk["type"] == "WordBoundary":
            boundaries.append(chunk)

    if not audio:
        raise RuntimeError("El TTS no devolvió audio.")
    out_audio.write_bytes(bytes(audio))
    return boundaries


def narrate(
    script: str,
    out_audio: Path,
    out_timings: Path,
    voice: str = "es-MX-JorgeNeural",
    rate: str = "+18%",
    pitch: str = "+0Hz",
) -> list[Word]:
    """Sintetiza `script` y guarda el mp3 y los timings palabra por palabra."""
    out_audio.parent.mkdir(parents=True, exist_ok=True)
    boundaries = asyncio.run(_synthesize(script, voice, rate, pitch, out_audio))
    words = _align(_tokenize(script), boundaries)
    out_timings.write_text(
        json.dumps([asdict(w) for w in words], ensure_ascii=False, indent=1),
        encoding="utf-8",
    )
    return words
