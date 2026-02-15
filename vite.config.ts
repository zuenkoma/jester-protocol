import { UserConfig } from 'vite';

export default {
    build: {
        rollupOptions: {
            input: ['edit.html', 'play.html'],
            output: {
                entryFileNames: '[hash:6].js',
                chunkFileNames: '[hash:6].js',
                assetFileNames: '[hash:6].[ext]'
            }
        }
    }
} satisfies UserConfig;