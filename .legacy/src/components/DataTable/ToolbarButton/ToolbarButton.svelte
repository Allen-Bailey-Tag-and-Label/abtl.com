<script lang="ts">
	import { clickOutside } from '$actions';
	import { Icons, Popover, ToolbarButton } from '$components';
	import type { SvelteComponent } from 'svelte';

	// props (external)
	export let isOpen: boolean = false;
	export let position: 'br' | 'bl' | 'tl' | 'tr' = 'br';
	export let src: SvelteComponent = Icons.Cog6Tooth;
</script>

<div class="relative" use:clickOutside={() => (isOpen = false)}>
	<ToolbarButton.default on:click={() => (isOpen = !isOpen)} {src} />
	<Popover bind:isOpen class={$$props.class} inert={isOpen ? undefined : 'inert'} {position}>
		<slot />
	</Popover>
</div>
