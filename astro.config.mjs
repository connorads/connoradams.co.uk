import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://connoradams.co.uk",
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
    imageService: "cloudflare",
  }),
  integrations: [react(), icon()],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: ["svgo"],
    },
  },
});
