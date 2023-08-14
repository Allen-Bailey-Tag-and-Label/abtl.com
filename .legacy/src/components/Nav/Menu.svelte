<script lang="ts">
	import { MenuItem, menuItems } from './';

	export let closeNav;
</script>

<nav class="hidden lg:flex">
	{#each menuItems as { href, sub, text }}
		<MenuItem {closeNav} {href} {sub}>{text}</MenuItem>
	{/each}
</nav>
