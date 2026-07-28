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
| Videos UGC (entregables para la marca) | `UGC` |
| Reseñas en mi perfil | `RESENAS` |
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

- **`UGC`**: el formato que entregas a la marca para que lo publique como suyo o
  lo meta en pauta. Cortos y al grano.
- **`RESENAS`**: reseñas en el perfil propio, después de probar el producto, con
  lo bueno y lo malo.

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

Dónde se ven:

- **En la tarjeta**: los formatos de ese video, bajo el título.
- **En el encabezado de la sección**: el resumen "Formatos rodados", sin repetir
  y en el orden de `FORMATOS`. Se calcula solo a partir de los videos.

Si un video no tiene `formatos`, no pasa nada: no se pinta ninguna etiqueta, y
si ningún video de la sección los tiene, el resumen entero desaparece. Mejor
dejarlo vacío que ponerle un formato que no es.

## Videos (desde fuente externa, no alojados)

Los videos no se suben a este sitio: se incrustan desde su plataforma con
`fuente` (`youtube`, `vimeo`, `instagram` o `tiktok`) más `videoId`.

1. Añade un objeto al array `videos` de `UGC` o de `RESENAS` dentro de
   `src/data/portfolio.ts`, con `fuente` y `videoId` reales. Para YouTube basta
   el ID del video; para Vimeo el ID numérico; para Instagram o TikTok, la URL
   completa de la publicación.
2. La miniatura de YouTube se genera sola desde el ID. Para las demás fuentes,
   exporta una miniatura vertical **9:16** a `public/thumbnails/` y ponla en
   `thumbnail`.
3. Al hacer clic, YouTube y Vimeo se reproducen en línea; Instagram y TikTok
   abren la publicación original en otra pestaña.

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

- **Vercel / Netlify**: importa el repo, build `pnpm build`, output `dist`.
  El deploy de producción (rama de producción) es público; los previews de
  ramas pueden quedar protegidos por login según la configuración del proyecto.
- **GitHub Pages como proyecto** (`javiermiz.github.io/UGC`): descomenta
  `base: "/UGC"` en `astro.config.mjs` y añade un workflow con `withastro/action`.
