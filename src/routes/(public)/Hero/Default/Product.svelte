<script lang="ts">
	import { followMouse } from '$actions';

	// props (external)
	export let index = 0;
	export let productsShuffled = [];
</script>

{#each productsShuffled as { component, elem }, i}
	<div
		class="transition duration-200 absolute hidden left-1/2 top-1/2 -translate-y-1/2 lg:block {i !==
		index
			? 'translate-x-[60vw]'
			: 'translate-x-[calc(-50%_+_372px_-_5rem)]'}"
	>
		<div class="relative z-[1]" use:followMouse>
			<svelte:component this={component} />
		</div>
		<div
			class="bg-black/[.3] w-[120%] aspect-square absolute rounded-full scale-y-[10%] bottom-[0rem] translate-y-1/2 left-1/2 -translate-x-1/2 blur-[5rem] {i !==
			index
				? 'opacity-0'
				: 'opacity-100'}"
		/>
	</div>
{/each}
