<script lang="ts">
	// imports
	import { current_component } from 'svelte/internal';
	import { twMerge } from 'tailwind-merge';
	import { getEvents, use as useAction } from 'sveltewind/actions';
	import { theme } from 'sveltewind/stores';

	// props (internal)
	const defaultCirclePositionClasses = {
		bl: 'block bottom-[0] translate-y-1/4 left-0 -translate-x-1/4',
		br: 'block bottom-[0] translate-y-1/4 right-0 translate-x-1/4',
		c: 'block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
		tl: 'block top-[0] -translate-y-1/4 left-0 -translate-x-1/4',
		tr: 'block top-[0] -translate-y-1/4 right-0 translate-x-1/4'
	};
	const events = getEvents(current_component);

	// props (external)
	export let circlePosition: undefined | string | Array<string> = '';
	export let style: string | undefined = undefined;
	export let use: any[] = [];

	// props (dynamic)
	$: circlePositions =
		typeof circlePosition === 'string' ? [...circlePosition.split(' ')] : circlePosition;
	$: circleClasses = circlePositions.map((key) => defaultCirclePositionClasses[key]);
	$: classes = twMerge(
		'hidden aspect-square absolute z-[-1] w-[calc(var(--circleWidth)*2)] bg-[radial-gradient(var(--circleWidth)_circle_at_50%_50%,_var(--tw-gradient-stops))] from-primary-500/[.3] to-primary-500/[0] lg:w-[calc(var(--circleWidth)*.5)] lg:bg-[radial-gradient(calc(var(--circleWidth)*.25)_circle_at_50%_50%,_var(--tw-gradient-stops))]',
		$theme.radialGradient,
		...circleClasses,
		$$props.class
	);
</script>

<div class={classes} {style} use:useAction={[events, ...use]}>
	<slot />
</div>
