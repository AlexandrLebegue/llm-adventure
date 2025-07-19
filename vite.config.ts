import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }: { mode: string }) => {
    // Load environment variables from files and merge with system environment
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};

    // import.meta.env.VITE_OPENROUTER_API_KEY available here with: process.env.VITE_OPENROUTER_API_KEY
    // import.meta.env.VITE_OPENROUTER_BASE_URL available here with: process.env.VITE_OPENROUTER_BASE_URL
    // import.meta.env.VITE_VISION_MODEL available here with: process.env.VITE_VISION_MODEL
    // import.meta.env.VITE_ANALYSIS_MODEL available here with: process.env.VITE_ANALYSIS_MODEL
    // import.meta.env.VITE_USE_MOCK available here with: process.env.VITE_USE_MOCK
    // import.meta.env.VITE_PORT available here with: process.env.VITE_PORT

    return defineConfig({
        define: {
            __VITE_OPENROUTER_API_KEY__: JSON.stringify(process.env.VITE_OPENROUTER_API_KEY),
            __VITE_OPENROUTER_BASE_URL__: JSON.stringify(process.env.VITE_OPENROUTER_BASE_URL),
            __VITE_VISION_MODEL__: JSON.stringify(process.env.VITE_VISION_MODEL),
            __VITE_ANALYSIS_MODEL__: JSON.stringify(process.env.VITE_ANALYSIS_MODEL),
            __VITE_USE_MOCK__: JSON.stringify(process.env.VITE_USE_MOCK),
            __VITE_PORT__: JSON.stringify(process.env.VITE_PORT),
        },
        base: "/",
        plugins: [react()],
        preview: {
            port: process.env.VITE_PORT ? parseInt(process.env.VITE_PORT) : 8080,
            strictPort: true,
        },
        server: {
            port: process.env.VITE_PORT ? parseInt(process.env.VITE_PORT) : 8080,
            strictPort: true,
            host: true,
            origin: `http://0.0.0.0:${process.env.VITE_PORT ? parseInt(process.env.VITE_PORT) : 8080}`,
        },
    });
}