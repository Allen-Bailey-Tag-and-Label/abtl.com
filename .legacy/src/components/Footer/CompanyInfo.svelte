<script lang="ts">
	import { A, Container, Div, H2, IntersectionObserver, Section } from '$components';

	// props (internal)
	const yearsInBusiness =
		new Date(new Date() - new Date('January 1, 1911 00:00:01')).getFullYear() - 1970;

	const companyInfo = [
		{
			component: A,
			heading: 'Email',
			props: {
				href: 'mailto:sales@abtl.com'
			},
			slot: 'sales@abtl.com'
		},
		{
			component: A,
			heading: 'Phone',
			props: {
				href: 'tel:5855382324'
			},
			slot: '(585) 538-2324'
		},
		{
			component: A,
			heading: 'Address',
			props: {
				href: 'https://goo.gl/maps/Ctx4AFSmMTVLc7K47',
				target: '_blank'
			},
			slot: '3177 Lehigh Street<br />Caledonia, NY 14423'
		},
		{
			component: Div,
			heading: 'Established 1911',
			props: {
				class: 'max-w-[20rem]'
			},
			slot: `Over 100 years experience providing tags and labels for our clients`
		}
	];
</script>

<Section circlePosition="br">
	<Container>
		<div class="relative flex flex-col md:flex-row md:justify-between">
			{#each companyInfo as { component, heading, props, slot }, i}
				<IntersectionObserver
					class="flex flex-col py-[2rem] items-start first:pt-0 last:pb-0 md:py-0"
					{i}
				>
					<H2 class="pb-[1rem] mb-[1rem]">{heading}</H2>
					<svelte:component this={component} class="" {...props}>
						{@html slot}
					</svelte:component>
				</IntersectionObserver>
			{/each}
		</div>
	</Container>
</Section>
