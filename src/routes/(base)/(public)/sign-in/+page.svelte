<script lang="ts">
	import { slide } from 'svelte/transition';
	import {
		A,
		Button,
		Container,
		Fieldset,
		Form,
		Input,
		H2,
		ProgressIndicator,
		Section
	} from '$components';

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
		<Form let:submitted>
			<H2>Sign In</H2>
			<Fieldset legend="Email">
				<Input bind:value={email} name="email" required type="email" />
				{#if form?.error}
					<div class="text-red-500" transition:slide>{form.error.message}</div>
				{/if}
			</Fieldset>
			<Fieldset legend="Password">
				<Input bind:value={password} name="password" required type="password" />
			</Fieldset>
			<A class="self-end" href="/forgot-password">Forgot Password?</A>
			<svelte:fragment slot="submit">Sign In</svelte:fragment>
		</Form>
	</Container>
</Section>
