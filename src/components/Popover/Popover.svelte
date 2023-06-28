<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { theme } from 'sveltewind/stores';
	import { Card } from '$components';

	// props (external)
	export let isOpen = false;
	export let position = 'bl';

	// props (internal)
	let positionClasses = '';

	// props (dynamic)
	$: if (position) {
		if (position === 'bl') positionClasses = 'bottom-0 left-0';
		if (position === 'br') positionClasses = 'bottom-0 right-0';
		if (position === 'tl') positionClasses = 'top-0 left-0';
		if (position === 'tr') positionClasses = 'top-0 right-0';
	}
	$: classes = twMerge(
		$theme.popover,
		positionClasses,
		!isOpen
			? 'opacity-0 pointer-events-none lg:translate-y-[calc(100%_-_.25rem)]'
			: 'opacity-100 pointer-events-auto lg:translate-y-[100%]',
		$$props.class
	);
</script>

<div
	class="grid transition-[grid-template-rows] duration-200 [&>*]:overflow-hidden lg:[&>*]:overflow-visible {!isOpen
		? 'grid-rows-[0fr]'
		: 'grid-rows-[1fr]'}"
	inert={isOpen ? undefined : 'inert'}
>
	<Card class={classes}>
		<slot />
	</Card>
</div>
