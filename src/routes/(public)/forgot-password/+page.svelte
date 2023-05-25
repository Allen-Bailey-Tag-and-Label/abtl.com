<script lang="ts">
	import { slide } from 'svelte/transition';
	import { Container, Fieldset, Form, Input, H2, Section } from '$components';

	// props (internal)
	let email = '';

	// props (external)
	export let form: { email?: string; error?: { code: number; message: string } };

	$: if (form?.email) {
		email = form.email;
		delete form.email;
	}
</script>

<Section class="min-h-[100dvh] justify-center">
	<Container>
		<Form class="max-w-sm mx-auto" let:submitted>
			<H2>Forgot Password</H2>
			<Fieldset legend="Email">
				<Input bind:value={email} name="email" required type="email" />
				{#if form?.error}
					<div class="text-red-500" transition:slide>{form.error.message}</div>
				{/if}
			</Fieldset>
			<svelte:fragment slot="submit">Reset Password</svelte:fragment>
		</Form>
	</Container>
</Section>
