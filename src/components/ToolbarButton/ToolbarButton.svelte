<script lang="ts">
	import { getEvents } from 'sveltewind/actions';
	import { Button } from 'sveltewind/components';
	import { current_component } from 'svelte/internal';
	import { theme } from 'sveltewind/stores';
	import { twMerge } from 'tailwind-merge';
	import { Icon } from '$components';
	import type { SvelteComponent } from 'svelte';

	// props (internal)
	const events = getEvents(current_component);

	// props (external)
	export let src: undefined | SvelteComponent = undefined;
	export let style: undefined | string = undefined;
	export let use: any[] = [];

	// props (dynamic)
	$: classes = twMerge($theme.toolbarButton, $$props.class);
</script>

<Button class={classes} {style} use={[events, ...use]}>
	<slot>
		<Icon {src} />
	</slot>
</Button>
