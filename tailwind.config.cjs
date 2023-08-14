const { tailwindcssPaletteGenerator } = require('@bobthered/tailwindcss-palette-generator');
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/sveltewind/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: tailwindcssPaletteGenerator({
				colors: ['#172A53', '#34ef98', '#8b34ef', '#272b30'],
				names: ['primary', 'secondary', 'tertiary', 'gray'],
				shades: [
					{ name: '50', lightness: 98 },
					{ name: '100', lightness: 95 },
					{ name: '200', lightness: 90 },
					{ name: '300', lightness: 82 },
					{ name: '400', lightness: 64 },
					{ name: '500', lightness: 46 },
					{ name: '600', lightness: 33 },
					{ name: '700', lightness: 24 },
					{ name: '800', lightness: 10 },
					{ name: '900', lightness: 7 },
					{ name: '950', lightness: 4 }
				]
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
