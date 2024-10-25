import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import react from '@vitejs/plugin-react';
import virtualHtml from 'vite-plugin-virtual-html';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		visualizer({ open: true }),
		virtualHtml({
			pages: {
				main: '/src/main.html',
			},
			indexPage: 'main',
		}),
	],
	resolve: {
		alias: {
			'@src': path.resolve(__dirname, 'src'),
			'@types': path.resolve(__dirname, 'src', 'types'),
		},
	},
	server: {
		port: 3000,
		proxy: {
			'/api': `http://localhost:5001`,
		},
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks(id: string) {
					console.log(`#lib : ${id}`);
					// creating a chunk to react routes deps. Reducing the vendor chunk size
					if (
						id.includes('react-router-dom') ||
						id.includes('@remix-run') ||
						id.includes('react-router')
					) {
						return '@react-router';
					}
				},
			},
		},
	},
});
