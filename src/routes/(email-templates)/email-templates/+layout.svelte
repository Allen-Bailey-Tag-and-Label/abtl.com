<script lang="ts">
	import { copyToClipboard } from '$actions';
	import { Button, Icon, Icons } from '$components';
	import { browser } from '$app/environment';

	// handlers
	const clickHandler = () => {
		if (browser) {
			const html = document.documentElement.innerHTML;
			console.log(html);
			copyToClipboard(`<html>${html}</html>`);
		}
	};

	// props (internal)
	let isOpen = false;
</script>

<slot />
<Button class="fixed bottom-[1rem] right-[1rem]" on:click={clickHandler} variant="icon">
	<Icon
		class="transition duration-200 {!isOpen ? 'rotate-0' : 'rotate-180'}"
		src={Icons.Clipboard}
	/>
</Button>
