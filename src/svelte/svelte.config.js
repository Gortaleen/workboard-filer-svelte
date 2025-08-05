import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

const config = {
  kit: {
    vite: {
      optimizeDeps: {
        include: ["fuzzy"],
      },
    },
  },
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: vitePreprocess(),
};

export default config;
