import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import svgLoader from 'vite-svg-loader';
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import tailwind from "tailwindcss"
import autoprefixer from "autoprefixer";

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
      formats: ['es']
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
        inlineDynamicImports: false,
        manualChunks: (id) => {
          if (id.includes('moment-timezone')) return 'moment-timezone'
          if (id.includes('moment')) return 'moment'
          if (id.includes('date-fns')) return 'date-fns'
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
      '@': resolve(__dirname, './src'),
    },
    extensions: ['.vue', '.js'],
  },
})
