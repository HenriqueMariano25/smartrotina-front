// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primeuix/themes/aura'
import {definePreset} from "@primeuix/styled";

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#e8f2f2',
      100: '#b9d8d9',
      200: '#8bbebf',
      300: '#5ca4a5',
      400: '#2d8a8c',
      500: '#167d7f',
      600: '#147172',
      700: '#126466',
      800: '#0f5859',
      900: '#0b3f40',
      950: '#093233'
    },
    tooltip: {
      background: 'rgba(0,0,0,0.8)',
      color: '#fff',
      padding: '4px',
      borderRadius: '4px',
      gutter: '4px',

    }
  },

});

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@primevue/nuxt-module'
  ],
  css: [

  ],
  primevue: {
    options: {
      ripple: true,
      inputVariant: 'filled',
      theme: {
        preset: MyPreset,
        options: {
          prefix: 'p',
          darkModeSelector: false,
          cssLayer: false
        }
      }
    },
  },
})