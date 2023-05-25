<script lang="ts">
	import { slide } from 'svelte/transition';
	import { page } from '$app/stores';
	import { Container, Fieldset, Form, Input, H2, P, Section } from '$components';

	// props (external)
	export let data;
	export let form: { code?: string; error?: { code: number; message: string }; user_id?: string };

	// props (internal)
	let password = '';
	let passwordVerify = '';

	$: if (form?.password) {
		password = form.password;
		delete form.password;
	}
	$: if (form?.passwordVerify) {
		passwordVerify = form.passwordVerify;
		delete form.passwordVerify;
	}
</script>

<Section class="min-h-[100dvh] justify-center">
	<Container>
		<Form class="max-w-sm mx-auto" let:submitted showButton={data?.code ? true : false}>
			<H2>Verify Password</H2>
			{#if data?.message}
				<div>{data?.message}</div>
			{/if}
			{#if data?.error}
				<div>{data?.error?.message}</div>
			{/if}
			{#if form?.error?.code === 404}
				<div class="text-red-500">{form?.error?.message}</div>
			{/if}
			{#if data?.code && data?.user_id}
				<Fieldset legend="Password">
					<Input bind:value={password} name="password" required type="password" />
					{#if form?.error?.code === 401}
						<div class="text-red-500" transition:slide>{form.error.message}</div>
					{/if}
				</Fieldset>
				<Fieldset legend="Password Verify">
					<Input bind:value={passwordVerify} name="passwordVerify" required type="password" />
					{#if form?.error?.code === 401}
						<div class="text-red-500" transition:slide>{form.error.message}</div>
					{/if}
				</Fieldset>
				<Input class="hidden" name="code" type="hidden" value={data?.code} />
				<Input class="hidden" name="user_id" type="hidden" value={data?.user_id} />
			{/if}
			<svelte:fragment slot="submit">Reset Password</svelte:fragment>
		</Form>
	</Container>
</Section>
