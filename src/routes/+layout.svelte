<script lang="ts">
	import './layout.css';
	import { asset } from '$app/paths';
	import '$lib/liveNavigation';
	import ConnectionBanner from '$lib/components/ConnectionBanner.svelte';
	import { avatarUrl, isAvatar } from '$lib/avatars';
	import { playerStore } from '$lib/stores/player';

	let { children } = $props();

	// The browser tab shows the player's own cookie once they picked one.
	const icon = $derived(
		isAvatar($playerStore.avatar) ? avatarUrl($playerStore.avatar) : asset('/images/cookie.svg')
	);
</script>

<svelte:head><link rel="icon" href={icon} /></svelte:head>

<div class="relative h-dvh w-screen overflow-hidden">
	<ConnectionBanner />
	{@render children()}
</div>
