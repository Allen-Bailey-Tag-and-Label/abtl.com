<script>
	import { A, Button, Card, Checkbox } from '$components';

	// props (internal)
	const components = [
		{ component: A, slot: 'Link', title: 'A' },
		{ component: Button, slot: 'Button', title: 'Button' },
		{ component: Card, slot: 'Card', title: 'Card' },
		{ component: Checkbox, slot: 'Checkbox', title: 'Checkbox' }
	];
</script>

<div class="flex flex-col space-y-[1rem]">
	<div class="uppercase font-semibold">Components</div>

	<div
		class="gap-[1rem] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
	>
		{#each components as { component, slot, title }}
			<Card class="aspect-square relative items-center justify-center">
				<div class="absolute top-[1rem] left-[1rem]">{title}</div>
				<svelte:component this={component}>{slot}</svelte:component>
			</Card>
		{/each}
	</div>
</div>
