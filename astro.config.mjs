import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  // Dominio real del sitio. De aquí salen el canonical y las URLs de Open
  // Graph: si apunta a otro sitio, Google indexa ese y las miniaturas al
  // compartir se piden a un dominio que no sirve esta web.
  site: "https://ugc.javiermiz.com",
  output: "static",
  build: {
    inlineStylesheets: "auto",
  },
});
