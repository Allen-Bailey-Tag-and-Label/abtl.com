<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { twMerge } from 'tailwind-merge';
	import { Header } from 'sveltewind/components';
	import { theme } from 'sveltewind/stores';
	import { A, Button, Container, Div, Icon, Icons, Logo, Nav } from '$components';
	import settings from '../../routes/settings';

	// handlers
	const mousemoveHandler = (e) => {
		mouseY = e.clientY;
	};

	// props (external)
	export let closeNav: Function;
	export let isOpen: boolean;
	export let toggleNav: Function;
	export let user;

	// props (internal)
	let lastY: number = 0;
	let hideHeader: boolean = false;
	let scrollY: number = 0;
	let mouseY = 0;

	$: mouseAtTop = mouseY < 100;
	$: isScrolledToTop = scrollY < 250;
	$: headerClasses = twMerge(
		$settings.darkTheme.value === 'normal' ? 'dark:bg-gray-800/[.9]' : 'dark:bg-gray-900/[.9]',
		$$props.class,
		isScrolledToTop
			? 'lg:shadow-none lg:dark:shadow-none lg:bg-transparent lg:dark:bg-transparent'
			: '',
		hideHeader && !mouseAtTop && !isScrolledToTop
			? 'translate-y-full lg:-translate-y-full'
			: 'translate-y-0'
	);
	$: logoClasses = twMerge(
		'transition-all duration-200 rounded-[.25rem] h-[3.5rem] p-[.5rem] ml-[-.5rem] outline-none ring ring-transparent focus:ring-primary-500/[.3]  lg:p-[.5rem] lg:ml-[-.5rem]',
		isScrolledToTop ? 'lg:h-[4.5rem]' : 'lg:h-[3.5rem]'
	);
	$: if (scrollY) {
		if (scrollY > lastY) hideHeader = true;
		if (scrollY <= lastY) hideHeader = false;
		lastY = scrollY;
	}
	$: primaryClasses = twMerge(
		$theme.button,
		'whitespace-nowrap font-normal hidden lg:block before:hidden hover:from-primary-600 hover:to-primary-600'
	);
	$: secondaryClasses = twMerge(
		$theme.button,
		'font-normal py-[calc(.5rem_-_2px)] hidden lg:block from-transparent to-transparent bg-transparent hover:bg-transparent focus:bg-transparent before:hidden text-current border-2 border-gray-700/[.5] dark:border-white/[.5] hover:border-gray-700 focus:border-gray-700 dark:hover:border-white dark:focus:border-white focus:ring-transparent'
	);
</script>

<svelte:window bind:scrollY on:mousemove={mousemoveHandler} />

<Nav.Button bind:isOpen {hideHeader} {toggleNav} />

<Header class={headerClasses}>
	<Container>
		<div class="flex justify-between items-center">
			<svelte:component this={$page.url.pathname === '/' ? Div : A} class={logoClasses} href="/">
				<Logo />
			</svelte:component>
			<Nav.Menu {closeNav} />

			{#if !user}
				<div class="flex space-x-[1rem] items-center">
					<A class={secondaryClasses} href="/sign-up">Sign Up</A>
					<A class={primaryClasses} href="/sign-in">Sign In</A>
				</div>
			{:else}
				<div class="flex space-x-[1rem] items-center">
					<form action="/logout" method="POST" use:enhance>
						<Button class={secondaryClasses} href="/sign-up" type="submit">Log Out</Button>
					</form>
					<A class={primaryClasses} href="/sign-in">My Account</A>
				</div>
			{/if}
		</div>
	</Container>
</Header>
