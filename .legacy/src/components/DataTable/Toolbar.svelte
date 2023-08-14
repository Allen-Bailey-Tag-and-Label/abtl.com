<script lang="ts">
	import { Card } from '$components';
	import { theme } from 'sveltewind/stores';
	import { twMerge } from 'tailwind-merge';
	import ToolbarButtonExport from './ToolbarButton/Export.svelte';
	import ToolbarButtonFilter from './ToolbarButton/Filter.svelte';
	import ToolbarButtonSettings from './ToolbarButton/Settings.svelte';
	import type { Columns, Filters } from './types';

	// props (external)
	export let allowExport: boolean | undefined = undefined;
	export let allowPaginateCountSetting: boolean | undefined = undefined;
	export let columns: Columns = [];
	export let filters: Filters = undefined;
	export let filterable: boolean | undefined = undefined;
	export let rowPaginateCount: number = 10;

	$: classes = twMerge($theme.toolbar, 'space-x-[.5rem]', $$props.class);
</script>

<Card class={classes}>
	<ToolbarButtonFilter bind:filters {columns} {filterable} />
	<ToolbarButtonExport {allowExport} />
	<ToolbarButtonSettings {allowPaginateCountSetting} bind:rowPaginateCount />
</Card>
