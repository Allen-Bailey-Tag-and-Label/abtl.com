const { tailwindcssPaletteGenerator } = require('@bobthered/tailwindcss-palette-generator');
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/sveltewind/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: tailwindcssPaletteGenerator({
				colors: ['#172A53', '#34ef98', '#8b34ef', '#272b30'],
				names: ['primary', 'secondary', 'tertiary', 'gray']
			}),
			fontFamily: {
				sans: ['Montserrat', 'sans-serif'],
				serif: ['Libre Baskerville', 'serif']
			}
		}
	},

	plugins: []
};

module.exports = config;
