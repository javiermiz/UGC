/**
 * CONTENIDO DEL PORTFOLIO
 * ------------------------------------------------------------------
 * Todo lo que se ve en la web sale de este archivo. Es el único que
 * necesitas tocar para actualizar el portfolio.
 *
 * ⚠️ TODO EL CONTENIDO DE ABAJO ES DE EJEMPLO (placeholder).
 *    Reemplaza los textos, links, marcas y métricas por los reales
 *    antes de compartir el sitio con nadie.
 */

export interface Video {
  /** Título corto del video, se muestra debajo de la miniatura */
  titulo: string;
  /** Marca o cliente para el que se hizo. Usa "Proyecto propio" si es spec work */
  marca: string;
  /** Categoría / nicho: skincare, fitness, tech, food… */
  categoria: string;
  /** Formato del entregable */
  formato: string;
  /** Link público al video (TikTok, Reel, Short…). "#" si aún no hay link */
  url: string;
  /** Ruta a la miniatura vertical 9:16 dentro de /public/thumbnails */
  thumbnail: string;
  /** Una línea sobre el objetivo del video o el resultado */
  descripcion: string;
  /** Métrica destacada opcional: "1.2M vistas", "8% CTR"… */
  metrica?: string;
}

export interface Servicio {
  titulo: string;
  descripcion: string;
  entregables: string[];
  /** Precio de referencia. Pon null para ocultar el precio */
  desde: string | null;
}

export interface Marca {
  nombre: string;
  categoria: string;
}

export interface Testimonio {
  texto: string;
  autor: string;
  cargo: string;
}

export interface PasoProceso {
  titulo: string;
  descripcion: string;
}

export interface Metrica {
  valor: string;
  etiqueta: string;
}

/* ------------------------------------------------------------------ */
/* Perfil                                                              */
/* ------------------------------------------------------------------ */

export const PERFIL = {
  nombre: "Javier Miz",
  rol: "Creador de contenido UGC",
  ubicacion: "Ciudad, País", // PLACEHOLDER
  disponibilidad: "Disponible para colaboraciones",
  titular: "Contenido que parece de un amigo, no de un anuncio.",
  subtitular:
    "Videos verticales para marcas que quieren vender sin sonar a marca: guion, grabación, edición y entrega lista para publicar o pautar.",
  sobre_mi:
    "PLACEHOLDER — Escribe aquí dos o tres frases sobre ti: de dónde vienes, por qué grabas contenido UGC y qué te diferencia. Funciona mejor si mencionas el tipo de marcas con las que te gusta trabajar y el tono que manejas (cercano, directo, con humor, educativo…). Cierra con una frase sobre el resultado que buscas para el cliente.",
};

export const METRICAS: Metrica[] = [
  { valor: "00", etiqueta: "Videos entregados" }, // PLACEHOLDER
  { valor: "00", etiqueta: "Marcas" }, // PLACEHOLDER
  { valor: "0M", etiqueta: "Vistas acumuladas" }, // PLACEHOLDER
  { valor: "48 h", etiqueta: "Tiempo de entrega" }, // PLACEHOLDER
];

/* ------------------------------------------------------------------ */
/* Servicios                                                           */
/* ------------------------------------------------------------------ */

export const SERVICIOS: Servicio[] = [
  {
    titulo: "Video UGC individual",
    descripcion:
      "Un video vertical de 15 a 45 segundos, con guion propio, grabado y editado por mí. Pensado para feed orgánico o para pautar.",
    entregables: [
      "1 video en 9:16 (1080×1920)",
      "Guion y hook aprobados antes de grabar",
      "Subtítulos quemados y música libre de derechos",
      "1 ronda de cambios incluida",
    ],
    desde: "$000", // PLACEHOLDER
  },
  {
    titulo: "Pack de 3 videos",
    descripcion:
      "Tres ángulos distintos del mismo producto para testear qué hook rinde mejor antes de escalar la inversión.",
    entregables: [
      "3 videos en 9:16 con hooks diferentes",
      "Variantes de los primeros 3 segundos",
      "Versiones con y sin subtítulos",
      "Licencia de uso para pauta (whitelisting opcional)",
    ],
    desde: "$000", // PLACEHOLDER
  },
  {
    titulo: "Retainer mensual",
    descripcion:
      "Contenido constante para marcas que publican todas las semanas y necesitan un flujo predecible de material.",
    entregables: [
      "8 videos al mes",
      "Calendario de contenido y propuesta de hooks",
      "Reporte simple de qué funcionó",
      "Prioridad en tiempos de entrega",
    ],
    desde: "$000 / mes", // PLACEHOLDER
  },
];

/* ------------------------------------------------------------------ */
/* Trabajos                                                            */
/* ------------------------------------------------------------------ */
/* Para añadir un video: duplica un bloque, cambia los datos y pon la
   miniatura en /public/thumbnails (formato vertical 9:16, JPG o WEBP). */

export const VIDEOS: Video[] = [
  {
    titulo: "Unboxing con hook de 3 segundos",
    marca: "Nombre de la marca",
    categoria: "Skincare",
    formato: "TikTok orgánico",
    url: "#",
    thumbnail: "/thumbnails/placeholder-01.svg",
    descripcion:
      "PLACEHOLDER — Describe en una línea el objetivo del video y qué resultado tuvo.",
    metrica: "000K vistas",
  },
  {
    titulo: "Testimonial en cámara",
    marca: "Nombre de la marca",
    categoria: "Fitness",
    formato: "Meta Ads",
    url: "#",
    thumbnail: "/thumbnails/placeholder-02.svg",
    descripcion:
      "PLACEHOLDER — Describe en una línea el objetivo del video y qué resultado tuvo.",
    metrica: "0% CTR",
  },
  {
    titulo: "Demostración de producto paso a paso",
    marca: "Nombre de la marca",
    categoria: "Tecnología",
    formato: "Reels",
    url: "#",
    thumbnail: "/thumbnails/placeholder-03.svg",
    descripcion:
      "PLACEHOLDER — Describe en una línea el objetivo del video y qué resultado tuvo.",
  },
  {
    titulo: "Antes y después",
    marca: "Nombre de la marca",
    categoria: "Hogar",
    formato: "TikTok Ads",
    url: "#",
    thumbnail: "/thumbnails/placeholder-04.svg",
    descripcion:
      "PLACEHOLDER — Describe en una línea el objetivo del video y qué resultado tuvo.",
    metrica: "000K vistas",
  },
  {
    titulo: "Respuesta a comentario",
    marca: "Nombre de la marca",
    categoria: "App / SaaS",
    formato: "Reels",
    url: "#",
    thumbnail: "/thumbnails/placeholder-05.svg",
    descripcion:
      "PLACEHOLDER — Describe en una línea el objetivo del video y qué resultado tuvo.",
  },
  {
    titulo: "Rutina diaria con el producto",
    marca: "Nombre de la marca",
    categoria: "Alimentación",
    formato: "TikTok orgánico",
    url: "#",
    thumbnail: "/thumbnails/placeholder-06.svg",
    descripcion:
      "PLACEHOLDER — Describe en una línea el objetivo del video y qué resultado tuvo.",
    metrica: "0% engagement",
  },
];

/* ------------------------------------------------------------------ */
/* Marcas                                                              */
/* ------------------------------------------------------------------ */
/* Solo pon marcas con las que realmente hayas trabajado. */

export const MARCAS: Marca[] = [
  { nombre: "Marca 01", categoria: "Skincare" }, // PLACEHOLDER
  { nombre: "Marca 02", categoria: "Fitness" }, // PLACEHOLDER
  { nombre: "Marca 03", categoria: "Tecnología" }, // PLACEHOLDER
  { nombre: "Marca 04", categoria: "Hogar" }, // PLACEHOLDER
  { nombre: "Marca 05", categoria: "App / SaaS" }, // PLACEHOLDER
  { nombre: "Marca 06", categoria: "Alimentación" }, // PLACEHOLDER
];

/* ------------------------------------------------------------------ */
/* Proceso                                                             */
/* ------------------------------------------------------------------ */

export const PROCESO: PasoProceso[] = [
  {
    titulo: "Briefing",
    descripcion:
      "Me cuentas el producto, el público y qué quieres que pase después de ver el video. Si ya tienes ads corriendo, miro cuáles funcionan.",
  },
  {
    titulo: "Guion y hooks",
    descripcion:
      "Te mando dos o tres opciones de guion con distintos ángulos. Nada se graba hasta que apruebas uno.",
  },
  {
    titulo: "Grabación",
    descripcion:
      "Grabo en vertical con luz natural o de estudio según el producto. Audio limpio, sin cortes raros.",
  },
  {
    titulo: "Entrega",
    descripcion:
      "Recibes los archivos finales más los crudos si los necesitas, listos para publicar o subir al administrador de anuncios.",
  },
];

/* ------------------------------------------------------------------ */
/* Testimonios                                                         */
/* ------------------------------------------------------------------ */
/* Usa solo testimonios reales, con permiso de quien los escribió. */

export const TESTIMONIOS: Testimonio[] = [
  {
    texto:
      "PLACEHOLDER — Pega aquí un testimonio real de un cliente. Los que mejor funcionan mencionan un resultado concreto y cómo fue trabajar contigo.",
    autor: "Nombre del cliente",
    cargo: "Cargo, Marca",
  },
  {
    texto:
      "PLACEHOLDER — Segundo testimonio. Si aún no tienes ninguno, borra esta sección entera de src/pages/index.astro y añádela cuando los tengas.",
    autor: "Nombre del cliente",
    cargo: "Cargo, Marca",
  },
];

/* ------------------------------------------------------------------ */
/* Contacto                                                            */
/* ------------------------------------------------------------------ */

export const CONTACTO = {
  email: "tucorreo@ejemplo.com", // PLACEHOLDER
  instagram: {
    usuario: "@tuusuario", // PLACEHOLDER
    url: "https://instagram.com/tuusuario", // PLACEHOLDER
  },
  tiktok: {
    usuario: "@tuusuario", // PLACEHOLDER
    url: "https://tiktok.com/@tuusuario", // PLACEHOLDER
  },
  /** Deja en null si prefieres no mostrar WhatsApp */
  whatsapp: null as string | null,
  cierre:
    "¿Tienes un producto y no sabes qué contenido necesita? Escríbeme y lo vemos.",
};
