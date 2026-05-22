<script lang="ts">
	import './layout.css';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" type="image/png" href="/images/cookie-64-64px.png" /></svelte:head>

<div class="relative h-screen w-screen overflow-hidden bg-navy">
	<img src="/images/sunburst-bg.png" alt="" aria-hidden="true" class="absolute inset-0 h-full w-full object-cover" />
	<img src="/images/colorburst-rays.png" alt="" aria-hidden="true" class="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-screen" />
	{@render children()}
</div>
