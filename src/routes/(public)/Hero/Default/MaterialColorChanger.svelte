<script lang="ts">
	import { onMount } from 'svelte';
	import { paperColors } from '$lib/utilities';

	// handlers
	const updateIndex = () => {
		currentIndex = (currentIndex + 1) % Object.keys(paperColors).length;
		setTimeout(updateIndex, delay);
	};

	// props (internal)
	export let currentIndex: number = Math.floor(Math.random() * Object.keys(paperColors).length);
	export let delay = 1000;
	export let inkClass: string = '';
	export let materialKeys = Object.keys(paperColors);
	export let materials = Object.values(paperColors).map(({ classes: { fill } }) => fill);
	export let materialClass: string = '';

	// props (dynamic)
	$: if (currentIndex) {
		materialClass = materials[currentIndex];
		inkClass = 'fill-[#CE162D]';
		const materialKey = materialKeys[currentIndex];
		if (['red', 'fluorescent-pink', 'fluorescent-red'].includes(materialKey))
			inkClass = 'fill-[#231F20]';
	}

	onMount(() => {
		setTimeout(updateIndex, delay);
	});
</script>
