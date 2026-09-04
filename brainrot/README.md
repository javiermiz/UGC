# Brainrot · vídeos verticales narrados

Pipeline para convertir texto (capítulos de un EPUB, por ejemplo) en vídeos
verticales 1080x1920 con gameplay de fondo, narración TTS y subtítulos que se
resaltan palabra por palabra.

> Carpeta independiente del portfolio Astro. No entra en el build del sitio.

## Cómo funciona

```
guion .txt  ──▶  tts.py       narración mp3 + timing de cada palabra (Edge Neural)
            ──▶  captions.py  .ass con la palabra activa resaltada
            ──▶  render.py    ffmpeg: recorte 9:16 + subtítulos + audio
```

El TTS devuelve el `offset` y la `duration` de **cada palabra**, así que los
rótulos van sincronizados con la voz sin tener que ajustarlos a mano.

## Requisitos

```bash
apt-get install -y ffmpeg fontconfig     # ffmpeg con libass
pip install edge-tts
```

Fuente de los rótulos: [Anton](https://fonts.google.com/specimen/Anton) (OFL).
Descárgala e instálala en el sistema (`/usr/share/fonts/…` + `fc-cache -f`), o
pasa otra con `--font`.

## Uso

```bash
python3 brainrot/make.py \
  --script brainrot/scripts/44-foso-de-los-leones.txt \
  --bg assets/mc_parkour.mp4 \
  --out out/foso-de-los-leones.mp4
```

Opciones útiles:

| Flag | Para qué |
| --- | --- |
| `--voice` | Voz del TTS (`edge-tts --list-voices \| grep ^es-`) |
| `--rate` | Velocidad, `+18%` por defecto |
| `--music` | Pista de música de fondo (se mezcla a −22 dB) |
| `--max-words` | Palabras visibles a la vez (3 por defecto; 1 = una a una) |
| `--size` / `--font` / `--highlight` | Tipografía y color del resaltado |
| `--bg-start` / `--seed` | Punto de arranque del gameplay |
| `--keep` | Conserva el mp3, el `.ass` y el JSON de timings |

## Formato del guion

Texto plano. Las líneas que empiezan por `#` son comentarios y no se narran.
La puntuación marca las pausas del TTS y también dónde se corta cada rótulo, así
que vale la pena puntuar generosamente. Los signos finales no se dibujan en
pantalla: los rótulos van limpios, como en TikTok.

## Extraer capítulos del EPUB

```bash
python3 brainrot/extract_epub.py libro.epub --out-dir brainrot/fuente
```

Deja un `.txt` por capítulo para usarlo como punto de partida del guion.

## Sobre el material de fondo y la música

El pipeline no descarga nada: le pasas tú el clip de gameplay y la música.
Para publicar, usa material sobre el que tengas derechos (packs de gameplay
"no copyright", biblioteca de audio de YouTube, Epidemic Sound, Artlist…).
Cuanto mayor sea la resolución del clip de fondo, mejor: el recorte 9:16
aprovecha solo la franja central, así que un fondo 720p llega a la salida
bastante ampliado.
