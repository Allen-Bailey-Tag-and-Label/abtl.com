<script lang="ts">
	import { theme } from 'sveltewind/stores';
	import { twMerge } from 'tailwind-merge';
	import { page } from '$app/stores';
	import { A, Div, Icon, Icons, Popover } from '$components';

	// props (internal)
	let isOpen = false;

	// props (external)
	export let closeNav: Function = () => {};
	export let href: string = '';
	export let sub: undefined | boolean = undefined;
	export let tabindex: number | null | undefined = undefined;

	$: classes = twMerge(
		$theme.button,
		$theme.a,
		// 'whitespace-nowrap bg-transparent hover:bg-transparent focus:bg-transparent w-full justify-start text-[1.5rem] lg:text-[1rem] focus:before:w-0',
		'w-full justify-start text-[1.5rem] lg:text-[1rem] hover:text-current focus:text-current rounded-none focus:rounded-full bg-no-repeat whitespace-nowrap bg-transparent hover:bg-transparent focus:bg-transparent bg-[length:0px_2px] hover:bg-[length:100%_2px]',
		$page.url.pathname === href ? 'bg-[length:100%_2px]' : '',
		$$props.class
	);
</script>

{#if sub === undefined}
	<svelte:component
		this={$page.url.pathname === href ? Div : A}
		class={classes}
		href={$page.url.pathname === href ? undefined : href}
		on:click={$page.url.pathname === href ? undefined : closeNav}
		tabindex={$page.url.pathname === href ? -1 : tabindex}
	>
		<slot />
	</svelte:component>
{/if}

{#if sub !== undefined}
	<div
		class="hidden relative lg:flex flex-col lg:flex-row items-stretch lg:items-center w-full"
		on:mouseenter={() => (isOpen = true)}
		on:mouseleave={() => (isOpen = false)}
	>
		<div class="{classes} font-semibold">
			<slot />
			<Icon
				class="lg:w-[1rem] lg:h-[1rem] ml-[.5rem] transition duration-200 {!isOpen
					? 'rotate-0'
					: 'rotate-180'}"
				src={Icons.ChevronDown}
			/>
		</div>
		<Popover
			bind:isOpen
			class="relative lg:absolute shadow-none dark:shadow-none ring-0 dark:ring-0 p-0 pl-[1rem] lg:shadow lg:dark:shadow-black/[.5] lg:pl-0 lg:py-[.5rem]"
		>
			{#if isOpen}
				{#each sub as { text, ...item }}
					<svelte:self {...item}>{text}</svelte:self>
				{/each}
			{/if}
		</Popover>
	</div>
	<button
		class="flex relative lg:hidden flex-col lg:flex-row items-stretch lg:items-center w-full"
		on:click={() => (isOpen = !isOpen)}
	>
		<div class="{classes} font-semibold">
			<slot />
			<Icon
				class="lg:w-[1rem] lg:h-[1rem] ml-[.5rem] transition duration-200 {!isOpen
					? 'rotate-0'
					: 'rotate-180'}"
				src={Icons.ChevronDown}
			/>
		</div>
		<Popover
			bind:isOpen
			class="relative lg:absolute shadow-none dark:shadow-none ring-0 dark:ring-0 p-0 pl-[1rem] lg:shadow lg:dark:shadow-black/[.5] lg:pl-0 lg:py-[.5rem] lg:bg-gray-50/[.95] lg:dark:bg-gray-800/[.9] lg:backdrop-blur"
		>
			{#if isOpen}
				{#each sub as { text, ...item }}
					<svelte:self {...item}>{text}</svelte:self>
				{/each}
			{/if}
		</Popover>
	</button>
{/if}
