import vsharp from 'vite-plugin-vsharp';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  nitro: {
    prerender: {
      routes: ['/landing'],
    },
  },
  vite: {
    plugins: [vsharp()],
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
  ],
});
