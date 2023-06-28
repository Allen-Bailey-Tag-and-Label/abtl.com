<script lang="ts">
	import { clickOutside } from '$actions';
	import { Card, Icons, Input, Label, Popover, ToolbarButton } from '$components';
	import { theme } from 'sveltewind/stores';
	import { twMerge } from 'tailwind-merge';

	// props (external)
	export let rowPaginateCount: number = 10;

	// props (internal)
	let isOpen = false;

	$: classes = twMerge($theme.toolbar, $$props.class);
</script>

<Card class={classes}>
	<div class="relative" use:clickOutside={() => (isOpen = false)}>
		<ToolbarButton.default on:click={() => (isOpen = !isOpen)} src={Icons.Cog6Tooth} />
		<Popover bind:isOpen class="bottom-[-.5rem]" position="br">
			<div class="flex items-center space-x-[1rem]">
				<Label class="whitespace-nowrap">Rows per page</Label>
				<Input bind:value={rowPaginateCount} class="text-right w-[6rem]" type="number" />
			</div>
		</Popover>
	</div>
</Card>
