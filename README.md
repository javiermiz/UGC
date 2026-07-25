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
| Videos del portfolio | `VIDEOS` |
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

## Videos (desde fuente externa, no alojados)

Los videos no se suben a este sitio: se incrustan desde su plataforma con
`fuente` (`youtube`, `vimeo`, `instagram` o `tiktok`) más `videoId`.

1. Añade un objeto en `VIDEOS` dentro de `src/data/portfolio.ts` con `fuente` y
   `videoId` reales. Para YouTube basta el ID del video; para Vimeo el ID
   numérico; para Instagram o TikTok, la URL completa de la publicación.
2. La miniatura de YouTube se genera sola desde el ID. Para las demás fuentes,
   exporta una miniatura vertical **9:16** a `public/thumbnails/` y ponla en
   `thumbnail`.
3. Al hacer clic, YouTube y Vimeo se reproducen en línea; Instagram y TikTok
   abren la publicación original en otra pestaña.

La sección "Trabajos" está **oculta** en `src/pages/index.astro` hasta tener
2-3 videos reales. Las instrucciones para reactivarla están comentadas en ese
mismo archivo.

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
