import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import svgLoader from 'vite-svg-loader';
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import tailwind from "tailwindcss"
import autoprefixer from "autoprefixer"
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig({
  plugins: [
    vue(),
    svgLoader({
      svgoConfig: {
        plugins: ['removeDimensions'],
      },
    }),
    cssInjectedByJsPlugin(),
  ],
  build: {
    lib: {
      // src/index.js is where the components are exported
      entry: resolve(__dirname, 'src/index.js'),
      name: 'FunnelishComponentLib',
      // the name of the output files when the build is run (should match package.json main/module/exports)
      fileName: 'ui-lib',
    },
    // vite uses rollup to compile the code
    rollupOptions: {
      // externalize deps that shouldn't be in the library
      external: ['vue'],
      output: {
        // provide global variables to use in the build
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    extensions: ['.vue', '.js'],
  },
})
