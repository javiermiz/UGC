# Portfolio UGC · Javier Miz

Portfolio de contenido UGC (videos verticales para marcas), construido en Astro
y con el mismo lenguaje visual que [javiermiz.github.io](https://javiermiz.github.io):
serif Spectral, fondo hueso `#faf8f3` con textura de ruido, acento rojo `#dc2626`
y columna de lectura de 860 px.

## Empezar

```bash
pnpm install
pnpm dev      # http://localhost:4321
pnpm build    # genera dist/
pnpm preview  # sirve dist/ localmente
```

## Cómo editar el contenido

Casi todo vive en un solo archivo: **`src/data/portfolio.ts`**.

| Qué cambiar | Dónde |
| --- | --- |
| Nombre, rol, titular, ciudad, texto de "Sobre mí" | `PERFIL` |
| Videos para la marca (los publica ella) | `UGC` |
| Menciones en mi perfil | `MENCIONES` |
| Paquetes y precios | `SERVICIOS` |
| Pasos de "Cómo trabajo" | `PROCESO` |
| Email y redes | `CONTACTO` |

Regla de contenido: no dejar datos inventados ni textos de ejemplo visibles al
público. Si una sección no tiene contenido real todavía, se deja vacía y se
oculta en `src/pages/index.astro`.

## Metodología de layout (tipo Elementor)

La estructura sigue el patrón **Layout, Section, Container, Elements**:

- `Section` (`src/components/layout/Section.astro`): franja horizontal completa.
  Solo maneja el ritmo vertical y el fondo opcional.
- `Container` (`src/components/layout/Container.astro`): limita el ancho y aplica
  el padding lateral.
- Los "elements" son las tarjetas y bloques de contenido dentro del Container.

## Las dos secciones de video

Los trabajos van en dos carruseles separados porque no son lo mismo:

- **`UGC`**: "Videos para la marca". Se los entregas y los publica ella, en su
  cuenta o en pauta, sin tu nombre encima.
- **`MENCIONES`**: "Menciones en mi perfil". Salen en tu cuenta y las ve tu
  audiencia, con tu criterio.

Los títulos nombran el entregable a propósito: "UGC" y "colaboración" los
distingue quien ya está en el sector, pero un cliente que llega frío no. Lo que
de verdad las separa es **quién publica el video y ante qué audiencia sale**.

Cada una es un objeto `SeccionVideos` con `id` (ancla y enlace del menú), `menu`,
`titulo`, `descripcion` y su array `videos`. Salen en la página en el orden de
`SECCIONES_VIDEO`, que también alimenta el menú y la numeración de las secciones
(`01 / …`, `02 / …`): al añadir o quitar una, el resto se renumera solo.

## Formatos de guion (tags)

Aparte del nicho (`categoria`: Gadgets, Wearables, Audio…), cada video puede
llevar uno o varios **formatos**: cómo está armado el guion. Es lo que mira una
marca que ya sabe qué quiere rodar y quiere ver si lo has hecho antes.

```ts
{
  fuente: "youtube",
  videoId: "EGeCuEDAhlA",
  titulo: "Mouse vertical SOLAKAKA E9 Pro",
  categoria: "Gadgets",
  formatos: ["problema-solucion", "demo"],
}
```

Las claves válidas están en `FORMATOS` (`src/data/portfolio.ts`): al ser un
objeto cerrado, una clave mal escrita rompe el build en vez de colarse a
producción. Hoy hay `problema-solucion`, `unboxing`, `demo`, `review`,
`testimonial`, `antes-despues`, `comparativa`, `tutorial`, `lista`, `storytime`,
`a-camara`, `voz-en-off`, `dia-en-la-vida` y `asmr`. Para añadir uno nuevo basta
una línea más en ese objeto.

Se ven como etiquetas en la tarjeta del video, bajo el título, y solo ahí: un
resumen por sección crecería sin techo según se llene el portfolio.

Si un video no tiene `formatos`, no pasa nada: no se pinta ninguna etiqueta.
Mejor dejarlo vacío que ponerle un formato que no es.

## Videos (desde fuente externa, no alojados)

Los videos no se suben a este sitio: se incrustan desde su plataforma con
`fuente` (`youtube`, `vimeo`, `instagram` o `tiktok`) más `videoId`.

1. Añade un objeto al array `videos` de `UGC` o de `MENCIONES` dentro de
   `src/data/portfolio.ts`, con `fuente` y `videoId` reales. Para YouTube basta
   el ID del video; para Vimeo el ID numérico; para Instagram o TikTok, la URL
   completa de la publicación.
2. La miniatura de YouTube se genera sola desde el ID. Para TikTok la baja
   `pnpm thumbs` (ver abajo). Para Vimeo o Instagram, exporta una miniatura
   vertical **9:16** a `public/thumbnails/` y ponla en `thumbnail`.
3. Al hacer clic, YouTube y Vimeo se reproducen en línea; Instagram y TikTok
   abren la publicación original en otra pestaña.

### Miniaturas de TikTok (`pnpm thumbs`)

TikTok no genera la miniatura desde el ID, así que hay que tenerla en local.
En vez de exportar el fotograma a mano, `scripts/thumbnails.mjs` la baja del
oEmbed público de TikTok:

```bash
pnpm thumbs           # descarga las que falten
pnpm thumbs --force   # vuelve a bajarlas todas
```

El script lee las URLs de TikTok directamente de `portfolio.ts` y guarda cada
imagen como `public/thumbnails/tiktok-<id>.jpg`, donde `<id>` es el número
final de la URL del video. Ese es el nombre que hay que poner en `thumbnail`.

**Las miniaturas se comitean.** El build no llama a TikTok a propósito: sus
URLs de CDN van firmadas y caducan, así que depender de ellas en cada deploy
sería romper el sitio a plazo. Después de añadir un video de TikTok:

```bash
pnpm thumbs && git add public/thumbnails
```

Si TikTok bloquea la petición, el script lo dice y falla con código 1: en ese
caso exporta el fotograma 9:16 a mano y guárdalo con ese mismo nombre.

Instagram queda fuera del script porque su oEmbed exige un token de app de
Meta; esas miniaturas siguen siendo manuales.

### Miniatura de los YouTube Shorts

Se pide primero `oardefault.jpg`, que conserva la proporción original del video
(9:16 en un Short) y llena la tarjeta sin recortes. Esa variante no existe para
todos los videos, así que el `<img>` cae a `hqdefault.jpg` (4:3, siempre
disponible) si la primera falla; en ese caso la tarjeta recorta los lados.

Si un fotograma no te convence, lo más limpio es cambiarlo en YouTube (Editar
video → Miniatura). Como alternativa, exporta una imagen 9:16 a
`public/thumbnails/` y ponla en `thumbnail`: ese campo tiene prioridad sobre
las dos automáticas.

## Quitar una sección

Cada sección es un `<Section>` independiente en `src/pages/index.astro`.
Bórrala o coméntala si aún no tienes contenido real para ella.

## Estructura

```
src/
  data/portfolio.ts        contenido del sitio
  components/
    Layout.astro           header, footer y design tokens
    layout/Section.astro   franja de seccion
    layout/Container.astro  contenedor centrado
    VideoCard.astro        tarjeta de video 9:16 (embed externo)
    ServiceCard.astro      tarjeta de servicio
  pages/index.astro        composicion de las secciones
public/
  thumbnails/              miniaturas de los videos
  fonts/                   Spectral (mismas del blog)
```

## Publicar

El sitio vive en **`https://ugc.javiermiz.com`**, y ese dominio está en `site`
dentro de `astro.config.mjs`. De ahí salen el `<link rel="canonical">` y las
URLs de Open Graph: si el dominio cambia, se cambia ahí y en ningún sitio más.
Apuntarlo a otro dominio hace que Google indexe ese otro.

- **Vercel / Netlify**: importa el repo, build `pnpm build`, output `dist`.
  El deploy de producción (rama de producción) es público; los previews de
  ramas pueden quedar protegidos por login según la configuración del proyecto.
