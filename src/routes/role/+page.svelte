<script lang="ts">
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { asset } from '$app/paths';
	import socket from '$lib/socket';
	import { playerStore, lobbyStatus } from '$lib/stores/player';

	let joining = $state<'player' | 'audience' | null>(null);

	const canPlay = $derived($lobbyStatus.known && $lobbyStatus.canJoinAsPlayer);
	const spotsLeft = $derived(Math.max($lobbyStatus.maxPlayerCount - $lobbyStatus.playerCount, 0));

	onMount(() => {
		// The game answers on its own when we join the lobby; ask again after a page refresh.
		if (!get(lobbyStatus).known) socket?.emit('lobby-status-requested');

		// Someone took the last spot first: the game also sends the new status, which hides PLAY.
		const onJoinRejected = () => (joining = null);
		socket?.on('join-rejected', onJoinRejected);
		return () => socket?.off('join-rejected', onJoinRejected);
	});

	function joinAsPlayer() {
		joining = 'player';
		socket?.emit('new-player', { name: $playerStore.name });
	}

	function joinAsAudience() {
		joining = 'audience';
		socket?.emit('new-spectator', { name: $playerStore.name });
	}
</script>

<!-- Corner accents -->
<img src={asset('/images/burst-orange.png')}  alt="" aria-hidden="true" class="absolute -top-16 -right-16 h-56 w-56 opacity-80" />
<img src={asset('/images/burst-teal.png')}    alt="" aria-hidden="true" class="absolute -bottom-12 -left-12 h-56 w-56 opacity-80" />
<img src={asset('/images/star-yellow.png')}   alt="" aria-hidden="true" class="absolute top-8 left-12 h-10 w-10 rotate-12 opacity-90" />
<img src={asset('/images/star-magenta.png')}  alt="" aria-hidden="true" class="absolute bottom-16 right-16 h-8 w-8 -rotate-6 opacity-80" />

<!-- Center card -->
<div class="relative z-10 flex h-full items-center justify-center px-4">
	<div class="w-full max-w-md rounded-3xl border-4 border-game-yellow bg-navy/90 px-8 py-10 shadow-[0_8px_0_#8a7000] backdrop-blur-sm flex flex-col gap-6 text-center">

		<!-- Cookie icon -->
		<div class="flex justify-center">
			<img
				src={asset('/images/cookie.svg')}
				alt="Cookie"
				class="pixel-perfect h-16 w-16 drop-shadow-[0_4px_0_#7a3a14]"
			/>
		</div>

		<div>
			<p class="mb-1 font-limelight text-xs tracking-[0.25em] text-teal uppercase">
				WELCOME, {$playerStore.name}
			</p>
			<p class="font-boogaloo text-3xl text-game-yellow drop-shadow-[0_2px_0_#8a7000]">
				HOW DO YOU WANT TO JOIN?
			</p>
		</div>

		<!-- Divider -->
		<div class="h-px bg-gradient-to-r from-transparent via-game-yellow/40 to-transparent"></div>

		<div class="flex flex-col gap-4">
			{#if !$lobbyStatus.known}
				<button type="button" disabled class="btn">CHECKING FOR A FREE SPOT…</button>
			{:else if canPlay}
				<button type="button" onclick={joinAsPlayer} disabled={joining !== null} class="btn">
					{joining === 'player' ? 'JOINING…' : 'PLAY'}
				</button>
				<p class="-mt-2 font-boogaloo text-lg text-cream/80">
					{spotsLeft} player {spotsLeft === 1 ? 'spot' : 'spots'} left
				</p>
			{:else}
				<p class="font-boogaloo text-xl text-cream">
					{#if $lobbyStatus.gameStarted}
						The show has already started!
					{:else}
						All {$lobbyStatus.maxPlayerCount} player spots are taken!
					{/if}
					Come cheer from the audience.
				</p>
			{/if}

			<button type="button" onclick={joinAsAudience} disabled={joining !== null} class="btn btn-secondary">
				{joining === 'audience' ? 'JOINING…' : 'CHEER'}
			</button>
			<p class="-mt-2 font-boogaloo text-lg text-cream/80">
				Sit in the audience and send messages to the big screen
			</p>
		</div>

	</div>
</div>
