<script lang="ts">
	import { browser } from '$app/environment';
	import { clickOutside } from '$actions';
	import { Button, Card, Checkbox, Icon, Icons, Input, Select } from '$components';
	import settings from './settings';

	// props (internal)
	let isOpen = false;

	$: if (browser && $settings.darkTheme.value) {
		document.body.classList.add(
			...($settings.darkTheme.value === 'normal'
				? ['text-gray-800', 'dark:bg-gray-800']
				: ['text-gray-900', 'dark:bg-gray-900'])
		);
		document.body.classList.remove(
			...($settings.darkTheme.value === 'extra-dark'
				? ['text-gray-800', 'dark:bg-gray-800']
				: ['text-gray-900', 'dark:bg-gray-900'])
		);
	}
</script>

<aside
	class="z-[1] hidden lg:flex items-end fixed bottom-[1rem] right-[1rem] transition duration-200 {!isOpen
		? 'translate-x-[calc(100%_-_1.5rem)]'
		: 'translate-x-0'}"
	use:clickOutside={() => (isOpen = false)}
>
	<Button
		class="rounded-tr-none rounded-br-none"
		on:click={() => (isOpen = !isOpen)}
		variant="icon"
	>
		<Icon
			class="transition duration-200 {!isOpen ? 'rotate-0' : 'rotate-180'}"
			src={Icons.ChevronLeft}
		/>
	</Button>
	<Card class="grid grid-cols-[fit-content(1rem)_1fr] gap-[.5rem]">
		{#each Object.keys($settings) as key}
			<div>{key}</div>
			{#if $settings[key] === true || $settings[key] === false}
				<Checkbox bind:checked={$settings[key]} />
			{:else if $settings[key]?.options?.length > 0}
				<Select
					class="py-0"
					options={$settings[key].options.map((label) => {
						return { label, value: label };
					})}
					bind:value={$settings[key].value}
				/>
			{:else}
				<Input bind:value={$settings[key]} class="py-0" />
			{/if}
		{/each}
	</Card>
</aside>
