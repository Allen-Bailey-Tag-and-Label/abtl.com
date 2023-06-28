<script lang="ts">
	import Confetti from './Confetti.svelte';
	import Customizer from './Customizer.svelte';
	import settings from './settings';
</script>

{#if $settings.confettiShow}
	<Confetti />
{/if}

<Customizer />
<slot />
