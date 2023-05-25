<script lang="ts">
	import { Footer, Header, Main, Nav } from '$components';
	import Confetti from '../Confetti.svelte';
	import Customizer from '../Customizer.svelte';
	import settings from '../settings';

	// props (external)
	export let data;

	// props (internal)
	let closeNav = () => (isOpen = false);
	let isOpen: boolean = false;
	let toggleNav = () => (isOpen = !isOpen);
</script>

<Nav.Overlay bind:isOpen {toggleNav} />
<Nav.Aside bind:isOpen {closeNav} />

<div class="relative flex flex-col">
	<Main>
		<slot />
		<Footer />
		<Header bind:isOpen {closeNav} {toggleNav} user={data?.user} />
	</Main>
</div>

{#if $settings.confettiShow}
	<Confetti />
{/if}

<Customizer />
