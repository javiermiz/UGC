/**
 * CONTENIDO DEL PORTFOLIO
 * ------------------------------------------------------------------
 * Todo lo que se ve en la web sale de este archivo. Es el único que
 * necesitas tocar para actualizar el portfolio.
 *
 * Regla: nada de datos inventados ni textos de ejemplo visibles al
 * público. Si una sección no tiene contenido real todavía, se deja
 * vacía y se oculta en src/pages/index.astro.
 */

/**
 * De dónde sale el video. Los videos NO se alojan en este sitio: se
 * incrustan desde la plataforma original.
 *   - "youtube" / "vimeo": se reproducen en línea al hacer clic (embed).
 *   - "instagram" / "tiktok": abren la publicación en una pestaña nueva
 *     (sus embeds requieren scripts externos poco fiables).
 */
export type VideoFuente = "youtube" | "vimeo" | "instagram" | "tiktok";

export interface Video {
  /** Título corto del video, se muestra debajo de la miniatura */
  titulo: string;
  /** Marca o cliente para el que se hizo. Usa "Proyecto propio" si es spec work */
  marca: string;
  /** Categoría / nicho: skincare, fitness, tech, food */
  categoria: string;
  /** Formato del entregable */
  formato: string;
  /** Plataforma de origen del video */
  fuente: VideoFuente;
  /**
   * Identificador del video en la plataforma:
   *   - youtube: el ID del video (lo que va después de `v=` o `youtu.be/`)
   *   - vimeo:   el ID numérico
   *   - instagram / tiktok: la URL completa de la publicación
   */
  videoId: string;
  /** Una línea sobre el objetivo que buscaba la marca con el video */
  descripcion: string;
  /**
   * Miniatura vertical 9:16 en /public/thumbnails. Opcional para YouTube
   * (se genera sola desde el ID); obligatoria para instagram / tiktok.
   */
  thumbnail?: string;
}

export interface Servicio {
  titulo: string;
  descripcion: string;
  entregables: string[];
  /** Etiqueta de precio que se muestra en la tarjeta */
  precio: string;
}

export interface PasoProceso {
  titulo: string;
  descripcion: string;
}

/* ------------------------------------------------------------------ */
/* Perfil                                                              */
/* ------------------------------------------------------------------ */

export const PERFIL = {
  nombre: "Javier Miz",
  rol: "Creador de contenido UGC",
  /** Solo la ciudad, sin país. Déjalo en "" para ocultar la línea. */
  ubicacion: "",
  disponibilidad: "Disponible para colaboraciones",
  titular: "Contenido que parece de un amigo, no de un anuncio.",
  subtitular:
    "Videos verticales para marcas que quieren vender sin sonar a marca: guion, grabación, edición y entrega lista para publicar o pautar.",
  /** Cada string es un párrafo. */
  sobre_mi: [
    "Vengo del desarrollo de software. Eso significa que entiendo un producto rápido y lo explico sin tecnicismos, justo lo que necesita un video para no sentirse forzado. Estoy empezando en UGC, pero llevo tiempo grabando y editando contenido por mi cuenta, así que no vas a lidiar con la curva de aprendizaje de alguien que nunca ha estado frente a cámara. Me interesa sobre todo tecnología y gadgets, y me enfoco en que el video se sienta como la recomendación real de alguien que sabe usar el producto, no como un comercial genérico.",
    "Si tu producto es una app o una herramienta, mi background técnico te ahorra tener que explicarme cómo funciona antes de grabar.",
  ],
};

/* ------------------------------------------------------------------ */
/* Servicios                                                           */
/* ------------------------------------------------------------------ */

export const SERVICIOS: Servicio[] = [
  {
    titulo: "Video UGC individual",
    descripcion:
      "Un video vertical de 15 a 45 segundos, con guion propio, grabado y editado por mí. Pensado para feed orgánico o para pautar.",
    entregables: [
      "1 video en 9:16 (1080x1920)",
      "Guion y hook aprobados antes de grabar",
      "Subtítulos quemados y música libre de derechos",
      "1 ronda de cambios incluida",
    ],
    precio: "Cotización personalizada",
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
    precio: "Cotización personalizada",
  },
];

/* ------------------------------------------------------------------ */
/* Trabajos                                                            */
/* ------------------------------------------------------------------ */
/* Vacío por ahora: la sección de Trabajos está oculta en
   src/pages/index.astro hasta tener 2-3 videos reales. Cuando los
   tengas, añade objetos Video reales aquí (link real al video,
   descripción enfocada en el objetivo de la marca, sin métricas
   inventadas) y reactiva la sección siguiendo las instrucciones del
   comentario en index.astro. */

export const VIDEOS: Video[] = [];

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
/* Contacto                                                            */
/* ------------------------------------------------------------------ */

export const CONTACTO = {
  email: "javiermizarevalo@gmail.com",
  instagram: {
    usuario: "javiermiz_",
    url: "https://instagram.com/javiermiz_",
  },
  tiktok: {
    usuario: "javiermiz_",
    url: "https://tiktok.com/@javiermiz_",
  },
  /** Deja en null si prefieres no mostrar WhatsApp */
  whatsapp: null as string | null,
  cierre:
    "¿Tienes un producto y no sabes qué contenido necesita? Escríbeme y lo vemos.",
};
