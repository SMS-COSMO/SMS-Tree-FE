// vite.config.ts
import path from "path";
import { defineConfig } from "file:///C:/Users/24627/Documents/GitHub/COSMO/SMS-Tree/node_modules/.pnpm/vite@4.5.0_sass@1.69.5/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/24627/Documents/GitHub/COSMO/SMS-Tree/node_modules/.pnpm/@vitejs+plugin-vue@4.4.1_vite@4.5.0_vue@3.3.8/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///C:/Users/24627/Documents/GitHub/COSMO/SMS-Tree/node_modules/.pnpm/unplugin-auto-import@0.16.7_@vueuse+core@10.6.0/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///C:/Users/24627/Documents/GitHub/COSMO/SMS-Tree/node_modules/.pnpm/unplugin-vue-components@0.25.2_vue@3.3.8/node_modules/unplugin-vue-components/dist/vite.mjs";
import { ElementPlusResolver } from "file:///C:/Users/24627/Documents/GitHub/COSMO/SMS-Tree/node_modules/.pnpm/unplugin-vue-components@0.25.2_vue@3.3.8/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import UnoCSS from "file:///C:/Users/24627/Documents/GitHub/COSMO/SMS-Tree/node_modules/.pnpm/unocss@0.57.3_postcss@8.4.31_vite@4.5.0/node_modules/unocss/dist/vite.mjs";
var __vite_injected_original_dirname = "C:\\Users\\24627\\Documents\\GitHub\\COSMO\\SMS-Tree";
var pathSrc = path.resolve(__vite_injected_original_dirname, "src");
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "~/": `${pathSrc}/`
    }
  },
  plugins: [
    vue(),
    UnoCSS(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFwyNDYyN1xcXFxEb2N1bWVudHNcXFxcR2l0SHViXFxcXENPU01PXFxcXFNNUy1UcmVlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFwyNDYyN1xcXFxEb2N1bWVudHNcXFxcR2l0SHViXFxcXENPU01PXFxcXFNNUy1UcmVlXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy8yNDYyNy9Eb2N1bWVudHMvR2l0SHViL0NPU01PL1NNUy1UcmVlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XHJcblxyXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJztcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSc7XHJcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnO1xyXG5cclxuaW1wb3J0IFVub0NTUyBmcm9tICd1bm9jc3Mvdml0ZSc7XHJcblxyXG5jb25zdCBwYXRoU3JjID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnfi8nOiBgJHtwYXRoU3JjfS9gLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHZ1ZSgpLFxyXG4gICAgVW5vQ1NTKCksXHJcbiAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXSxcclxuICAgIH0pLFxyXG4gICAgQ29tcG9uZW50cyh7XHJcbiAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXHJcbiAgICB9KSxcclxuICBdLFxyXG59KTtcclxuXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFUsT0FBTyxVQUFVO0FBQzNWLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUVoQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLDJCQUEyQjtBQUVwQyxPQUFPLFlBQVk7QUFSbkIsSUFBTSxtQ0FBbUM7QUFVekMsSUFBTSxVQUFVLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBRzdDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLE1BQU0sR0FBRyxPQUFPO0FBQUEsSUFDbEI7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixPQUFPO0FBQUEsSUFDUCxXQUFXO0FBQUEsTUFDVCxXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFBQSxJQUNuQyxDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDVCxXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFBQSxJQUNuQyxDQUFDO0FBQUEsRUFDSDtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
