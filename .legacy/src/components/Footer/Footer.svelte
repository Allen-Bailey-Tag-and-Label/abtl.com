<script>
	// imports
	import { current_component } from 'svelte/internal';
	import { twMerge } from 'tailwind-merge';
	import { getEvents, use as useAction } from 'sveltewind/actions';
	import { theme } from 'sveltewind/stores';
	import { Container, Section } from '$components';
	import CompanyInfo from './CompanyInfo.svelte';
	import Sitemap from './Sitemap.svelte';

	// handlers

	// helpers

	// props (internal)
	const events = getEvents(current_component);

	// props (external)
	export let style = undefined;
	export let use = [];

	// props (dynamic)
	$: classes = twMerge('', $theme.footer, $$props.class);
</script>

<CompanyInfo />
<Sitemap />
<footer class={classes} {style} use:useAction={[events, ...use]}>
	<slot>
		<Container
			>© Copyright 2019, Allen-Bailey Tag & Label,<br class="lg:hidden" /> All rights reserved.</Container
		>
	</slot>
</footer>
