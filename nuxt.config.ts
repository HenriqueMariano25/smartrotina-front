// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primeuix/themes/aura'
import {definePreset} from "@primeuix/styled";
import {locale} from "./plugins/primevue-locale-dictionary"
import {process} from "std-env";

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
        secundary: {
            50: "#ebf0ec",
            100: "#e1e8e3",
            150: "#d7e1da",
            200: "#cdd9d1",
            250: "#c3d1c7",
            300: "#afc2b5",
            400: "#a5bbab",
            500: "#9bb3a2",
            600: "#8ca192",
            700: "#7c8f82",
            800: "#6d7d71",
            900: "#5d6b61"
        },
        tooltip: {
            background: 'rgba(0,0,0,0.8)',
            color: '#fff',
            padding: '4px',
            borderRadius: '4px',
            gutter: '4px',
        },
    },
});

export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            apiBase: process.env.API_BASE_URL || "http://localhost:3000"
        }
    },
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},
    devServer: {
        port: 8080
    },
    modules: [
        '@nuxt/eslint',
        '@nuxt/image',
        '@nuxtjs/tailwindcss',
        '@primevue/nuxt-module',
        '@pinia/nuxt'
    ],
    css: [
        // "primevue/resources/primevue.min.css",
    ],
    primevue: {
        options: {
            locale: {...locale},
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