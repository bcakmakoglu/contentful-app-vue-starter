import { resolve } from 'path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import WindiCSS from 'vite-plugin-windicss';
import Inspect from 'vite-plugin-inspect';
export default defineConfig({
    resolve: {
        alias: {
            '~/': `${resolve(__dirname, 'src')}/`,
            '@/': `${resolve(__dirname)}/`,
        },
    },
    plugins: [
        Vue({
            include: [/\.vue$/],
        }),
        // https://github.com/antfu/unplugin-auto-import
        AutoImport({
            imports: ['vue', '@vueuse/head', '@vueuse/core'],
            dts: true,
        }),
        // https://github.com/antfu/unplugin-vue-components
        Components({
            // allow auto load markdown components under `./src/components/`
            extensions: ['vue'],
            dts: true,
            // allow auto import and register components used in markdown
            include: [/\.vue$/, /\.vue\?vue/],
            // custom resolvers
            resolvers: [
                // auto import icons
                // https://github.com/antfu/unplugin-icons
                IconsResolver({
                    componentPrefix: '',
                    // enabledCollections: ['carbon']
                }),
            ],
        }),
        // https://github.com/antfu/unplugin-icons
        Icons(),
        // https://github.com/antfu/vite-plugin-windicss
        WindiCSS(),
        // https://github.com/antfu/vite-plugin-inspect
        Inspect({
            // change this to enable inspect for debugging
            enabled: false,
        }),
    ],
    server: {
        fs: {
            strict: true,
        },
    },
    // https://github.com/antfu/vite-ssg
    ssgOptions: {
        script: 'async',
        formatting: 'minify',
    },
    optimizeDeps: {
        include: ['vue', '@vueuse/head', '@vueuse/core'],
        exclude: ['vue-demi'],
    },
});
