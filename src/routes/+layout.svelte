<script>
	import { page } from '$app/stores';
	import { theme } from 'sveltewind/stores';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { twMerge } from 'tailwind-merge';
	import { Logo } from '$components';
	import '../app.postcss';

	let mounted = false;

	const card =
		'ring-1 ring-primary-500/[.025] dark:ring-gray-500/[.1] dark:shadow dark:shadow-black/[.7] backdrop-blur bg-gray-50/[.95] dark:bg-gray-800/[.9] hover:bg-gray-50/[.95] focus:bg-gray-50/[.95] dark:hover:bg-gray-800/[.9] dark:focus:bg-gray-800/[.9]';
	const input =
		'hover:ring-offset-primary-500 focus:ring-offset-primary-500 focus:ring-primary-500/[.3] bg-transparent dark:bg-transparent';

	theme.set({
		a: 'before:hidden border-primary-500 border-b-2 font-semibold transition duration-200 hover:text-primary-500 hover:border-transparent',
		button: twMerge(
			input,
			'rounded-full px-[2rem] bg-primary-500 dark:bg-primary-500 hover:bg-primary-600 focus:bg-primary-600 focus:ring-primary-500/[.3]'
		),
		card,
		checkbox:
			'peer-focus:ring-primary-500/[.3] peer-focus:ring-offset-primary-500 bg-transparent dark:bg-transparent text-white',
		checkboxChecked: 'bg-primary-500 dark:bg-primary-500',
		footer: 'py-[2rem] text-gray-500 dark:text-gray-400 text-center lg:text-left',
		form: 'max-w-sm mx-auto',
		header:
			'transition-all duration-200 justify-start shadow-md fixed bottom-0 lg:top-0 lg:bottom-auto w-full z-[1] bg-gray-50/[.95] backdrop-blur ring-0 shadow-black/[.15] dark:shadow-black/[.3]',
		h1: 'font-serif font-semibold',
		h2: 'font-serif font-semibold relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:block after:w-[2rem] after:h-[2px] after:bg-current pb-[1.5rem]',
		h3: 'font-serif font-semibold',
		h4: 'font-serif font-semibold',
		h5: 'font-serif font-semibold',
		h6: 'font-serif font-semibold',
		input: input,
		main: 'overflow-hidden max-w-[100vw]',
		option: 'bg-white text-gray-700 dark:bg-gray-900 dark:text-white',
		popover: 'absolute transition duration-200 z-[2]',
		section: 'lg:py-[10rem]',
		select: input,
		table: 'bg-transparent dark:bg-transparent',
		td: 'outline-none ring-1 ring-transparent focus:ring-primary-500 transition duration-200',
		th: twMerge(card, 'z-[1] sticky top-0'),
		textarea: input,
		toolbar: 'rounded-none p-[.5rem] lg:p-[.5rem] justify-end flex-row rounded-none z-[2]',
		toolbarButton: twMerge(
			card,
			'py-[.5rem] px-[.5rem] rounded hover:ring-primary-500 focus:ring-primary-500'
		)
	});

	$: title = [
		'Allen-Bailey Tag & Label',
		...$page.url.pathname
			.slice(1)
			.split('/')
			.filter((s) => s !== '')
			.map((directory) =>
				directory
					.split('-')
					.map((word) => word[0].toUpperCase() + word.slice(1))
					.join(' ')
			)
	]
		.reverse()
		.join(' - ');

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div
	class="z-[2] fixed top-0 left-0 flex w-[100dvw] h-[100dvh] items-center justify-center bg-primary-500 transition duration-500 ease-in {!mounted
		? 'translate-y-0'
		: 'translate-y-full'}"
>
	<div
		class="h-[5rem] transition duration-500 ease-in {!mounted
			? 'translate-y-0'
			: 'translate-y-[-200%]'}"
	>
		<Logo />
	</div>
</div>

{#if mounted}
	<div in:fade>
		<slot />
	</div>
{/if}
