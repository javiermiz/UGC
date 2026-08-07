#!/usr/bin/env bash
#
# Genera las miniaturas verticales del portfolio a partir de los links
# públicos de los videos (TikTok, Reels, Shorts).
#
# Uso:
#   1. Escribe un link por línea en scripts/videos.txt con el formato:
#        slug|url
#      Ejemplo:
#        unboxing-marca|https://www.tiktok.com/@usuario/video/1234567890
#   2. Ejecuta:  ./scripts/generar-miniaturas.sh
#
# Deja cada miniatura en public/thumbnails/<slug>.jpg recortada a 9:16.
#
set -euo pipefail

raiz="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
lista="$raiz/scripts/videos.txt"
destino="$raiz/public/thumbnails"
temporal="$(mktemp -d)"
trap 'rm -rf "$temporal"' EXIT

for binario in yt-dlp ffmpeg; do
  command -v "$binario" >/dev/null || { echo "Falta $binario"; exit 1; }
done

[ -f "$lista" ] || { echo "No existe $lista"; exit 1; }
mkdir -p "$destino"

# Recorta al centro en 9:16 y escala a 720x1280.
recortar() {
  ffmpeg -loglevel error -y -i "$1" \
    -vf "crop='min(iw,ih*9/16)':'min(ih,iw*16/9)',scale=720:1280" \
    -q:v 3 "$2"
}

while IFS='|' read -r slug url; do
  # Salta líneas vacías y comentarios.
  [ -z "${slug// }" ] && continue
  case "$slug" in \#*) continue ;; esac
  slug="${slug// }"

  echo "→ $slug"
  trabajo="$temporal/$slug"
  mkdir -p "$trabajo"

  # Camino rápido: la miniatura oficial que publica la plataforma.
  if yt-dlp --quiet --no-warnings --skip-download \
      --write-thumbnail --convert-thumbnails jpg \
      -o "$trabajo/portada.%(ext)s" "$url" 2>/dev/null \
      && portada="$(find "$trabajo" -name 'portada*.jpg' -print -quit)" \
      && [ -n "$portada" ]; then
    recortar "$portada" "$destino/$slug.jpg"
    echo "  miniatura oficial → public/thumbnails/$slug.jpg"
    continue
  fi

  # Si la plataforma no da miniatura, se baja el video y se saca un frame
  # del segundo 1 (el 0 suele ser negro o un fundido).
  echo "  sin miniatura pública, extrayendo frame del video…"
  yt-dlp --quiet --no-warnings -f 'mp4/best' -o "$trabajo/video.%(ext)s" "$url"
  video="$(find "$trabajo" -name 'video.*' -print -quit)"
  [ -n "$video" ] || { echo "  no se pudo descargar $url"; continue; }
  ffmpeg -loglevel error -y -ss 1 -i "$video" -frames:v 1 "$trabajo/frame.jpg"
  recortar "$trabajo/frame.jpg" "$destino/$slug.jpg"
  echo "  frame → public/thumbnails/$slug.jpg"
done < "$lista"

echo
echo "Listo. Actualiza el campo thumbnail de cada video en src/data/portfolio.ts"
echo "a /thumbnails/<slug>.jpg"
