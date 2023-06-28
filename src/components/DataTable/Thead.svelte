<script lang="ts">
	import { Icon, Icons, Th, Thead } from '$components';
	import type { Columns } from './types';

	// props (external)
	export let columns: Columns = [];
	export let sortOrder: number = 1;
	export let sortField: string | undefined = undefined;
</script>

<Thead>
	{#each columns as { title, field, sortable }}
		<Th
			class="transition duration-200 {sortable
				? 'cursor-pointer hover:bg-primary-500 dark:hover:bg-primary-500 hover:text-white'
				: ''}"
			on:click={() => {
				if (sortable) {
					if (sortField === field) sortOrder = sortOrder * -1;
					if (sortField !== field) sortOrder = 1;
					sortField = field;
				}
			}}
		>
			<div class="flex items-center space-x-[1rem]">
				<div>
					{title}
				</div>
				{#if sortField === field}
					<Icon
						class="h-[1.25rem] w-[1.25rem] transition duration-200 {sortOrder === 1
							? 'rotate-0'
							: 'rotate-180'}"
						src={Icons.ChevronDown}
					/>
				{/if}
			</div>
		</Th>
	{/each}
</Thead>
