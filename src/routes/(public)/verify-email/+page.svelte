<script lang="ts">
	import { slide } from 'svelte/transition';
	import { Button, Container, Fieldset, Form, Input, H2, P, Section } from '$components';

	// props (internal)
	let code = '';

	// props (external)
	export let form;
</script>

<Section class="min-h-[100dvh] justify-center">
	<Container>
		<Form class="max-w-sm mx-auto">
			<H2>Verify Email</H2>
			<P>Thank you for signing up. Please check your email for a verification code.</P>
			<Fieldset legend="Code">
				<Input bind:value={code} class="hidden lg:flex" name="code" required type="number" />
				<Input bind:value={code} class="flex lg:hidden" name="code" required type="tel" />
			</Fieldset>
			<Button type="submit">Verify</Button>
		</Form>
	</Container>
</Section>
