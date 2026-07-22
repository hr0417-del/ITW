import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Ensures relative asset paths so the site works on any subpath (e.g., GitHub Pages)
});
