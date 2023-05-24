<script lang="ts">
	import { clickOutside } from '$actions';
	import { Button, Card, Icon, Icons } from '$components';
	import { browser } from '$app/environment';

	// props (internal)
	let isOpen = false;
	let html = '';

	$: if (browser) {
		html = `<html>${document.documentElement.innerHTML}</html>`;
	}
</script>

<slot />
<aside
	class="z-[1] hidden lg:flex items-end fixed bottom-[1rem] right-[1rem] transition duration-200 {!isOpen
		? 'translate-x-[calc(100%_-_1.5rem)]'
		: 'translate-x-0'}"
	use:clickOutside={() => (isOpen = false)}
>
	<Button
		class="rounded-tr-none rounded-br-none"
		on:click={() => (isOpen = !isOpen)}
		variant="icon"
	>
		<Icon
			class="transition duration-200 {!isOpen ? 'rotate-0' : 'rotate-180'}"
			src={Icons.ChevronLeft}
		/>
	</Button>
	<Card class="max-h-[100dvh] overflow-y-auto">
		{html}
	</Card>
</aside>
