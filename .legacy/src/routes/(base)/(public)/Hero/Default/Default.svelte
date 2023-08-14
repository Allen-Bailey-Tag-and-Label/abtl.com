<script lang="ts">
	import { Container, H1, IntersectionObserver, Section } from '$components';
	import { onMount } from 'svelte';
	import { products } from './products';
	import Product from './Product.svelte';
	import Blob from './Blob.svelte';
	import { browser } from '$app/environment';
	import settings from '../../../settings';

	// utilities
	const timer = (currentTimestamp: number) => {
		if (startTimestamp === undefined) startTimestamp = currentTimestamp;
		const elapsed = currentTimestamp - startTimestamp;
		index = Math.floor(elapsed / delay) % products.length;
		window.requestAnimationFrame(timer);
	};

	// props (internal)
	let startTimestamp: undefined | number;
	let delay = 5000;
	const delays = [
		'delay-[0ms]',
		'delay-[100ms]',
		'delay-[200ms]',
		'delay-[300ms]',
		'delay-[400ms]',
		'delay-[500ms]',
		'delay-[600ms]',
		'delay-[700ms]',
		'delay-[800ms]',
		'delay-[900ms]',
		'delay-[1000ms]',
		'delay-[1100ms]',
		'delay-[1200ms]',
		'delay-[1300ms]',
		'delay-[1400ms]'
	];
	const h1TextItems = 'Where customers turn to for their...'.split(' ');
	let index = Math.floor(Math.random() * products.length);
	const textClasses = 'text-left';

	$: productsShuffled = [...products].sort((_) => 0.5 - Math.random());

	onMount(() => {
		if (browser) {
			window.requestAnimationFrame(timer);
		}
	});
</script>

<Section class="w-full h-[100dvh] overflow-hidden relative flex items-center justify-center">
	{#if $settings.showBackground}
		<img
			alt="Background"
			class="z-[-1] pointer-events-none absolute top-0 left-0 w-full h-full object-cover opacity-[20%] dark:opacity-[10%] invert hue-rotate-180 dark:invert-0 dark:hue-rotate-0"
			src="/pexels-adrien-olichon-2387793.jpg"
		/>
		<div
			class="z-[-1] pointer-events-none absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-b from-gray-50/[0] to-gray-50 {$settings
				.darkTheme.value === 'normal'
				? 'dark:from-gray-800/[0] dark:to-gray-800'
				: 'dark:from-gray-900/[0] dark:to-gray-900'}"
		/>
	{/if}
	<Container>
		<div class="flex justify-center lg:justify-start">
			<div class="flex flex-col space-y-[0rem]">
				<H1
					class="flex flex-wrap text-[3rem] leading-[1.25em] mb-[1rem] lg:mb-[2rem] lg:text-[4rem] lg:w-[35rem]"
				>
					{#each h1TextItems as text, i}
						<IntersectionObserver
							class="mr-[1rem] lg:mr-[1.5rem] last:mr-0 lg:last:mr-0 duration-[500ms]"
							{delays}
							{i}
						>
							{text}
						</IntersectionObserver>
					{/each}
				</H1>
				<IntersectionObserver
					class="overflow-y-hidden h-[1.5em] text-[2rem] leading-[1.5em] lg:text-[3rem] duration-[500ms]"
					{delays}
					i={h1TextItems.length}
				>
					<div class="flex flex-col items-start">
						{#each productsShuffled as { description }}
							<div
								class="{textClasses} selection:bg-white selection:text-primary-500 px-[1.5rem] text-white bg-primary-500 font-semibold transition duration-200 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)]"
								style="transform:translateY({-1.5 * index}em)"
							>
								{description}
							</div>
						{/each}
					</div>
				</IntersectionObserver>
			</div>
		</div>
	</Container>
	<Blob />
	<IntersectionObserver
		class="absolute top-0 left-0 w-[100dvw] h-[100dvh] block pointer-events-none"
		{delays}
		i={h1TextItems.length + 5}
	>
		<Product {index} {productsShuffled} />
	</IntersectionObserver>
</Section>
