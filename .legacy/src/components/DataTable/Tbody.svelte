<script lang="ts">
	import { Checkbox, Select, Tbody, Td, Tr } from '$components';
	import { theme } from 'sveltewind/stores';
	import type { Columns, Rows } from './types';

	// props (external)
	export let columns: Columns = [];
	export let rows: Rows = [];
	export let rowIndexStart: number | undefined = undefined;
	export let rowIndexEnd: number | undefined = undefined;
</script>

<Tbody>
	{#if rowIndexStart !== undefined && rowIndexEnd !== undefined}
		{#each rows as row, i}
			{#if i >= rowIndexStart && i < rowIndexEnd}
				<Tr>
					{#each columns as { component, editable, field, props }}
						{#if component === undefined}
							{#if editable}
								<td
									bind:innerHTML={row[field]}
									class="{$theme.td} transparent duration-200 ring-1 ring-transparent hover:ring-primary-500 focus:ring-primary-500"
									contenteditable
								/>
							{:else}
								<td class={$theme.td}>{row[field]}</td>
							{/if}
						{:else if component === Checkbox}
							<Td>
								<Checkbox bind:checked={row[field]} class="mx-auto" />
							</Td>
						{:else if component === Select}
							<Td class="py-0 px-0">
								<Select
									bind:value={row[field]}
									class="w-full rounded-none ring-offset-transparent dark:ring-offset-transparent focus:ring-transparent dark:focus:ring-transparent"
									options={props?.options}
								/>
							</Td>
						{/if}
					{/each}
				</Tr>
			{/if}
		{/each}
	{/if}
</Tbody>
