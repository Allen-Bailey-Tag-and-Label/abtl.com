<script>
	import { current_component } from 'svelte/internal';
	import { Button } from 'sveltewind/components';
	import { getEvents } from '$actions';

	// props (external)
	/**
	 * @type {any[]}
	 */
	export let use = [];

	// props (internal)
	const events = getEvents(current_component);
</script>

<Button class={$$props.class} use={[events, ...use]}>
	<span class="relative"><slot /></span>
</Button>
