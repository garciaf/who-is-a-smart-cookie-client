<script lang="ts">
	import './layout.css';
	import { asset } from '$app/paths';
	import '$lib/liveNavigation';
	import ConnectionBanner from '$lib/components/ConnectionBanner.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" type="image/png" href={asset('/images/cookie.svg')} /></svelte:head>

<div class="relative h-dvh w-screen overflow-hidden bg-navy">
	<ConnectionBanner />
	{@render children()}
</div>
