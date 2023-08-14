<script>
	import { Button, Icon } from '$components';
	import { Moon, Sun } from 'sveltewind/components/icons';
	import { setTheme } from '$lib/theme';
	import { onMount } from 'svelte';
	import '../app.postcss';

	// handlers
	const darkModeClickHandler = () => {
		darkMode = !darkMode;
		if (window) {
			document.documentElement.classList[darkMode ? 'add' : 'remove']('dark');
			localStorage.theme = darkMode ? 'dark' : 'light';
		}
	};

	// props (internal)
	let darkMode = false;

	onMount(() => {
		darkMode = setTheme();
	});
</script>

<!-- <div class="flex justify-end p-[1rem]">
	<Button class="px-[.75rem]" on:click={darkModeClickHandler}>
		<Icon src={darkMode ? Moon : Sun} />
	</Button>
</div> -->
<slot />
