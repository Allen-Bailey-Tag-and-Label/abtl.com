<script lang="ts">
	import { browser } from '$app/environment';
	import { Brands, Container, H2, IntersectionObserver, Section } from '$components';
	import { onMount } from 'svelte';

	// utilities
	const animate = (currentTimestamp: number) => {
		if (lastTimeStamp === undefined) lastTimeStamp = currentTimestamp;
		if (startTimestamp === undefined) startTimestamp = currentTimestamp;
		if (paused) {
			timeScale = timeScale - timeDampening;
			if (timeScale < 0) timeScale = 0;
		}
		if (!paused) {
			timeScale = timeScale + timeDampening;
			if (timeScale > timeScaleMax) timeScale = timeScaleMax;
		}
		const elapsed = currentTimestamp - lastTimeStamp;
		translateX = translateX + elapsed * timeScale;
		if (translateX > totalBrandWidth) {
			translateX = 0;
		}
		lastTimeStamp = currentTimestamp;
		window.requestAnimationFrame(animate);
	};

	// props (internal)
	let brands = Object.keys(Brands)
		.map((key) => {
			return { clientWidth: 0, component: Brands[key] };
		})
		.sort((_) => 0.5 - Math.random());
	let lastTimeStamp: undefined | number;
	let paused: boolean = false;
	let startTimestamp: undefined | number;
	let timeDampening: number = 0.003;
	let timeScale: number = 0.05;
	let timeScaleMax: number = timeScale;
	let translateX: number = 0;

	// props (dynamic)
	$: totalBrandWidth = [...brands].reduce((total, brand) => total + brand.clientWidth, 0);

	// lifecycle
	onMount(() => {
		if (browser) {
			window.requestAnimationFrame(animate);
		}
	});
</script>

<Section>
	<Container>
		<H2 class="mb-[2rem] leading-[1.25em]">Trusted by</H2>
	</Container>
	<div
		class="w-full overflow-hidden relative"
		on:mouseenter={() => (paused = true)}
		on:mouseleave={() => (paused = false)}
	>
		<div class="flex" style="transform:translateX(-{translateX}px)">
			{#each brands as { clientWidth, component }}
				<div
					bind:clientWidth
					class="h-[4rem] px-[2rem] lg:h-[5rem] flex items-center lg:px-[4rem] transition duration-200 opacity-50 hover:opacity-100"
				>
					<svelte:component this={component} />
				</div>
			{/each}
			{#each brands as { component }}
				<div
					class="h-[4rem] px-[2rem] lg:h-[5rem] flex items-center lg:px-[4rem] transition duration-200 opacity-50 hover:opacity-100"
				>
					<svelte:component this={component} />
				</div>
			{/each}
		</div>
	</div>
</Section>
