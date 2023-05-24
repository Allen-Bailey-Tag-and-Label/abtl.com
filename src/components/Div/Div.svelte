<script lang="ts">
	import { getEvents, use as useAction } from 'sveltewind/actions';
	import { current_component } from 'svelte/internal';
	import { twMerge } from 'tailwind-merge';
	import { variantTailwindClasses as vtc } from './';

	// props (internal)
	const events = getEvents(current_component);

	// props (external)
	export let variant: string | string[] = '';
	export let variantTailwindClasses = vtc;
	export let use: any[] = [];

	$: variantArray = typeof variant === 'string' ? variant.split(/\s+/g) : variant;
	$: variantClasses = [...variantArray].map((key: string) => variantTailwindClasses[key]);
	$: classes = twMerge(variantClasses, $$props.class);
</script>

<div {...$$props} class={classes} use:useAction={[events, ...use]}>
	<slot />
</div>
