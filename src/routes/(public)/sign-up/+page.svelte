<script lang="ts">
	import { slide } from 'svelte/transition';
	import { Button, Container, Fieldset, Form, Input, H2, Section } from '$components';

	// props (internal)
	let email = '';
	let password = '';

	// props (external)
	export let form: { email?: string; error?: { code: number; message: string }; password?: string };

	$: if (form?.email) {
		email = form.email;
		delete form.email;
	}
	$: if (form?.password) {
		password = form.password;
		delete form.password;
	}
</script>

<Section class="min-h-[100dvh] justify-center">
	<Container>
		<Form class="max-w-sm mx-auto">
			<H2>Sign Up</H2>
			<Fieldset legend="Email">
				<Input bind:value={email} name="email" required type="email" />
				{#if form?.error?.code === 409}
					<div class="text-red-500" transition:slide>{form.error.message}</div>
				{/if}
			</Fieldset>
			<Fieldset legend="Password">
				<Input bind:value={password} name="password" required type="password" />
			</Fieldset>
			<Button type="submit">Sign Up</Button>
		</Form>
	</Container>
</Section>
