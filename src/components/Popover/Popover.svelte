<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { Card } from '$components';

	// props (external)
	export let isOpen = false;
	export let position = 'bl';

	// props (dynamic)
	$: positionClasses = position === 'bl' ? 'bottom-0 left-0' : '';
	$: classes = twMerge(
		// 'transition ring-0 dark:ring-0 lg:ring-1 lg:dark:ring-1 items-stretch p-0 pl-[1rem] lg:pl-0 duration-200 lg:absolute lg:bottom-0 lg:left-0 bg-transparent dark:bg-transparent shadow-none dark:shadow-none lg:shadow lg:dark:shadow lg:dark:shadow-black/[1] lg:bg-gray-50 lg:dark:bg-gray-800',
		'absolute transition duration-200',
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
>
	<Card class={classes}>
		<slot />
	</Card>
</div>
