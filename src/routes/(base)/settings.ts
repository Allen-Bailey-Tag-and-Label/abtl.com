import { writable } from 'svelte/store';

export default writable({
	confettiCount: 100,
	confettiDepthOfField: true,
	confettiShow: false,
	confettiXScale: 250,
	confettiYAnimate: true,
	confettiYScale: 500,
	confettiZAnimate: false,
	confettiZScale: 500,
	darkTheme: {
		options: ['normal', 'extra-dark'],
		value: 'extra-dark'
	},
	showBackground: true
});
