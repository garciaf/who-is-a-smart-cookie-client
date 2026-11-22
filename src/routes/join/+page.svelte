<script lang="ts">
	import PlayerCookie from '$lib/components/PlayerCookie.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import socket from '$lib/socket';
	import { playerStore, lobbyStatus, unknownLobbyStatus } from '$lib/stores/player';

	let code = $state('');
	let name = $state('');

	function joinLobby(event: Event) {
		event.preventDefault();
		playerStore.update((s) => ({ ...s, name, lobbyId: code }));
		socket?.emit('join-lobby', { lobbyId: code, name });
	}

	onMount(() => {
		const onJoinedLobby = (data: unknown) => {
			const { lobbyId: joinedLobbyId, clientId } = data as { lobbyId: string; clientId: string };

			playerStore.update(state => ({...state, lobbyId: joinedLobbyId, id: clientId, name}));
			lobbyStatus.set(unknownLobbyStatus);
			goto(resolve('/role'));
		};
		socket?.on('joined-lobby', onJoinedLobby);
		return () => socket?.off('joined-lobby', onJoinedLobby);
	});
</script>

<!-- Center card -->
<div class="relative z-10 flex h-full items-center justify-center px-4">
	<div class="w-full max-w-md rounded-3xl border-4 border-plate bg-stage-dark/90 px-8 py-10 shadow-[0_8px_0_#2e1446] backdrop-blur-sm">

		<!-- Cookie icon -->
		<div class="mb-4 flex justify-center">
			<PlayerCookie class="h-16 w-16 drop-shadow-[0_4px_0_#2e1446]" />
		</div>

		<!-- Title badge -->
		<p class="mb-1 text-center font-body text-base tracking-[0.15em] text-lilac uppercase">
			ENTER YOUR
		</p>
		<div class="mb-8 flex items-center justify-center gap-3">
			<span class="font-body text-3xl tracking-widest text-title drop-shadow-[0_2px_0_#2e1446]">
				LOBBY CODE
			</span>
		</div>

		<!-- Divider -->
		<div class="mb-8 h-px bg-gradient-to-r from-transparent via-plate/40 to-transparent"></div>

		<!-- Form -->
		<form onsubmit={joinLobby} class="flex flex-col gap-6">
			<div class="flex flex-col gap-2">
				<label for="lobby_code" class="text-center font-body text-xl text-cream">
					LOBBY CODE
				</label>
				<input
					id="lobby_code"
					name="lobby_code"
					type="text"
					bind:value={code}
					placeholder="Enter lobby code…"
					required
					autocomplete="off"
					class="w-full rounded-xl border-2 border-plate/60 bg-stage-dark px-5 py-3 font-body text-xl text-cream placeholder:text-lilac/60 outline-none transition focus:border-plate focus:ring-2 focus:ring-plate/30 uppercase tracking-widest text-center"
				/>
			</div>

			<div class="flex flex-col gap-2">
				<label for="player_name" class="text-center font-body text-xl text-cream">
					WHAT'S YOUR NAME, CONTESTANT?
				</label>
				<input
					id="player_name"
					name="player_name"
					type="text"
					bind:value={name}
					placeholder="Enter your name…"
					required
					autocomplete="off"
					class="w-full rounded-xl border-2 border-plate/60 bg-stage-dark px-5 py-3 font-body text-xl text-cream placeholder:text-lilac/60 outline-none transition focus:border-plate focus:ring-2 focus:ring-plate/30"
				/>
			</div>

			<button
				type="submit"
				disabled={!name.trim() || !code.trim()}
				class="btn"
			>
				JOIN THE SHOW!
			</button>
		</form>

	</div>
</div>
