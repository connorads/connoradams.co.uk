export default {
  buildOptions: {
    site: "https://connoradams.co.uk",
    sitemap: true,
  },
  devOptions: {
    tailwindConfig: "./tailwind.config.js",
  },
  renderers: ["@astrojs/renderer-react"],
  vite: {
    ssr: {
      external: ["svgo"],
    },
  },
};
