<script lang="ts">
	import { getEvents } from 'sveltewind/actions';
	import { Section } from 'sveltewind/components';
	import { current_component } from 'svelte/internal';
	import { twMerge } from 'tailwind-merge';
	import { RadialGradient } from '$components';

	// props (internal)
	const colorClasses =
		'aspect-square absolute z-[-1] w-[calc(var(--circleWidth)*2)] bg-[radial-gradient(var(--circleWidth)_circle_at_50%_50%,_var(--tw-gradient-stops))] from-primary-500/[.3] to-primary-500/[0] lg:w-[calc(var(--circleWidth)*.5)] lg:bg-[radial-gradient(calc(var(--circleWidth)*.25)_circle_at_50%_50%,_var(--tw-gradient-stops))]';

	const events = getEvents(current_component);

	// props (external)
	export let circlePosition: undefined | string | Array<string> = '';
	export let showBg: boolean = false;
	export let style: undefined | string = '--circleWidth:90vw;';
	export let use: any[] = [];

	// props (dynamic)
	$: classes = twMerge('relative', $$props.class);
	$: circlePositions =
		typeof circlePosition === 'string' ? [...circlePosition.split(' ')] : circlePosition;
</script>

<Section class={classes} {style} use={[events, ...use]}>
	<slot />
	<slot name="background">
		{#if showBg}
			<div class="h-full w-full absolute top-0 left-0 bg-primary-500 z-[-1]" />
		{/if}
	</slot>
	<slot name="circles">
		{#each circlePositions as position}
			<RadialGradient circlePosition={position} />
		{/each}
	</slot>
</Section>
