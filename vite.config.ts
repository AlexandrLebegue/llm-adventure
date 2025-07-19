import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }: { mode: string }) => {
    // Hardcoded environment variables (previously loaded from .env)
    // VITE_OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
    // VITE_VISION_MODEL=qwen/qwen3-14b:free
    // VITE_ANALYSIS_MODEL=qwen/qwen3-14b:free
    // VITE_USE_MOCK=false
    // VITE_PORT=8080

    return defineConfig({
        define: {
            __VITE_OPENROUTER_API_KEY__: JSON.stringify("c2stb3ItdjEtZWM0OGIxODNmYzdmOTJjNWJiNjhkNzJhNWU0YjgxYmVkYmRiYzYyMzUwMzE4N2RhM2M4Mzg1MWExOWM0OGEwMw=="),
            __VITE_OPENROUTER_BASE_URL__: JSON.stringify("https://openrouter.ai/api/v1"),
            __VITE_VISION_MODEL__: JSON.stringify("qwen/qwen3-14b:free"),
            __VITE_ANALYSIS_MODEL__: JSON.stringify("qwen/qwen3-14b:free"),
            __VITE_USE_MOCK__: JSON.stringify("false"),
            __VITE_PORT__: JSON.stringify("8080"),
        },
        base: "/",
        plugins: [react()],
        preview: {
            port: 8080,
            strictPort: true,
        },
        server: {
            port: 8080,
            strictPort: true,
            host: true,
            origin: `http://0.0.0.0:8080`,
        },
    });
}