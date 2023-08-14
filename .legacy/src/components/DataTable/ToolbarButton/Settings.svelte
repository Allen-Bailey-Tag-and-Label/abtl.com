<script lang="ts">
	import { Icons, Input, Label } from '$components';
	import ToolbarButton from './ToolbarButton.svelte';

	// props (external)
	export let allowPaginateCountSetting: boolean | undefined = undefined;
	export let rowPaginateCount: number = 10;

	// props (internal)
	let isOpen = false;

	$: twoColumnGridClasses = 'grid grid-cols-[repeat(2,_fit-content(1rem))] gap-[1rem] items-center';
</script>

{#if allowPaginateCountSetting}
	<ToolbarButton bind:isOpen class={twoColumnGridClasses} src={Icons.Cog6Tooth}>
		<Label class="whitespace-nowrap">Rows per page</Label>
		<Input
			bind:value={rowPaginateCount}
			class="text-right w-[6rem] hidden lg:block"
			type="number"
		/>
		<Input bind:value={rowPaginateCount} class="text-right w-[6rem] blaock lg:hidden" type="tel" />
	</ToolbarButton>
{/if}
