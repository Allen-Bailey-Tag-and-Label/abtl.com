<script lang="ts">
	import { getEvents } from 'sveltewind/actions';
	import { current_component } from 'svelte/internal';
	import { twMerge } from 'tailwind-merge';
	import { Icons } from '$components';
	import ToolbarButton from './ToolbarButton.svelte';

	// props (internal)
	const events = getEvents(current_component);

	// props (external)
	export let style: undefined | string = undefined;
	export let use: any[] = [];

	// props (dynamic)
	$: classes = twMerge($$props.class);
</script>

<ToolbarButton class={classes} src={Icons.ChevronDoubleLeft} {style} use={[events, ...use]} />
