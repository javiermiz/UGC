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

/**
 * FORMATOS DE GUION
 * ------------------------------------------------------------------
 * Cómo está armado el video, que es distinto del nicho (`categoria`) y de
 * dónde se publica. Una marca que ya sabe qué quiere rodar busca justo esto:
 * si nunca has hecho un antes/después, no te lo va a encargar.
 *
 * La clave es la que se escribe en los datos; el valor es lo que se lee en
 * la tarjeta. Al ser un objeto cerrado, una clave mal escrita rompe el build
 * en vez de colarse a producción.
 *
 * Para añadir un formato nuevo: una línea aquí y ya se puede usar.
 */
export const FORMATOS = {
  "problema-solucion": "Problema / solución",
  unboxing: "Unboxing",
  demo: "Demo de producto",
  review: "Reseña",
  testimonial: "Testimonial",
  "antes-despues": "Antes y después",
  comparativa: "Comparativa",
  tutorial: "Tutorial",
  lista: "Lista / top",
  storytime: "Storytime",
  "a-camara": "Hablando a cámara",
  "voz-en-off": "Voz en off",
  "dia-en-la-vida": "Día en la vida",
  asmr: "ASMR",
} as const;

export type FormatoGuion = keyof typeof FORMATOS;

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
  /**
   * Cómo está armado el video. Claves de `FORMATOS`; un video puede tener
   * más de una (un unboxing que además compara, por ejemplo). Se muestran
   * como etiquetas en la tarjeta y se resumen en el encabezado de la
   * sección, así que déjalo vacío antes que poner uno que no es.
   */
  formatos?: FormatoGuion[];
  /** Una línea sobre el objetivo que buscaba la marca con el video */
  descripcion?: string;
  /**
   * Miniatura vertical 9:16 en /public/thumbnails. Opcional para YouTube
   * (se genera sola desde el ID); obligatoria para instagram / tiktok.
   */
  thumbnail?: string;
}

/**
 * Un carrusel de videos con su encabezado. Hay dos tipos de trabajo y no se
 * mezclan: el UGC es material que la marca publica como suyo, la reseña va
 * firmada en mi perfil. Quien contrata busca una cosa o la otra, así que van
 * en secciones separadas y cada una dice qué es, incluido si está pagada.
 */
export interface SeccionVideos {
  /** Ancla de la sección y del enlace del menú */
  id: string;
  /** Texto corto del menú de navegación */
  menu: string;
  /** Título de la sección */
  titulo: string;
  /** Una o dos frases explicando en qué se diferencia de la otra sección */
  descripcion: string;
  videos: Video[];
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
/* Cada carrusel se va llenando aquí. Cada objeto de `videos` es una tarjeta:
     - Con `fuente` + `videoId` = video real (su reproductor sale de la
       plataforma; nada se aloja en este sitio).
     - Sin ellos = slot "Próximamente" (marca de posición para ir llenando).

   Ejemplo de video real de YouTube (descomenta y pon tu ID):
     { fuente: "youtube", videoId: "TU_ID", titulo: "...", categoria: "Tecnología",
       formatos: ["problema-solucion"], marca: "Nombre real" }

   Todos están en YouTube: la miniatura sale sola del ID y el video se
   reproduce dentro de la web, así que no hay ningún archivo que mantener.
   Solo pon `thumbnail` si quieres forzar una portada distinta a la del
   fotograma que eligió YouTube.

   Un mismo producto puede salir en las dos secciones: el corte UGC y la
   reseña larga son videos distintos con IDs distintos. */

/* Va primero porque es lo que se contrata: material que la marca publica
   como suyo. */
export const UGC: SeccionVideos = {
  id: "ugc",
  menu: "UGC",
  titulo: "Videos UGC",
  descripcion:
    "Cortos y al grano, del tipo que la marca publica como suyo o mete en pauta. Hook, producto y motivo para comprarlo.",
  videos: [
    {
      fuente: "youtube",
      videoId: "EGeCuEDAhlA",
      titulo: "Mouse vertical SOLAKAKA E9 Pro",
      categoria: "Gadgets",
    },
    {
      fuente: "youtube",
      videoId: "YCSrZDNaIvU",
      titulo: "Xiaomi Smart Band 10",
      categoria: "Wearables",
    },
  ],
};

/* Estos van en mi perfil y llevan mi criterio: no son entregables, son
   reseñas. Se muestran porque enseñan cómo hablo de un producto en cámara.

   Ninguna está pagada: son el ejemplo de cómo sería la colaboración. Por eso
   el título dice dónde viven y la descripción dice "como en una colaboración
   pagada", sin afirmar que ya la hubo. */
export const RESENAS: SeccionVideos = {
  id: "resenas",
  menu: "Reseñas",
  titulo: "Reseñas en mi perfil",
  descripcion:
    "Contadas como en una colaboración pagada, después de usar el producto de verdad: lo bueno y también lo que no convence.",
  videos: [
    {
      fuente: "youtube",
      videoId: "xD-dg67e0Pg",
      titulo: "Mouse vertical",
      categoria: "Gadgets",
    },
    {
      fuente: "youtube",
      videoId: "BvcDmpTDxc8",
      titulo: "Robot aspiradora Xiaomi",
      categoria: "Tecnología",
    },
    {
      fuente: "youtube",
      videoId: "e-_0wLopvLs",
      titulo: "Mic MAONO",
      categoria: "Audio",
    },
    {
      fuente: "youtube",
      videoId: "bZrPE0tMHVs",
      titulo: "Xiaomi Smart Band 10",
      categoria: "Wearables",
    },
    {
      fuente: "youtube",
      videoId: "JP8NGN0pj1I",
      titulo: "Logitech G502 Lightspeed",
      categoria: "Gadgets",
    },
    /* El único de software del portfolio. Va etiquetado como tal a
       propósito: es la prueba de lo que promete el recuadro "Si vendes
       software" de la sección Sobre mí. */
    {
      fuente: "youtube",
      videoId: "gm6-T64sp_k",
      titulo: "Samsung DeX",
      categoria: "Software",
    },
  ],
};

/** Las dos secciones de video, en el orden en que salen en la página. */
export const SECCIONES_VIDEO: SeccionVideos[] = [UGC, RESENAS];

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
