<script lang="ts">
	import { Checkbox, Input, Label, Select, Toolbar } from '$components';
	import type { Columns } from './types';

	// props (external)
	export let columns: Columns = [];

	// props (dynamic)
	$: searchableColumns = [...columns].filter(
		(column) => typeof column !== 'string' && column?.searchable
	);
</script>

{#if searchableColumns.length > 0}
	<Toolbar class="flex py-[.5rem] px-[.5rem] space-x-[2rem]">
		{#each columns as { component, title, props, search, searchable }}
			{#if searchable}
				<div class="flex items-center space-x-[1rem]">
					<Label>{title}</Label>
					{#if component === undefined}
						<Input bind:value={search} class="w-[10rem]" />
					{:else if component === Checkbox}
						<Checkbox bind:checked={search} />
					{:else if component === Select}
						<Select bind:value={search} options={[{ label: '', value: '' }, ...props?.options]} />
					{/if}
				</div>
			{/if}
		{/each}
	</Toolbar>
{/if}
