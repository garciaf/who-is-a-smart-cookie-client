<script lang="ts">
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import socket from '$lib/socket';
	import { playerStore, lobbyStatus } from '$lib/stores/player';
	import { avatarUrl, isAvatar, randomFreeAvatar } from '$lib/avatars';
	import AvatarPicker from '$lib/components/AvatarPicker.svelte';
	import PlayerCookie from '$lib/components/PlayerCookie.svelte';

	let joining = $state<'player' | 'audience' | null>(null);
	// Starts on the cookie picked last time (after a refresh), or a random free one.
	let avatar = $state(isAvatar(get(playerStore).avatar) ? get(playerStore).avatar : '');

	const canPlay = $derived($lobbyStatus.known && $lobbyStatus.canJoinAsPlayer);
	const spotsLeft = $derived(Math.max($lobbyStatus.maxPlayerCount - $lobbyStatus.playerCount, 0));

	// Someone else grabbed our cookie (or none was picked yet): offer a free one instead.
	$effect(() => {
		if (!$lobbyStatus.known || joining) return;
		if (!avatar || $lobbyStatus.takenAvatars.includes(avatar)) {
			avatar = randomFreeAvatar($lobbyStatus.takenAvatars);
		}
	});

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
		playerStore.update((s) => ({ ...s, avatar }));
		socket?.emit('new-player', { name: $playerStore.name, avatar });
	}

	function joinAsAudience() {
		joining = 'audience';
		socket?.emit('new-spectator', { name: $playerStore.name });
	}
</script>

<!-- Center card -->
<!-- Scrolls when the cookie picker makes the card taller than the phone. -->
<div class="relative z-10 flex h-full justify-center overflow-y-auto px-4 py-6">
	<div class="my-auto w-full max-w-md rounded-3xl border-4 border-plate bg-stage-dark/90 px-8 py-10 shadow-[0_8px_0_#2e1446] backdrop-blur-sm flex flex-col gap-6 text-center">

		<!-- Cookie icon -->
		<div class="flex justify-center">
			{#if canPlay && avatar}
				<img
					src={avatarUrl(avatar)}
					alt="Your cookie"
					class="h-24 w-24 drop-shadow-[0_4px_0_#2e1446]"
				/>
			{:else}
				<PlayerCookie class="h-16 w-16 drop-shadow-[0_4px_0_#2e1446]" />
			{/if}
		</div>

		<div>
			<p class="mb-1 font-boogaloo text-base tracking-[0.15em] text-lilac uppercase">
				WELCOME, {$playerStore.name}
			</p>
			<p class="font-boogaloo text-3xl text-title drop-shadow-[0_2px_0_#2e1446]">
				HOW DO YOU WANT TO JOIN?
			</p>
		</div>

		<!-- Divider -->
		<div class="h-px bg-gradient-to-r from-transparent via-plate/40 to-transparent"></div>

		<div class="flex flex-col gap-4">
			{#if !$lobbyStatus.known}
				<button type="button" disabled class="btn">CHECKING FOR A FREE SPOT…</button>
			{:else if canPlay}
				<p class="font-boogaloo text-base tracking-[0.15em] text-lilac uppercase">Pick your cookie</p>
				<AvatarPicker bind:value={avatar} taken={$lobbyStatus.takenAvatars} disabled={joining !== null} />
				<button type="button" onclick={joinAsPlayer} disabled={joining !== null || !avatar} class="btn">
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
