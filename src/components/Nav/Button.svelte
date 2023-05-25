<script lang="ts">
	import { Button } from '$components';
	import { twMerge } from 'tailwind-merge';

	// props (internal)
	export let isOpen: boolean;
	export let hideHeader: boolean;
	export let toggleNav: Function;

	$: classes = twMerge(
		'z-[3] transition-all duration-200 text-current fixed right-[.25rem] lg:hidden bottom-[.5rem]',
		hideHeader && !isOpen ? 'bottom-[-100%]' : 'bottom-[.5rem]',
		$$props.class
	);
</script>

<Button class={classes} variant="icon transparent" on:click={toggleNav}>
	<div
		class="transition duration-200 bg-current w-[1rem] h-[2px] absolute top-1/2 left-1/2 -translate-x-1/2 {!isOpen
			? 'translate-y-[-.25rem] rotate-0'
			: '-rotate-45'}"
	/>
	<div
		class="transition duration-200 bg-current w-[1rem] h-[2px] absolute top-1/2 left-1/2 -translate-x-1/2 {!isOpen
			? 'translate-y-[.25rem] rotate-0'
			: 'rotate-45'}"
	/>
</Button>
