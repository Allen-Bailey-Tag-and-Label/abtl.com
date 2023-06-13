<script lang="ts">
	import { theme } from 'sveltewind/stores';
	import { A, Container, Logo, P, Section } from '$components';
	import { PUBLIC_BASE_PATH } from '$env/static/public';

	export let code = '';
	export let user_id = '';
</script>

<Section>
	<Container>
		<div class="flex flex-col items-start space-y-[2rem]">
			<div class="w-[10rem] pb-[2rem]">
				<Logo />
			</div>
			<P>Please click the link below to reset your password</P>
			<A
				class={$theme.button}
				href="{PUBLIC_BASE_PATH}/verify-password?code={code}&user_id={user_id}"
			>
				Reset Password
			</A>
		</div>
	</Container>
</Section>
