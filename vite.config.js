import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        '404': resolve(__dirname, '404.html'),
        'luxury-farm-stay': resolve(__dirname, 'properties/luxury-farm-stay/index.html'),
        'camp-cottages': resolve(__dirname, 'properties/camp-cottages/index.html'),
        'mountain-homestay': resolve(__dirname, 'properties/mountain-homestay/index.html'),
        'forest-cottages': resolve(__dirname, 'properties/forest-cottages/index.html'),
        'luxury-tree-house': resolve(__dirname, 'properties/luxury-tree-house/index.html'),
        'frontier-camp': resolve(__dirname, 'properties/frontier-camp/index.html'),
        'mountain-huts': resolve(__dirname, 'properties/mountain-huts/index.html'),
        'camp-huts': resolve(__dirname, 'properties/camp-huts/index.html'),
      }
    }
  }
});
