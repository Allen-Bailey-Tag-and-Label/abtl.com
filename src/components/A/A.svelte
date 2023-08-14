<script>
	import { current_component } from 'svelte/internal';
	import { A } from 'sveltewind/components';
	import { getEvents } from '$actions';

	// props (external)
	export let use = [];

	// props (internal)
	const events = getEvents(current_component);
</script>

<A {...$$restProps} class={$$props.class} use={[events, ...use]}>
	<span class="relative"><slot /></span>
</A>
