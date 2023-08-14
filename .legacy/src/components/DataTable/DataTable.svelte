<script lang="ts">
	import { Checkbox, Table } from '$components';
	import { onMount } from 'svelte';
	import { Pagination, Tbody, Thead, Toolbar } from './index';
	import type { Columns, Rows, Filters } from './types';
	import { twMerge } from 'tailwind-merge';

	// utilities
	const sortRows = () => {
		rows = rows.sort(
			(a, b) => (a[sortField] < b[sortField] ? -1 : a[sortField] > b[sortField] ? 1 : 0) * sortOrder
		);
	};

	// props (external)
	export let allowExport: boolean = true;
	export let allowPaginateCountSetting: boolean = true;
	export let allowSettings: boolean | undefined = undefined;
	export let columns: Columns = [];
	export let editable: boolean = true;
	export let filters: Filters = [];
	export let filterable: boolean = true;
	export let page: number = 0;
	export let paginate: boolean = true;
	export let rows: Rows = [];
	export let rowPaginateCount: number = 10;
	export let sortable: boolean = true;
	export let sortOrder: number = 1;
	export let sortField: undefined | string = undefined;

	// props (internal)
	let rowIndexStart: number = 0;
	let rowIndexEnd: number = 0;

	// props (dynamic)
	$: if (allowSettings !== undefined) {
		allowExport = allowSettings;
		allowPaginateCountSetting = allowSettings;
	}
	$: classes = twMerge('flex-grow flex flex-col max-w-full', $$props.class);
	$: rowIndexStart = paginate ? page * rowPaginateCount : 0;
	$: rowIndexEnd = paginate ? (page + 1) * rowPaginateCount : Infinity;
	$: if (sortField || sortOrder) sortRows();

	onMount(() => {
		columns = columns.map((column) => {
			// check if string supplied
			if (typeof column === 'string') return { editable, title: column, field: column };

			// check if editable missing
			if (column?.editable === undefined) column.editable = editable;

			// check if title missing
			if (column?.title === undefined) column.title = column.field;

			// check if props missing
			if (column?.props === undefined) column.props = {};

			// check if sortable missing
			if (column?.sortable === undefined) column.sortable = sortable;

			return column;
		});

		rowsOriginal = [...rows];

		if (sortable && sortField === undefined) sortField = columns[0].field;
	});
</script>

<div class={classes}>
	<Toolbar
		{allowExport}
		{allowPaginateCountSetting}
		bind:filters
		bind:rowPaginateCount
		{columns}
		{filterable}
		class="z-[3]"
	/>
	<slot>
		<div class="flex flex-grow max-w-screen overflow-auto items-start">
			<Table class="w-full">
				<slot name="thead">
					<Thead bind:sortOrder bind:sortField {columns} />
				</slot>
				<slot name="tbody">
					<Tbody bind:rowIndexEnd bind:rowIndexStart bind:rows {columns} />
				</slot>
			</Table>
		</div>
	</slot>
	<slot name="pagination">
		<Pagination bind:page bind:paginate bind:rowPaginateCount {rows} />
	</slot>
</div>
