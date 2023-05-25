<script lang="ts">
	import { theme } from 'sveltewind/stores';
	import { A, Container, H1, Logo, P, Section } from '$components';
	import { PUBLIC_BASE_PATH } from '$env/static/public';
</script>

<Section>
	<Container>
		<div class="flex flex-col items-start space-y-[2rem]">
			<div class="w-[10rem] pb-[2rem]">
				<Logo />
			</div>
			<H1>{'{{code}}'}</H1>
			<P>Please use the code above to verify your email</P>
			<A class={$theme.button} href="{'{{PUBLIC_BASE_PATH}}'}/verify-email?user_id={'{{user_id}}'}"
				>Verify Email</A
			>
		</div>
	</Container>
</Section>
