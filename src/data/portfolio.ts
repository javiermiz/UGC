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
  /**
   * Plataforma de origen del video. Si falta (junto con videoId), la
   * tarjeta se muestra como un slot "Próximamente" para ir llenando.
   */
  fuente?: VideoFuente;
  /**
   * Identificador del video en la plataforma:
   *   - youtube: el ID del video (lo que va después de `v=` o `youtu.be/`)
   *   - vimeo:   el ID numérico
   *   - instagram / tiktok: la URL completa de la publicación
   */
  videoId?: string;
  /** Título corto del video, se muestra debajo de la miniatura */
  titulo?: string;
  /** Marca o cliente para el que se hizo. Usa "Proyecto propio" si es spec work */
  marca?: string;
  /** Categoría / nicho: tecnología, gadgets, app, producto */
  categoria?: string;
  /** Formato del entregable (ej: YouTube Short, Reel) */
  formato?: string;
  /** Una línea sobre el objetivo que buscaba la marca con el video */
  descripcion?: string;
  /**
   * Miniatura vertical 9:16 en /public/thumbnails. Opcional para YouTube
   * (se genera sola desde el ID); obligatoria para instagram / tiktok.
   */
  thumbnail?: string;
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
  /* "Colaboraciones" suena a intercambio por producto; esto es trabajo. */
  disponibilidad: "Disponible para nuevos proyectos",
  /* Dice qué hace y para quién. Sin metáforas: el titular no es el sitio
     para lucirse, es donde el visitante decide si esto le sirve. */
  titular: "Videos UGC para marcas de tecnología.",
  subtitular:
    "Escribo, grabo y edito videos verticales para Reels, TikTok y Shorts. Listos para publicar o pautar.",
  /** Título de la sección "Sobre mí". */
  sobre_titulo: "Del código a la cámara",
  /**
   * Cada string es un párrafo. El primero se muestra grande (es el que
   * engancha), el resto en cuerpo de lectura. Párrafos cortos: un bloque
   * largo se ve como un muro y nadie lo lee.
   */
  sobre_mi: [
    "Entiendo un producto técnico rápido y lo cuento sin tecnicismos. Ahí está la diferencia entre un video que suena a persona y uno que suena a guion leído.",
    "Escribo, grabo y edito yo. Trabajas conmigo directamente, sin intermediarios.",
  ],
  /**
   * Ficha rápida al lado del texto: lo esencial para quien no va a leer los
   * párrafos. Solo datos reales; deja el array vacío para ocultarla.
   * "Base" e "Idioma" importan más de lo que parece: el UGC se contrata en
   * remoto y la marca necesita saber a quién le manda el producto.
   */
  sobre_datos: [
    { clave: "Perfil", valor: "Desarrollo de software" },
    { clave: "Nicho", valor: "Tecnología y gadgets" },
    { clave: "Base", valor: "México" },
    { clave: "Idioma", valor: "Español" },
  ],
  /** Etiqueta y texto del recuadro destacado. Deja `nota` en "" para ocultarlo. */
  sobre_nota_etiqueta: "Si vendes software",
  sobre_nota:
    "No hace falta que me expliques cómo funciona tu app: la instalo, la uso y te digo qué merece la pena enseñar en cámara.",
};

/* ------------------------------------------------------------------ */
/* Qué recibe el cliente                                               */
/* ------------------------------------------------------------------ */
/* Responde a la duda que trae quien llega: qué compro exactamente.
   Sin precios y sin cerrar duraciones: cada producto pide lo suyo y no
   tiene sentido atarse a un número en la web. Lo único cerrado es el
   plazo, porque un plazo concreto tranquiliza y se puede cumplir. */

export const INCLUYE: string[] = [
  "Video vertical 9:16 para Reels, TikTok o Shorts, con la duración que pida el producto: desde 15 segundos hasta más de un minuto.",
  "Guion y hook acordados antes de grabar. Nada se graba sin tu visto bueno.",
  "Subtítulos y música libre de derechos.",
  "Una ronda de cambios sobre el video montado.",
  "Entrega en 5 a 7 días hábiles desde que apruebas el guion.",
  "Archivos finales y los crudos si los quieres.",
  "Derechos para pauta pagada: se acuerdan aparte, según dónde y cuánto tiempo se use.",
];

/* ------------------------------------------------------------------ */
/* Trabajos                                                            */
/* ------------------------------------------------------------------ */
/* El carrusel se va llenando aquí. Cada objeto es una tarjeta:
     - Con `fuente` + `videoId` = video real (su reproductor sale de la
       plataforma; nada se aloja en este sitio).
     - Sin ellos = slot "Próximamente" (marca de posición para ir llenando).

   Ejemplo de video real de YouTube (descomenta y pon tu ID):
     { fuente: "youtube", videoId: "TU_ID", titulo: "...", categoria: "Tecnología",
       formato: "YouTube Short", marca: "Nombre real", descripcion: "Qué buscaba la marca" }

   Estos cuatro están en YouTube: la miniatura sale sola del ID y el video se
   reproduce dentro de la web, así que no hay ningún archivo que mantener.
   Solo pon `thumbnail` si quieres forzar una portada distinta a la del
   fotograma que eligió YouTube. */

export const VIDEOS: Video[] = [
  {
    fuente: "youtube",
    videoId: "xD-dg67e0Pg",
    titulo: "Mouse vertical",
    categoria: "Gadgets",
    formato: "YouTube Short",
  },
  {
    fuente: "youtube",
    videoId: "r615VCi1nGs",
    titulo: "Robot aspiradora Xiaomi",
    categoria: "Tecnología",
    formato: "YouTube Short",
  },
  {
    fuente: "youtube",
    videoId: "e-_0wLopvLs",
    titulo: "Mic MAONO",
    categoria: "Audio",
    formato: "YouTube Short",
  },
  {
    fuente: "youtube",
    videoId: "bZrPE0tMHVs",
    titulo: "Xiaomi Smart Band 10",
    categoria: "Wearables",
    formato: "YouTube Short",
  },
];

/* ------------------------------------------------------------------ */
/* Proceso                                                             */
/* ------------------------------------------------------------------ */

export const PROCESO: PasoProceso[] = [
  {
    titulo: "Briefing",
    descripcion:
      "Me cuentas el producto, a quién le hablas y qué quieres que pase después del video. Si ya tienes anuncios corriendo, miro cuáles funcionan.",
  },
  {
    titulo: "Guion y hooks",
    descripcion:
      "Te mando dos o tres guiones con ángulos distintos. Nada se graba hasta que apruebas uno.",
  },
  {
    titulo: "Grabación",
    descripcion:
      "Grabo en vertical con luz natural o de estudio, según el producto. Audio limpio y encuadre estable.",
  },
  {
    titulo: "Entrega",
    descripcion:
      "Recibes los archivos finales y los crudos si los quieres, listos para publicar o subir al gestor de anuncios.",
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
    "¿Tienes un producto y no sabes qué video necesita? Escríbeme y te digo qué grabaría.",
  /* Lo que un formulario preguntaría, dicho en una línea: llegan correos
     que se pueden contestar sin tres idas y venidas. */
  instrucciones: "Cuéntame qué producto es, qué necesitas y para cuándo.",
};
