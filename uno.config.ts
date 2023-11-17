import { defineConfig } from 'unocss';
import presetUno from '@unocss/preset-uno';

export default defineConfig({
  presets: [
    presetUno(),
  ],
  theme: {
    breakpoints: {
      mobile: '320px',
      desktop: '700px',
    },
  },
});

