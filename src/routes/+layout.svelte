<script lang="ts">
	import './layout.css';
	import { asset } from '$app/paths';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" type="image/png" href={asset('/images/cookie-64-64px.png')} /></svelte:head>

<div class="relative h-screen w-screen overflow-hidden bg-navy">
	<img src={asset('/images/sunburst-bg.png')} alt="" aria-hidden="true" class="absolute inset-0 h-full w-full object-cover" />
	<img src={asset('/images/colorburst-rays.png')} alt="" aria-hidden="true" class="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-screen" />
	{@render children()}
</div>
