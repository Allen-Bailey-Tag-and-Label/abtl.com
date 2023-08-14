import { writable } from 'svelte/store';

export default writable({
	confettiBlur: true,
	confettiCount: 200,
	confettiShow: false,
	confettiXScale: 250,
	confettiYAnimate: true,
	confettiYScale: 1000,
	confettiZAnimate: false,
	confettiZScale: 500,
	darkTheme: {
		options: ['normal', 'extra-dark'],
		value: 'extra-dark'
	},
	showBackground: true
});
