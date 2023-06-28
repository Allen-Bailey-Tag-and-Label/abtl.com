<script lang="ts">
	import { getEvents } from 'sveltewind/actions';
	import { Card } from 'sveltewind/components';
	import { current_component } from 'svelte/internal';
	import { theme } from 'sveltewind/stores';
	import { twMerge } from 'tailwind-merge';

	// props (internal)
	const events = getEvents(current_component);

	// props (external)
	export let style: undefined | string = undefined;
	export let use: any[] = [];

	// props (dynamic)
	$: classes = twMerge($theme.toolbar, $$props.class);
</script>

<Card class={classes} {style} use={[events, ...use]}>
	<slot />
</Card>
