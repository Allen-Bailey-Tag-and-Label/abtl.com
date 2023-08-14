<script lang="ts">
	import { Icons } from '$components';
	import type { Columns, Filters } from '../types';
	import FilterItem from './FilterItem.svelte';
	import ToolbarButton from './ToolbarButton.svelte';

	// props (external)
	export let columns: Columns = [];
	export let filters: Filters = undefined;
	export let filterable: boolean | undefined = undefined;

	// props (internal)
	let isOpen = false;

	$: columnOptions = [
		{ label: '', value: '' },
		...[...columns].map(({ field, title }) => {
			return { label: title, value: field };
		})
	];
	$: if ([...filters].filter((filter) => filter.column === '' || filter.logic === '').length === 0)
		filters = [...filters, { column: '', logic: '', value: '' }];
</script>

{#if filterable}
	<ToolbarButton
		bind:isOpen
		class="grid grid-cols-[repeat(4,_fit-content(1rem))] gap-x-[.5rem] gap-y-[.5rem]"
		src={Icons.Funnel}
	>
		{#each filters as filter, i}
			<FilterItem
				bind:column={filter.column}
				bind:filters
				bind:logic={filter.logic}
				bind:value={filter.value}
				{columnOptions}
				{i}
			/>
		{/each}
	</ToolbarButton>
{/if}
