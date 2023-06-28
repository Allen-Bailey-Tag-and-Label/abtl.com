<script lang="ts">
	import { Icons, Label, Select, Toolbar, ToolbarButton } from '$components';
	import type { Rows } from './types';

	// props (external)
	export let page: number = 1;
	export let paginate: boolean = true;
	export let rows: Rows = [];
	export let rowPaginateCount: number = 10;

	// props (dynamic)
	$: if (page * rowPaginateCount > rows.length)
		page = Math.ceil(rows.length / rowPaginateCount) - 1;
	$: totalPages = Math.ceil(rows.length / rowPaginateCount);
	$: paginateOptions =
		rowPaginateCount < 1
			? []
			: [...Array(totalPages)].map((_, i) => {
					return {
						label: `${i * rowPaginateCount + 1}-${Math.min(
							(i + 1) * rowPaginateCount,
							rows.length
						)}`,
						value: i
					};
			  });
</script>

{#if paginate}
	<Toolbar class="py-[.5rem] px-[.5rem] space-x-[2rem] items-center justify-between">
		<div class="flex items-center space-x-[1rem]">
			<Label>Showing rows</Label>
			<Select bind:value={page} class="text-right" options={paginateOptions} />
		</div>
		<div class="flex items-center space-x-[.5rem]">
			{#if page > 0}
				<ToolbarButton.default on:click={() => (page = 0)} src={Icons.ChevronDoubleLeft} />
				<ToolbarButton.default on:click={() => (page = page - 1)} src={Icons.ChevronLeft} />
			{/if}
			{#if page < totalPages - 1}
				<ToolbarButton.default on:click={() => (page = page + 1)} src={Icons.ChevronRight} />
				<ToolbarButton.default
					on:click={() => (page = totalPages - 1)}
					src={Icons.ChevronDoubleRight}
				/>
			{/if}
		</div>
	</Toolbar>
{/if}
