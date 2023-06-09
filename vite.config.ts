import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import layouts from 'vite-plugin-vue-layouts'
import postcssConfig from './postcss.config';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { VitePWA } from 'vite-plugin-pwa'
export default defineConfig({
    resolve: {
        alias: {
            '~/': `${path.resolve(__dirname, 'src')}/`,
        },
    },

    plugins: [
        layouts(),
        Vue({
            include: [/\.vue$/, /\.md$/],
            reactivityTransform: true,
        }),
        // https://github.com/hannoeru/vite-plugin-pages
        Pages({
            extensions: ['vue', 'md'],
        }),
        // https://github.com/antfu/unplugin-auto-import
        AutoImport({
            imports: [
                'vue',
                'vue-router',
                'vue-i18n',
                'vue/macros',
                '@vueuse/head',
                '@vueuse/core',
            ],
            dts: 'src/auto-imports.d.ts',
            dirs: [
                'src/composables',
                'src/components',
                'src/store',
                'src/types',
            ],
            vueTemplate: true,
        }),
        // https://github.com/antfu/unplugin-vue-components
        Components({
            // allow auto load markdown components under `./src/components/`
            extensions: ['vue', 'md'],
            // allow auto import and register components used in markdown
            include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
            dts: 'src/components.d.ts',
            resolvers: [
                //收集@ionic/vue的组件
                (componentName) => {
                    if (componentName.startsWith('Ion'))
                        return { name: componentName, from: '@ionic/vue' };
                },
            ],
        }),
        // https://github.com/antfu/vite-plugin-pwa
        VitePWA({
            registerType: 'autoUpdate',
            injectRegister: 'auto',
            strategies: 'generateSW',
            manifest: {
                name: 'APP NAME LONG',
                short_name: 'web app template',
                theme_color: '#ffffff',
                start_url: './index.html',
                display: 'standalone',
                icons: [
                    {
                        src: '/android-chrome-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: '/android-chrome-384x384.png',
                        sizes: '384x384',
                        type: 'image/png',
                    },
                ],
            },
        }),
        // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
        VueI18nPlugin({
            runtimeOnly: false,
            compositionOnly: true,
            include: [path.resolve(__dirname, 'locales/**')],
        }),
    ],
    css: {
        postcss: postcssConfig,
        preprocessorOptions: {
            css: {
                charset: false,
            },
        },
    }
})
