<script lang="ts">
	import { getEvents } from 'sveltewind/actions';
	import { Form } from 'sveltewind/components';
	import { current_component } from 'svelte/internal';
	import { twMerge } from 'tailwind-merge';
	import { applyAction, enhance } from '$app/forms';
	import { Button, ProgressIndicator } from '$components';

	// props (internal)
	const events = getEvents(current_component);
	let submitted = false;

	// props (external)
	export let showButton: boolean = true;
	export let style: undefined | string = undefined;
	export let submitButton: undefined | string = 'Submit';
	export let use: any[] = [
		[
			enhance,
			() => {
				submitted = true;

				return async ({ result }) => {
					submitted = false;
					await applyAction(result);
				};
			}
		]
	];

	// props (dynamic)
	$: classes = twMerge($$props.class);
</script>

<Form {...$$restProps} class={classes} {style} use={[events, ...use]}>
	<slot />
	{#if showButton}
		<Button disabled={submitted ? 'disabled' : undefined} type="submit">
			{#if submitted}
				<ProgressIndicator class="h-[1.5rem]" />
			{:else}
				<slot name="submit">Submit</slot>
			{/if}
		</Button>
	{/if}
</Form>
