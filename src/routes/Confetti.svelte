<script lang="ts">
	import { Confetti } from '$components';
	import { onMount } from 'svelte';
	import settings from './settings';

	// utilities
	const initConfetti = () =>
		[...Array(+$settings.confettiCount)].map((_) => {
			return {
				blur: 0,
				colorClass: ['text-primary-500', 'text-secondary-500', 'text-tertiary-500'][
					Math.floor(Math.random() * 3)
				],
				opacity: 1,
				rotate: Math.random() * 360,
				transitionDuration: Math.floor(Math.random() * 1000) + 1000,
				x: Math.floor(Math.random() * $settings.confettiXScale * 2) - $settings.confettiXScale,
				y: Math.floor(Math.random() * $settings.confettiYScale * 2) - $settings.confettiYScale,
				z: -100000
			};
		});
	const updateConfetti = () => {
		tags = tags.map((tag) => {
			const z = Math.floor(Math.random() * $settings.confettiZScale * 4);
			return {
				...tag,
				blur: z * 0.01 + 0,
				rotate: Math.random() * 360,
				opacity: 0.3,
				z
			};
		});
	};

	// props (internal)
	let scrollY: number = 0;
	let tags: {
		blur: number;
		colorClass: string;
		opacity: number;
		rotate: number;
		transitionDuration: number;
		x: number;
		y: number;
		z: number;
	}[] = initConfetti();

	$: if ($settings.confettiCount || $settings.confettiShow) tags = initConfetti();
	$: if ($settings.confettiXScale || $settings.confettiYScale || $settings.confettiZScale)
		updateConfetti();

	onMount(() => {
		updateConfetti();
	});
</script>

<svelte:window bind:scrollY />

{#each tags as { colorClass, ...tag }}
	<Confetti {...tag} class={colorClass} {scrollY} />
{/each}
