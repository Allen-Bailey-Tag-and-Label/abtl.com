<script lang="ts">
	import { browser } from '$app/environment';
	import { Icon, Icons } from '$components';
	import { twMerge } from 'tailwind-merge';
	import settings from '../../routes/settings';

	// utilities
	const timer = (currentTimestamp: number) => {
		if (startTimestamp === undefined) startTimestamp = currentTimestamp;
		const elapsed = currentTimestamp - startTimestamp;
		const radians = (((elapsed % translateZDuration) / translateZDuration) * 360 * Math.PI) / 180;
		zAddition = Math.cos(radians) * 20;
		if ($settings.confettiZAnimate) window.requestAnimationFrame(timer);
	};

	// props (external)
	export let blur = 0;
	export let opacity = 1;
	export let rotate = 0;
	export let scrollY = 0;
	export let scale = 1000;
	export let src = Icons.Tag;
	export let theme = 'solid';
	export let transitionDuration = 5000;
	export let translateZDuration = Math.floor(Math.random() * 5000) + 2500;
	export let x = 0;
	export let y = 0;
	export let z = 0;

	// props (internal)
	let startTimestamp: undefined | number;
	let zAddition = 0;

	$: classes = twMerge('w-[1rem] fixed opacity-[.3] left-1/2 text-primary-500', $$props.class);
	$: parallaxFactor = (z * 2) / scale;
	$: top = $settings.confettiYAnimate ? `calc(50% - ${scrollY * parallaxFactor}px)` : `calc(50%)`;
	$: if (browser && $settings.confettiZAnimate) window.requestAnimationFrame(timer);
</script>

<Icon
	class={classes}
	{src}
	{theme}
	style="filter: blur({$settings.confettiBlur
		? blur
		: 0}px); opacity: {opacity}; top: {top}; transition-duration: {transitionDuration}ms; transition-timing-function: cubic-bezier(0,1,0,1); transform: perspective({scale}px) translateX(calc({x}px)) translateY(calc({y}px)) translateZ({z +
		zAddition}px) rotate({rotate}deg);"
/>
