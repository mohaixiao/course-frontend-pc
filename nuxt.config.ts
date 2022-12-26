import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

export default defineNuxtConfig({
  modules: ['@unocss/nuxt', '@pinia/nuxt'],
  experimental: {
    reactivityTransform: true,
  },
  vite: {
    plugins: [
      Components({
        resolvers: [AntDesignVueResolver()],
      }),
    ],
  },
  unocss: {
    uno: true,
    attributify: true,
    shortcuts: [{ flexc: 'flex items-center justify-center' }],
    rules: [
      [
        /^fs-(\d+)$/,
        ([, d]) => ({
          'font-size': `${d}px`,
        }),
      ],
    ],
  },
});

