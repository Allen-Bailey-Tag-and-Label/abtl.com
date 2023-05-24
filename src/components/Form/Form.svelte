<script lang="ts">
	import { getEvents } from 'sveltewind/actions';
	import { Form } from 'sveltewind/components';
	import { current_component } from 'svelte/internal';
	import { twMerge } from 'tailwind-merge';
	import { enhance } from '$app/forms';

	// props (internal)
	const events = getEvents(current_component);

	// props (external)
	export let style: undefined | string = undefined;
	export let use: any[] = [enhance];

	// props (dynamic)
	$: classes = twMerge($$props.class);
</script>

<Form {...$$restProps} class={classes} {style} use={[events, ...use]}>
	<slot />
</Form>
