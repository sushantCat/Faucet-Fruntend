// vite.config.ts
import path from "path";
import react from "file:///home/sushant/Documents/testnet_btc/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///home/sushant/Documents/testnet_btc/node_modules/vite/dist/node/index.js";
import Unfonts from "file:///home/sushant/Documents/testnet_btc/node_modules/unplugin-fonts/dist/vite.mjs";
import wasm from "file:///home/sushant/Documents/testnet_btc/node_modules/vite-plugin-wasm/exports/import.mjs";
import { nodePolyfills } from "file:///home/sushant/Documents/testnet_btc/node_modules/vite-plugin-node-polyfills/dist/index.js";
import topLevelAwait from "file:///home/sushant/Documents/testnet_btc/node_modules/vite-plugin-top-level-await/exports/import.mjs";
var __vite_injected_original_dirname = "/home/sushant/Documents/testnet_btc";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    Unfonts({
      custom: {
        families: [
          {
            name: "Geist",
            src: "./src/assets/fonts/geist/*.woff2"
          }
        ]
      }
    }),
    wasm(),
    nodePolyfills(),
    topLevelAwait()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./@")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9zdXNoYW50L0RvY3VtZW50cy90ZXN0bmV0X2J0Y1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvc3VzaGFudC9Eb2N1bWVudHMvdGVzdG5ldF9idGMvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvc3VzaGFudC9Eb2N1bWVudHMvdGVzdG5ldF9idGMvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCBVbmZvbnRzIGZyb20gXCJ1bnBsdWdpbi1mb250cy92aXRlXCI7XG5pbXBvcnQgd2FzbSBmcm9tIFwidml0ZS1wbHVnaW4td2FzbVwiO1xuaW1wb3J0IHsgbm9kZVBvbHlmaWxscyB9IGZyb20gXCJ2aXRlLXBsdWdpbi1ub2RlLXBvbHlmaWxsc1wiO1xuaW1wb3J0IHRvcExldmVsQXdhaXQgZnJvbSBcInZpdGUtcGx1Z2luLXRvcC1sZXZlbC1hd2FpdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBVbmZvbnRzKHtcbiAgICAgIGN1c3RvbToge1xuICAgICAgICBmYW1pbGllczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwiR2Vpc3RcIixcbiAgICAgICAgICAgIHNyYzogXCIuL3NyYy9hc3NldHMvZm9udHMvZ2Vpc3QvKi53b2ZmMlwiLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgIH0pLFxuICAgIHdhc20oKSxcbiAgICBub2RlUG9seWZpbGxzKCksXG4gICAgdG9wTGV2ZWxBd2FpdCgpLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vQFwiKSxcbiAgICB9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTJSLE9BQU8sVUFBVTtBQUM1UyxPQUFPLFdBQVc7QUFDbEIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sVUFBVTtBQUNqQixTQUFTLHFCQUFxQjtBQUM5QixPQUFPLG1CQUFtQjtBQU4xQixJQUFNLG1DQUFtQztBQVF6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixRQUFRO0FBQUEsTUFDTixRQUFRO0FBQUEsUUFDTixVQUFVO0FBQUEsVUFDUjtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sS0FBSztBQUFBLFVBQ1A7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsS0FBSztBQUFBLElBQ0wsY0FBYztBQUFBLElBQ2QsY0FBYztBQUFBLEVBQ2hCO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUEsSUFDcEM7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
