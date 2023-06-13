<script lang="ts">
	import { theme } from 'sveltewind/stores';
	import { twMerge } from 'tailwind-merge';
	import { page } from '$app/stores';
	import { A, Button, Div, Icon, Icons, Popover } from '$components';

	// props (internal)
	let isOpen = false;

	// props (external)
	export let closeNav: Function = () => {};
	export let href: string = '';
	export let sub: undefined | boolean = undefined;
	export let tabindex: number | null | undefined = undefined;
	export let type: undefined | string = undefined;

	$: classes = twMerge(
		$theme.button,
		$theme.a,
		'bg-transparent dark:bg-transparent hover:bg-transparent focus:bg-transparent hover:text-current',
		'border-none',
		'before:block before:h-[2px] before:w-0 before:hover:w-full before:focus:w-0 before:hover:h-[2px] before:focus:h-[2px] before:focus:ring-0 before:bottom-0 before:hover:bottom-0 before:focus:bottom-0 before:origin-left',
		'text-current text-[1.5rem] justify-start lg:text-[1rem]',
		$page.url.pathname === href ? 'border-primary-500' : '',
		$$props.class
	);
</script>

{#if sub === undefined}
	<svelte:component
		this={type === 'submit' ? Button : $page.url.pathname === href ? Div : A}
		class={classes}
		href={$page.url.pathname === href ? undefined : href}
		on:click={$page.url.pathname === href ? undefined : closeNav}
		tabindex={$page.url.pathname === href ? -1 : tabindex}
		type={type === 'submit' ? type : undefined}
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
