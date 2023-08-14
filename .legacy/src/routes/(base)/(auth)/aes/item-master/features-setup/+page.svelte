<script lang="ts">
	import { Checkbox, DataTable, Select } from '$components';

	// props (external)
	export let data = { rows: [] };

	// props (internal)
	let columns = [
		{ field: 'featureid', title: 'ID' },
		{ field: 'description', title: 'Description' },
		{
			component: Select,
			field: 'type',
			title: 'Type',
			props: {
				options: [
					{ label: 'B', value: 'B' },
					{ label: 'F', value: 'F' }
				]
			}
		},
		{ field: 'sequence', title: 'Seq', searchable: false },
		{ component: Checkbox, field: 'printable', title: 'Printable' }
	];
</script>

<DataTable bind:columns rows={data?.rows || []} />
