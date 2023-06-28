<script lang="ts">
	import { Footer, Header, Main, Nav } from '$components';

	// props (external)
	export let data;

	// props (internal)
	let closeNav = () => (isOpen = false);
	let isOpen: boolean = false;
	let toggleNav = () => (isOpen = !isOpen);
</script>

<Nav.Overlay bind:isOpen {toggleNav} />
<Nav.Aside bind:isOpen {closeNav} user={data?.user} />

<div class="relative flex flex-col">
	<Main>
		<slot />
		<Footer />
		<Header bind:isOpen {closeNav} {toggleNav} user={data?.user} />
	</Main>
</div>
