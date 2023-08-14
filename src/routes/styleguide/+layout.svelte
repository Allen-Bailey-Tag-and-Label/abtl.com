<script>
	// @ts-ignore
	import { onMount } from 'svelte';
	import { Moon, Sun } from 'sveltewind/components/icons';
	import { A, Button, Icon } from '$components';

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
	const navigation = [
		{ href: '/styleguide/colors', title: 'Colors' },
		{ href: '/styleguide/components', title: 'Components' }
	];
	onMount(() => {
		if (window) {
			darkMode = localStorage.theme === 'dark';
		}
	});
</script>

<div class="flex flex-col lg:flex-row max-h-[100dvh]">
	<div class="flex flex-col max-h-full overflow-y-auto p-[1rem]">
		{#each navigation as { href, title }}
			<A {href}>{title}</A>
		{/each}
		<Button class="px-[.75rem] self-center" on:click={darkModeClickHandler}>
			<Icon src={darkMode ? Moon : Sun} />
		</Button>
	</div>
	<div class="p-[1rem] flex flex-col space-y-[2rem] flex-grow max-h-full overflow-y-auto">
		<slot />
	</div>
</div>
