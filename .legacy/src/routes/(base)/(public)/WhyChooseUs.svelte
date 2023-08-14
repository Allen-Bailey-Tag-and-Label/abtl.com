<script lang="ts">
	import {
		Container,
		H2,
		Icon,
		Icons,
		IntersectionObserver,
		P,
		RadialGradient,
		Section
	} from '$components';
	import type { SvelteComponent } from 'svelte';

	// props (internal)
	const items: { icon: SvelteComponent; main: string; sub: string }[] = [
		{
			icon: Icons.AcademicCap,
			main: 'Experience',
			sub: 'Over 100 years of experience producing quality products'
		},
		{
			icon: Icons.GlobeAlt,
			main: 'Reach',
			sub: 'We serve all 50 states, Puerto Rico, Canada, Mexico and more'
		},
		{
			icon: Icons.HandShake,
			main: 'Relationships',
			sub: 'With over 2,500 active customers, our clients count on us for their tag & label needs'
		}
	];
</script>

<Section circlePosition="tl">
	<Container>
		<div class="flex flex-col xl:flex-row lg:justify-between">
			<IntersectionObserver>
				<div class="flex flex-col mb-[2rem] transition duration-[1000ms]">
					<H2 class="mb-[1.5rem] lg:whitespace-nowrap">Why choose us?</H2>
					<P class="xl:w-[25rem]">
						So, what makes us so unique? The real question is: how can we help guide you through
						your complex tag and label problems?
					</P>
				</div>
			</IntersectionObserver>
			<div
				class="flex-grow flex flex-col divide-y-2 divide-white/[.15] lg:grid lg:grid-cols-3 lg:justify-center lg:divide-y-0 lg:divide-x-2"
			>
				{#each items as { icon, main, sub }, i}
					<IntersectionObserver
						class="group flex-grow flex flex-col items-center py-[2rem] first:pt-0 last:pb-0 lg:py-0 lg:px-[2rem]"
						i={i + 1}
					>
						<div
							class="flex flex-col items-center transition duration-200 opacity-50 hover:opacity-100"
						>
							<Icon
								class="h-[10rem] w-auto transition duration-200 translate-y-0 mb-[1rem] group-hover:translate-y-[-.5rem]"
								src={icon}
							/>
							<div class="font-semibold text-[1.25rem] mb-[1rem] uppercase">{main}</div>
							<div class="px-[2rem] text-center opacity-[.7]">{sub}</div>
						</div>
					</IntersectionObserver>
				{/each}
			</div>
		</div>
	</Container>
</Section>
