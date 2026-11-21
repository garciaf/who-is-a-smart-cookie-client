<script lang="ts">
	import PlayerCookie from '$lib/components/PlayerCookie.svelte';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import socket from '$lib/socket';
	import { lobbyStatus } from '$lib/stores/player';

	// Keep in sync with SpectatorManager in the game, which enforces the same limits.
	const MAX_LENGTH = 60;
	const COOLDOWN_MS = 3000;
	const PRESETS = ['GO GO GO!', 'SMART COOKIE!', 'YOU GOT THIS!', 'WOOHOO!', 'NOOOO!', 'BRAVO!'];

	let message = $state('');
	let coolingDown = $state(false);
	let lastSent = $state<string | null>(null);

	// The crowd is only on screen once the show started.
	const waitingForShow = $derived($lobbyStatus.known && !$lobbyStatus.gameStarted);
	const canSend = $derived(!coolingDown && !waitingForShow);

	onMount(() => {
		if (!get(lobbyStatus).known) socket?.emit('lobby-status-requested');
	});

	function send(text: string) {
		const trimmed = text.trim().slice(0, MAX_LENGTH);
		if (!trimmed || !canSend) return;
		socket?.emit('audience-message', { message: trimmed });
		lastSent = trimmed;
		message = '';
		coolingDown = true;
		setTimeout(() => (coolingDown = false), COOLDOWN_MS);
	}

	function submit(event: Event) {
		event.preventDefault();
		send(message);
	}
</script>

<!-- Scrollable wrapper -->
<div class="relative z-10 flex h-full items-start justify-center overflow-y-auto px-4 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
	<div class="w-full max-w-md rounded-3xl border-4 border-plate bg-stage-dark/90 px-8 py-10 shadow-[0_8px_0_#2e1446] backdrop-blur-sm flex flex-col gap-6">

		<!-- Header -->
		<div class="flex flex-col items-center gap-3 text-center">
			<PlayerCookie class="h-14 w-14 drop-shadow-[0_4px_0_#2e1446]" />
			<p class="font-boogaloo text-base tracking-[0.15em] text-lilac uppercase">You're in the audience</p>
			<p class="font-boogaloo text-2xl text-cream">
				{#if waitingForShow}
					The show hasn't started yet. Your signs go up once it does!
				{:else}
					Cheer on the players: your message goes up on a sign in the crowd!
				{/if}
			</p>
		</div>

		<div class="h-px bg-gradient-to-r from-transparent via-plate/40 to-transparent"></div>

		<!-- Quick cheers -->
		<div class="grid grid-cols-2 gap-3">
			{#each PRESETS as preset (preset)}
				<button
					type="button"
					onclick={() => send(preset)}
					disabled={!canSend}
					class="toggle rounded-2xl px-3 py-3 font-boogaloo text-lg disabled:opacity-40"
				>
					{preset}
				</button>
			{/each}
		</div>

		<div class="h-px bg-gradient-to-r from-transparent via-plate/40 to-transparent"></div>

		<!-- Custom message -->
		<form onsubmit={submit} class="flex flex-col gap-3">
			<label for="audience_message" class="text-center font-boogaloo text-xl text-cream">
				WRITE YOUR OWN SIGN
			</label>
			<input
				id="audience_message"
				name="audience_message"
				type="text"
				bind:value={message}
				maxlength={MAX_LENGTH}
				placeholder="Type a message…"
				autocomplete="off"
				class="w-full rounded-xl border-2 border-plate/60 bg-stage-dark px-5 py-3 font-boogaloo text-xl text-cream placeholder:text-lilac/60 outline-none transition focus:border-plate focus:ring-2 focus:ring-plate/30"
			/>
			<button type="submit" disabled={!message.trim() || !canSend} class="btn">
				{coolingDown ? 'SIGN IS UP!' : 'SEND'}
			</button>
		</form>

		{#if lastSent}
			<p class="text-center font-boogaloo text-lg text-cream/80">Last sign: “{lastSent}”</p>
		{/if}

	</div>
</div>
