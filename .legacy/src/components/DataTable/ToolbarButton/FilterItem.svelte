<script lang="ts">
	import { Icons, Input, Select, ToolbarButton } from '$components';
	import type { Filters } from '../types';

	// handlers
	const deleteClickHandler = () => (filters = [...filters].filter((_, index) => i !== index));

	// props (external)
	export let column: undefined | string = undefined;
	export let columnOptions: undefined | { label: string; value: string }[] = undefined;
	export let filters: Filters = undefined;
	export let i: undefined | number = undefined;
	export let logic: undefined | string = undefined;
	export let value: undefined | string = undefined;

	// props (internal)
	const logicOptions = [
		'',
		'is',
		'is not',
		'contains',
		'does not contain',
		'starts with',
		'does not start with',
		'ends with',
		'does not end with',
		'is less than',
		'is less than or equal to',
		'is greater than',
		'is greater than or equal to'
	]
		.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
		.map((value: string) => {
			return { label: value, value };
		});

	$: if (column === '') logic = '';
	$: if (logic === '') value = '';
</script>

<div>
	{#if column !== '' && logic !== ''}
		<ToolbarButton.default
			class="bg-red-500 dark:bg-red-500 hover:bg-red-600 focus:bg-red-600 dark:hover:bg-red-600 dark:focus:bg-red-600 hover:ring-offset-red-500 focus:ring-red-500/[.3] focus:ring-offset-red-500"
			on:click={deleteClickHandler}
			src={Icons.Trash}
		/>
	{/if}
</div>
<div><Select bind:value={column} options={columnOptions} /></div>
<div>
	<Select
		bind:value={logic}
		disabled={column === '' ? 'disabled' : undefined}
		options={logicOptions}
	/>
</div>
<div>
	<Input bind:value disabled={logic === '' ? 'disabled' : undefined} />
</div>
