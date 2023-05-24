<script lang="ts">
	import { Overlay } from '$components';

	// props (internal)
	export let isOpen;
	export let toggleNav;
</script>

<Overlay
	class="fixed transition duration-200 top-0 left-0 w-full h-[100dvh] bg-black/[.7] z-[2] lg:hidden {!isOpen
		? 'opacity-0 pointer-events-none'
		: 'opacity-100 pointer-events-auto'}"
	on:click={toggleNav}
/>
