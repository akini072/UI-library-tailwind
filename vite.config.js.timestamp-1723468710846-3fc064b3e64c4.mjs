// vite.config.js
import { defineConfig } from "file:///D:/Development/Sergey/Yassine/fnsh_base/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/Development/Sergey/Yassine/fnsh_base/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { resolve } from "path";
import svgLoader from "file:///D:/Development/Sergey/Yassine/fnsh_base/node_modules/vite-svg-loader/index.js";
import cssInjectedByJsPlugin from "file:///D:/Development/Sergey/Yassine/fnsh_base/node_modules/vite-plugin-css-injected-by-js/dist/esm/index.js";
import tailwind from "file:///D:/Development/Sergey/Yassine/fnsh_base/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///D:/Development/Sergey/Yassine/fnsh_base/node_modules/autoprefixer/lib/autoprefixer.js";
var __vite_injected_original_dirname = "D:\\Development\\Sergey\\Yassine\\fnsh_base";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    svgLoader({
      svgoConfig: {
        plugins: ["removeDimensions"]
      }
    }),
    cssInjectedByJsPlugin()
  ],
  build: {
    lib: {
      // src/index.js is where the components are exported
      entry: resolve(__vite_injected_original_dirname, "src/index.js"),
      name: "FunnelishComponentLib",
      // the name of the output files when the build is run (should match package.json main/module/exports)
      fileName: "ui-lib",
      formats: ["es"]
    },
    // vite uses rollup to compile the code
    rollupOptions: {
      // externalize deps that shouldn't be in the library
      external: ["vue"],
      output: {
        // provide global variables to use in the build
        globals: {
          vue: "Vue"
        },
        inlineDynamicImports: false,
        manualChunks: (id) => {
          if (id.includes("moment-timezone"))
            return "moment-timezone";
          if (id.includes("moment"))
            return "moment";
          if (id.includes("date-fns"))
            return "date-fns";
        }
      }
    }
  },
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()]
    }
  },
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "./src")
    },
    extensions: [".vue", ".js"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxEZXZlbG9wbWVudFxcXFxTZXJnZXlcXFxcWWFzc2luZVxcXFxmbnNoX2Jhc2VcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXERldmVsb3BtZW50XFxcXFNlcmdleVxcXFxZYXNzaW5lXFxcXGZuc2hfYmFzZVxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovRGV2ZWxvcG1lbnQvU2VyZ2V5L1lhc3NpbmUvZm5zaF9iYXNlL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XHJcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgc3ZnTG9hZGVyIGZyb20gJ3ZpdGUtc3ZnLWxvYWRlcic7XHJcbmltcG9ydCBjc3NJbmplY3RlZEJ5SnNQbHVnaW4gZnJvbSBcInZpdGUtcGx1Z2luLWNzcy1pbmplY3RlZC1ieS1qc1wiO1xyXG5pbXBvcnQgdGFpbHdpbmQgZnJvbSBcInRhaWx3aW5kY3NzXCJcclxuaW1wb3J0IGF1dG9wcmVmaXhlciBmcm9tIFwiYXV0b3ByZWZpeGVyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIHZ1ZSgpLFxyXG4gICAgc3ZnTG9hZGVyKHtcclxuICAgICAgc3Znb0NvbmZpZzoge1xyXG4gICAgICAgIHBsdWdpbnM6IFsncmVtb3ZlRGltZW5zaW9ucyddLFxyXG4gICAgICB9LFxyXG4gICAgfSksXHJcbiAgICBjc3NJbmplY3RlZEJ5SnNQbHVnaW4oKSxcclxuICBdLFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBsaWI6IHtcclxuICAgICAgLy8gc3JjL2luZGV4LmpzIGlzIHdoZXJlIHRoZSBjb21wb25lbnRzIGFyZSBleHBvcnRlZFxyXG4gICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvaW5kZXguanMnKSxcclxuICAgICAgbmFtZTogJ0Z1bm5lbGlzaENvbXBvbmVudExpYicsXHJcbiAgICAgIC8vIHRoZSBuYW1lIG9mIHRoZSBvdXRwdXQgZmlsZXMgd2hlbiB0aGUgYnVpbGQgaXMgcnVuIChzaG91bGQgbWF0Y2ggcGFja2FnZS5qc29uIG1haW4vbW9kdWxlL2V4cG9ydHMpXHJcbiAgICAgIGZpbGVOYW1lOiAndWktbGliJyxcclxuICAgICAgZm9ybWF0czogWydlcyddXHJcbiAgICB9LFxyXG4gICAgLy8gdml0ZSB1c2VzIHJvbGx1cCB0byBjb21waWxlIHRoZSBjb2RlXHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIC8vIGV4dGVybmFsaXplIGRlcHMgdGhhdCBzaG91bGRuJ3QgYmUgaW4gdGhlIGxpYnJhcnlcclxuICAgICAgZXh0ZXJuYWw6IFsndnVlJ10sXHJcbiAgICAgIG91dHB1dDoge1xyXG4gICAgICAgIC8vIHByb3ZpZGUgZ2xvYmFsIHZhcmlhYmxlcyB0byB1c2UgaW4gdGhlIGJ1aWxkXHJcbiAgICAgICAgZ2xvYmFsczoge1xyXG4gICAgICAgICAgdnVlOiAnVnVlJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGlubGluZUR5bmFtaWNJbXBvcnRzOiBmYWxzZSxcclxuICAgICAgICBtYW51YWxDaHVua3M6IChpZCkgPT4ge1xyXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdtb21lbnQtdGltZXpvbmUnKSkgcmV0dXJuICdtb21lbnQtdGltZXpvbmUnXHJcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ21vbWVudCcpKSByZXR1cm4gJ21vbWVudCdcclxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnZGF0ZS1mbnMnKSkgcmV0dXJuICdkYXRlLWZucydcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGNzczoge1xyXG4gICAgcG9zdGNzczoge1xyXG4gICAgICBwbHVnaW5zOiBbdGFpbHdpbmQoKSwgYXV0b3ByZWZpeGVyKCldLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAJzogcmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxyXG4gICAgfSxcclxuICAgIGV4dGVuc2lvbnM6IFsnLnZ1ZScsICcuanMnXSxcclxuICB9LFxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWlULFNBQVMsb0JBQW9CO0FBQzlVLE9BQU8sU0FBUztBQUNoQixTQUFTLGVBQWU7QUFDeEIsT0FBTyxlQUFlO0FBQ3RCLE9BQU8sMkJBQTJCO0FBQ2xDLE9BQU8sY0FBYztBQUNyQixPQUFPLGtCQUFrQjtBQU56QixJQUFNLG1DQUFtQztBQVF6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixVQUFVO0FBQUEsTUFDUixZQUFZO0FBQUEsUUFDVixTQUFTLENBQUMsa0JBQWtCO0FBQUEsTUFDOUI7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELHNCQUFzQjtBQUFBLEVBQ3hCO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUE7QUFBQSxNQUVILE9BQU8sUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDeEMsTUFBTTtBQUFBO0FBQUEsTUFFTixVQUFVO0FBQUEsTUFDVixTQUFTLENBQUMsSUFBSTtBQUFBLElBQ2hCO0FBQUE7QUFBQSxJQUVBLGVBQWU7QUFBQTtBQUFBLE1BRWIsVUFBVSxDQUFDLEtBQUs7QUFBQSxNQUNoQixRQUFRO0FBQUE7QUFBQSxRQUVOLFNBQVM7QUFBQSxVQUNQLEtBQUs7QUFBQSxRQUNQO0FBQUEsUUFDQSxzQkFBc0I7QUFBQSxRQUN0QixjQUFjLENBQUMsT0FBTztBQUNwQixjQUFJLEdBQUcsU0FBUyxpQkFBaUI7QUFBRyxtQkFBTztBQUMzQyxjQUFJLEdBQUcsU0FBUyxRQUFRO0FBQUcsbUJBQU87QUFDbEMsY0FBSSxHQUFHLFNBQVMsVUFBVTtBQUFHLG1CQUFPO0FBQUEsUUFDdEM7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILFNBQVM7QUFBQSxNQUNQLFNBQVMsQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ2pDO0FBQUEsSUFDQSxZQUFZLENBQUMsUUFBUSxLQUFLO0FBQUEsRUFDNUI7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
