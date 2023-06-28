<script lang="ts">
	import { Button, Container, Fieldset, Form, Input, Section, Textarea } from '$components';

	// props (external)
	export let form;

	// props (internal)
	let csv = '';
	let table = '';

	$: console.log(form);
</script>

<Section class="min-h-[100dvh] justify-center">
	<Container class="flex flex-grow">
		<Form class="max-w-none flex-grow">
			<Fieldset legend="Table">
				<Input bind:value={table} name="table" />
			</Fieldset>
			<Fieldset class="flex-grow" legend="CSV">
				<Textarea bind:value={csv} class="flex-grow" name="csv" />
			</Fieldset>
			<svelte:fragment slot="submit">Insert</svelte:fragment>
		</Form>
	</Container>
</Section>
