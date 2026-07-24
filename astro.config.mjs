import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://javiermiz.github.io",
  // Si algún día se publica en GitHub Pages como proyecto (javiermiz.github.io/UGC),
  // descomentar la línea siguiente para que las rutas y assets apunten bien:
  // base: "/UGC",
  output: "static",
  build: {
    inlineStylesheets: "auto",
  },
});
