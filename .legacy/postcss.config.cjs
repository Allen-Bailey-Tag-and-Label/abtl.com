const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const tailwindcss = require('tailwindcss');

const config = {
	plugins: {
		tailwindcss: {},
		autoprefixer: {},
		cssnano: {}
	}
};

module.exports = config;
