# Portfolio UGC — Javier Miz

Portfolio de contenido UGC (videos verticales para marcas), construido en Astro
y con el mismo lenguaje visual que [javiermiz.github.io](https://javiermiz.github.io):
serif Spectral, fondo hueso `#faf8f3` con textura de ruido, acento rojo `#dc2626`
y columna de lectura de 860 px.

> ⚠️ **El contenido actual es de ejemplo.** Marcas, métricas, precios y
> testimonios son placeholders. Reemplázalos antes de compartir el sitio.

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
| Nombre, rol, titular, texto de "Sobre mí" | `PERFIL` |
| Números del hero (videos, marcas, vistas) | `METRICAS` |
| Videos del portfolio | `VIDEOS` |
| Marcas con las que has trabajado | `MARCAS` |
| Paquetes y precios | `SERVICIOS` |
| Pasos de "Cómo trabajo" | `PROCESO` |
| Testimonios de clientes | `TESTIMONIOS` |
| Email y redes | `CONTACTO` |

### Añadir un video

1. Exporta una miniatura vertical **9:16** (1080×1920, JPG o WEBP) y guárdala en
   `public/thumbnails/`.
2. Duplica un bloque dentro de `VIDEOS` en `src/data/portfolio.ts` y ajusta
   título, marca, categoría, formato, `url` (link público al TikTok/Reel) y
   `thumbnail`.
3. El campo `metrica` es opcional: si lo pones, aparece como etiqueta sobre la
   miniatura. Si no hay link todavía, deja `url: "#"` y la tarjeta se muestra sin
   enlace.

### Quitar una sección

Cada sección es un `<section>` independiente en `src/pages/index.astro`. Por
ejemplo, si aún no tienes testimonios, borra el bloque `<!-- Testimonios -->`
entero.

## Estructura

```
src/
  data/portfolio.ts        ← todo el contenido
  components/
    Layout.astro           ← header, footer y design tokens
    VideoCard.astro        ← tarjeta de video 9:16
    ServiceCard.astro      ← tarjeta de servicio
  pages/index.astro        ← composición de las secciones
public/
  thumbnails/              ← miniaturas de los videos
  fonts/                   ← Spectral (mismas del blog)
```

## Publicar

El repo no incluye workflow de despliegue. Dos opciones cuando quieras publicar:

- **GitHub Pages como proyecto** (`javiermiz.github.io/UGC`): descomenta
  `base: "/UGC"` en `astro.config.mjs` y añade un workflow con
  `withastro/action`.
- **Vercel / Netlify**: importa el repo, build `pnpm build`, output `dist`.
  No hace falta tocar `base`.
 
