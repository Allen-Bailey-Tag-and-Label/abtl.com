<script lang="ts">
	import { Form, Icons, Radio } from '$components';
	import ToolbarButton from './ToolbarButton.svelte';

	// props (external)
	export let allowExport: boolean | undefined = undefined;

	// props (internal)
	let group = 'CSV';
	let isOpen = false;
	const radios = ['Clipboard', 'CSV', 'Excel'];
</script>

{#if allowExport}
	<ToolbarButton bind:isOpen class="space-y-[.5rem]" src={Icons.DocumentArrowDown}>
		<Form class="min-w-[15rem] max-w-none">
			{#each radios as value}
				<Radio bind:group name="exportType" {value}>
					{value}
				</Radio>
			{/each}
			<svelte:fragment slot="submit">Export</svelte:fragment>
		</Form>
	</ToolbarButton>
{/if}
