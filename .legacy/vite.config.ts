import { sveltekit } from '@sveltejs/kit/vite';
import { resolve } from 'path';

const config = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$actions: resolve('./src/actions'),
			$components: resolve('./src/components'),
			$db: resolve('./src/db'),
			$emailTemplates: resolve('./src/routes/(email-templates)/email-templates'),
			$icons: resolve('./src/icons'),
			$lib: resolve('./src/lib'),
			$routes: resolve('./src/routes'),
			$src: resolve('./src')
		}
	}
};

export default config;
