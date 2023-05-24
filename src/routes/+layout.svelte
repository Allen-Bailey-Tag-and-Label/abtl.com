<script>
	import { page } from '$app/stores';
	import { theme } from 'sveltewind/stores';
	import '../app.postcss';

	theme.set({
		a: 'transition-all font-semibold text-current hover:text-white focus:text-white before:hidden bg-gradient-to-r bg-repeat-x bg-left-bottom from-primary-500 to-primary-500 bg-[length:100%_2px] hover:bg-[length:100%_100%] focus:bg-[length:100%_100%]',
		// a: 'before:z-auto font-semibold before:bg-primary-500 before:h-[2px] before:left-[-.5rem] before:bottom-[-.25rem] before:ring-0 before:translate-x-0 before:w-[0px] hover:before:bg-primary-500 hover:before:left-0 hover:before:w-full hover:before:h-[2px] hover:before:bottom-[-.25rem] focus:before:left-0 focus:before:w-full focus:before:h-[2px] focus:before:bottom-[-.25rem]',
		button:
			'rounded-full px-[2rem] bg-primary-500 hover:bg-primary-600 focus:bg-primary-600 focus:ring-primary-500/[.3]',
		card: 'dark:bg-gray-800 ring-1 ring-primary-500/[.025] dark:ring-gray-500/[.1] dark:shadow dark:shadow-black/[.7]',
		checkbox:
			'hover:ring-offset-primary-500 focus:ring-offset-primary-500 focus:ring-primary-500/[.3]',
		checkboxChecked: 'bg-primary-500 dark:bg-primary-500',
		footer: 'py-[2rem] text-gray-500 dark:text-gray-400 text-center lg:text-left',
		header:
			'transition-all duration-200 justify-start shadow-md fixed bottom-0 lg:top-0 lg:bottom-auto w-full z-[1] bg-gray-50/[.95] backdrop-blur ring-0 shadow-black/[.15] dark:shadow-black/[.3]',
		h1: 'font-serif font-semibold',
		h2: 'font-serif font-semibold relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:block after:w-[2rem] after:h-[2px] after:bg-current pb-[1.5rem]',
		h3: 'font-serif font-semibold',
		h4: 'font-serif font-semibold',
		h5: 'font-serif font-semibold',
		h6: 'font-serif font-semibold',
		input:
			'hover:ring-offset-primary-500 focus:ring-offset-primary-500 focus:ring-primary-500/[.3]',
		main: 'overflow-hidden max-w-[100vw]',
		section: 'lg:py-[10rem]'
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
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<slot />
