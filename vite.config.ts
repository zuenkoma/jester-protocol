import { UserConfig } from 'vite';

export default {
    root: 'public',
    build: {
        outDir: '../dist',
        rollupOptions: {
            input: ['public/edit.html', 'public/play.html'],
            output: {
                entryFileNames: '[hash:6].js',
                chunkFileNames: '[hash:6].js',
                assetFileNames: '[hash:6].[ext]'
            }
        }
    },
    publicDir: false
} satisfies UserConfig;