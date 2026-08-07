/**
 * MINIATURAS DE TIKTOK
 * ------------------------------------------------------------------
 * YouTube y Vimeo generan su miniatura sola desde el ID, pero TikTok no:
 * el tipo `Video` de portfolio.ts pide `thumbnail` a mano para esa fuente.
 * Exportar cada fotograma one por one es trabajo manual que se olvida, así
 * que este script lo hace desde el oEmbed público de TikTok.
 *
 *   pnpm thumbs            descarga las que falten
 *   pnpm thumbs --force    vuelve a descargarlas todas
 *
 * Las imágenes se guardan en public/thumbnails/ y SE COMITEAN: el build no
 * llama a TikTok. Así el sitio no depende de que la CDN de TikTok responda
 * (sus URLs van firmadas y caducan) ni de tener red al desplegar.
 *
 * Instagram queda fuera a propósito: su oEmbed exige un token de app de
 * Meta, así que esas miniaturas siguen siendo manuales.
 */

import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const RAIZ = fileURLToPath(new URL("..", import.meta.url));
const DATOS = path.join(RAIZ, "src/data/portfolio.ts");
const DESTINO = path.join(RAIZ, "public/thumbnails");

const forzar = process.argv.includes("--force");

/**
 * Saca las URLs de TikTok del archivo de contenido. Se apoya en una regla
 * del propio tipo `Video`: instagram y tiktok guardan la URL completa en
 * `videoId`, mientras que youtube y vimeo guardan solo el ID. Por eso basta
 * con buscar los `videoId` que son una URL.
 */
async function urlsDeTikTok() {
  const fuente = await readFile(DATOS, "utf8");
  const urls = [...fuente.matchAll(/videoId:\s*"(https?:\/\/[^"]+)"/g)].map((m) => m[1]);
  return [...new Set(urls.filter((url) => url.includes("tiktok.com")))];
}

/** El ID numérico del final de la URL, que es el nombre del archivo. */
function idDeTikTok(url) {
  const match = url.match(/\/video\/(\d+)/);
  if (!match) throw new Error(`URL de TikTok sin ID reconocible: ${url}`);
  return match[1];
}

async function existe(ruta) {
  try {
    await access(ruta);
    return true;
  } catch {
    return false;
  }
}

async function miniaturaDe(url) {
  const oembed = `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`;
  const respuesta = await fetch(oembed);
  if (!respuesta.ok) {
    throw new Error(`oEmbed respondió ${respuesta.status}`);
  }
  const datos = await respuesta.json();
  if (!datos.thumbnail_url) {
    throw new Error("el oEmbed no trae thumbnail_url");
  }
  return datos.thumbnail_url;
}

async function descargar(url, destino) {
  const respuesta = await fetch(url);
  if (!respuesta.ok) {
    throw new Error(`la miniatura respondió ${respuesta.status}`);
  }
  await writeFile(destino, Buffer.from(await respuesta.arrayBuffer()));
}

const urls = await urlsDeTikTok();

if (urls.length === 0) {
  console.log("No hay videos de TikTok en portfolio.ts. Nada que hacer.");
  process.exit(0);
}

await mkdir(DESTINO, { recursive: true });

let fallos = 0;

for (const url of urls) {
  const id = idDeTikTok(url);
  const nombre = `tiktok-${id}.jpg`;
  const destino = path.join(DESTINO, nombre);

  if (!forzar && (await existe(destino))) {
    console.log(`· ${nombre} ya existe, se salta (--force para rehacerla)`);
    continue;
  }

  try {
    const miniatura = await miniaturaDe(url);
    await descargar(miniatura, destino);
    console.log(`✓ ${nombre}`);
  } catch (error) {
    fallos += 1;
    console.error(`✗ ${nombre}: ${error.message}`);
    console.error(`  ${url}`);
  }
}

if (fallos > 0) {
  console.error(
    `\n${fallos} miniatura(s) sin descargar. Si TikTok bloquea la petición, ` +
      `exporta un fotograma 9:16 a public/thumbnails/ con ese mismo nombre.`,
  );
  process.exit(1);
}

console.log("\nListo. Añade las miniaturas al commit: git add public/thumbnails");
