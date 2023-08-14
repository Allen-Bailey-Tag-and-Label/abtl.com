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
	<Toolbar class="py-[.5rem] px-[.5rem] items-center justify-between">
		<div class="items-center space-x-[1rem] hidden mr-[2rem] lg:flex">
			<Label class="whitespace-nowrap">Showing rows</Label>
			<Select bind:value={page} class="text-right" options={paginateOptions} />
			<Label class="whitespace-nowrap">of {rows.length}</Label>
		</div>
		<div class="hidden items-center space-x-[.5rem] lg:flex">
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
		<div class="flex items-center justify-between w-full lg:hidden">
			<div class="flex space-x-[.5rem]">
				{#if page > 0}
					<ToolbarButton.default on:click={() => (page = 0)} src={Icons.ChevronDoubleLeft} />
					<ToolbarButton.default on:click={() => (page = page - 1)} src={Icons.ChevronLeft} />
				{/if}
			</div>
			<Select bind:value={page} class="text-right" options={paginateOptions} />
			<div class="flex space-x-[.5rem]">
				{#if page < totalPages - 1}
					<ToolbarButton.default on:click={() => (page = page + 1)} src={Icons.ChevronRight} />
					<ToolbarButton.default
						on:click={() => (page = totalPages - 1)}
						src={Icons.ChevronDoubleRight}
					/>
				{/if}
			</div>
		</div>
	</Toolbar>
{/if}
