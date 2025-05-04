import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://connoradams.co.uk",
  integrations: [
    react(),
    tailwind(),
    icon({
      include: {
        mdi: ["*"], // Include all Material Design Icons
        "simple-icons": ["*"], // Include all Simple Icons
      },
    }),
  ],
  vite: {
    ssr: {
      external: ["svgo"],
    },
  },
});
