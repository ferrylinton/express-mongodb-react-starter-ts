import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import virtualHtml from 'vite-plugin-virtual-html';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()].concat(
		process.env.NODE_ENV === 'build'
			? [
					virtualHtml({
						pages: {
							main: '/index.html',
						},
						indexPage: 'main',
					}),
				]
			: []
	),
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
