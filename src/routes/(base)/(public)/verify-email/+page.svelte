<script lang="ts">
	import { slide } from 'svelte/transition';
	import { page } from '$app/stores';
	import {
		Button,
		Container,
		Fieldset,
		Form,
		Input,
		H2,
		P,
		ProgressIndicator,
		Section
	} from '$components';

	// props (internal)
	let code = '';
	let user_id: string | null = '';

	// props (external)
	export let form: { code?: string; error?: { code: number; message: string }; user_id?: string };

	$: if (form?.code) {
		code = form.code;
		delete form.code;
	}
	$: if (form?.user_id) {
		user_id = form.user_id;
		delete form.user_id;
	}
	$: if ($page) {
		user_id = $page.url.searchParams.get('user_id');
	}
</script>

<Section class="min-h-[100dvh] justify-center">
	<Container>
		<Form class="max-w-sm mx-auto" let:submitted showButton={user_id !== null && user_id !== ''}>
			{#if user_id === null || user_id === ''}
				<H2>Verify Email</H2>
				<P>Thank you for signing up. Please check your email for a verification code.</P>
			{:else}
				<H2>Verify Email</H2>
				<P>Please enter your verification code below.</P>
				<Fieldset legend="Code">
					<Input bind:value={code} class="hidden lg:flex" name="code" required type="number" />
					<Input bind:value={code} class="flex lg:hidden" name="code" required type="tel" />
				</Fieldset>
				{#if form?.error}
					<div class="text-red-500" transition:slide>{form.error.message}</div>
				{/if}
				{#if user_id}
					<Input class="hidden" name="user_id" type="hidden" value={user_id} />
				{/if}
			{/if}
			<svelte:fragment slot="submit">Verify</svelte:fragment>
		</Form>
	</Container>
</Section>
