<script lang="ts">
	import { connectionStatus } from '$lib/stores/player';

	let status = $derived($connectionStatus);
	// Gate on reconnecting/lastError rather than !connected so the banner doesn't
	// flash during the normal initial connection on page load.
	let visible = $derived(status.reconnecting || !!status.lastError);
</script>

{#if visible}
	<div
		class="absolute inset-x-0 top-0 z-50 flex items-center justify-center gap-2 px-4 py-2 text-center font-paytone text-sm text-cream"
		class:bg-game-orange-dark={status.reconnecting}
		class:bg-magenta-dark={!status.reconnecting}
	>
		<span class="h-2 w-2 animate-pulse rounded-full bg-cream"></span>
		{#if status.lastError}
			Connection lost — {status.lastError}
		{:else if status.reconnecting}
			Reconnecting… (attempt {status.reconnectAttempt}/{status.maxAttempts})
		{:else}
			Connection lost
		{/if}
	</div>
{/if}
