<script lang="ts">
	import IntersectionObserver from 'svelte-intersection-observer';
	import { twMerge } from 'tailwind-merge';

	// props (external)
	export let i = 0;
	export let once = true;
	export let threshold = 2 / 3;

	// props (internal)
	const delays = [
		'lg:delay-[0ms]',
		'lg:delay-[500ms]',
		'lg:delay-[1000ms]',
		'lg:delay-[1500ms]',
		'lg:delay-[2000ms]',
		'lg:delay-[2500ms]',
		'lg:delay-[3000ms]',
		'lg:delay-[3500ms]',
		'lg:delay-[4000ms]',
		'lg:delay-[4500ms]',
		'lg:delay-[5000ms]',
		'lg:delay-[5500ms]',
		'lg:delay-[6000ms]',
		'lg:delay-[6500ms]',
		'lg:delay-[7000ms]',
		'lg:delay-[7500ms]',
		'lg:delay-[8000ms]',
		'lg:delay-[8500ms]',
		'lg:delay-[9000ms]',
		'lg:delay-[9500ms]',
		'lg:delay-[10000ms]'
	];
	let element: HTMLElement;
	let intersecting: boolean;

	$: classes = twMerge(
		'transition duration-[1000ms]',
		delays[i],
		!intersecting ? 'opacity-0 translate-y-[1rem]' : 'opacity-100 translate-y-0',
		$$props.class
	);
</script>

<IntersectionObserver {...$$restProps} bind:intersecting {element} {once} {threshold}>
	<div bind:this={element} class={classes}>
		<slot {intersecting} />
	</div>
</IntersectionObserver>
