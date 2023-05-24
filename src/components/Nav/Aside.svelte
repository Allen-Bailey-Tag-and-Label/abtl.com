<script lang="ts">
	import { MenuItem, menuItems } from './';

	// props (internal)
	export let closeNav: Function;
	export let isOpen: boolean;
</script>

<aside
	class="transition duration-200 flex flex-col w-[calc(100%_-_2rem)] min-h-[100dvh] max-h-[100dvh] overflow-y-auto bg-gray-50 justify-start shadow-md dark:bg-gray-800 backdrop-blur ring-0 shadow-black/[.15] dark:shadow-black/[.3] py-[1rem] fixed top-0 right-0 z-[2] lg:hidden {!isOpen
		? 'translate-x-full'
		: 'translate-x-0'}"
>
	{#each menuItems as { href, sub, text }}
		<MenuItem {closeNav} {href} {sub}>{text}</MenuItem>
	{/each}
</aside>
