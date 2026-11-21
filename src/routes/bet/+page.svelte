<script lang="ts">
	import PlayerCookie from '$lib/components/PlayerCookie.svelte';
	import { asset } from '$app/paths';
	import socket from '$lib/socket';
	import { playerStore, gameStore, questionStore } from '$lib/stores/player';
	import { avatarUrl, isAvatar } from '$lib/avatars';

	let selectedPlayer = $state<string | null>(null);
	let bet = $state<number | null>(null);
	const compact = $derived($gameStore.players.length > 4);

	function placeBet() {
		if (!selectedPlayer || !bet) return;
		socket?.emit('place-bet', { player: selectedPlayer, amount: bet });
	}

	function skipBet() {
		socket?.emit('place-bet', { player: null, amount: null });
	}
</script>

<!-- Scrollable wrapper -->
<div class="relative z-10 flex h-full items-start justify-center overflow-y-auto px-4 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
	<div class="w-full max-w-md rounded-3xl border-4 border-plate bg-stage-dark/90 px-8 py-10 shadow-[0_8px_0_#2e1446] backdrop-blur-sm flex flex-col gap-6">

		<!-- Header -->
		<div class="flex flex-col items-center gap-3">
			<PlayerCookie class="h-14 w-14 drop-shadow-[0_4px_0_#2e1446]" />
			<p class="font-boogaloo text-base tracking-[0.15em] text-lilac uppercase">Betting Round</p>
			
		</div>

		<!-- Balance -->
		<div class="rounded-2xl border-2 border-plate/40 bg-stage-dark px-5 py-3 text-center">
			<p class="font-boogaloo text-base tracking-widest text-lilac uppercase mb-1">Your balance</p>
			<p class="font-boogaloo text-4xl text-title drop-shadow-[0_2px_0_#2e1446]">
				{$playerStore.balance} <span class="font-boogaloo text-xl text-cream">pts</span>
			</p>
			
		</div>
		<div class="flex flex-col items-center gap-3">
			<p class="font-boogaloo text-lg text-cream uppercase">
					{$questionStore.category} &bull; {$questionStore.difficulty}
				</p>

		</div>
		<div class="h-px bg-gradient-to-r from-transparent via-plate/40 to-transparent"></div>

		<!-- Player selection -->
		<div class="flex flex-col gap-3">
			
			<p class="text-center font-boogaloo text-xl text-cream">WHO DO YOU THINK IS THE SMART COOKIE?</p>
			<!-- Three per row from five players on, so the bet amounts stay on screen. -->
			<div class="grid gap-3 {compact ? 'grid-cols-3' : 'grid-cols-2'}">
				{#each $gameStore.players as player (player.id)}
					{@const picked = selectedPlayer === player.id}
					<button
						type="button"
						onclick={() => (selectedPlayer = player.id)}
						class="toggle group flex min-w-0 flex-col items-center gap-1 rounded-2xl px-2 pt-3 pb-2 font-boogaloo {compact ? 'text-lg' : 'text-xl'}"
						aria-pressed={picked}
						aria-label="Bet on {player.name}"
					>
						<img
							src={isAvatar(player.avatar) ? avatarUrl(player.avatar) : asset('/images/cookie.svg')}
							alt=""
							class="{compact ? 'h-16 w-16' : 'h-20 w-20'} transition-transform duration-200 group-hover:-rotate-6
								{picked ? 'scale-115 -rotate-6 drop-shadow-[0_4px_0_#2e1446]' : 'drop-shadow-[0_3px_0_#2e1446]'}"
						/>
						<span class="flex max-w-full items-center gap-1.5 truncate">
							<!-- Same colour dot as the player's name plate on the big screen. -->
							{#if player.color}
								<span class="h-2.5 w-2.5 shrink-0 rounded-full" style="background-color: {player.color}"></span>
							{/if}
							<span class="truncate">{player.name}</span>
						</span>
					</button>
				{/each}
			</div>
		</div>

		<div class="h-px bg-gradient-to-r from-transparent via-plate/40 to-transparent"></div>

		<!-- Bet amount -->
		<div class="flex flex-col gap-3">
			<p class="text-center font-boogaloo text-xl text-cream">HOW MANY POINTS WILL YOU RISK?</p>
			<div class="flex gap-2">
				{#each $gameStore.betPresets as amount (amount)}
					<button
						type="button"
						onclick={() => bet = amount}
						class="toggle toggle-primary flex-1 rounded-xl py-3 font-boogaloo text-xl"
						aria-pressed={bet === amount}
					>
						{amount}
					</button>
				{/each}
			</div>
		</div>

		<div class="h-px bg-gradient-to-r from-transparent via-plate/40 to-transparent"></div>

		<!-- Actions -->
		<div class="flex flex-col gap-3">
			<button
				type="button"
				onclick={placeBet}
				disabled={!selectedPlayer || !bet}
				class="btn"
			>
				PLACE YOUR BET!
			</button>
			<button
				type="button"
				onclick={skipBet}
				class="btn btn-outline"
			>
				Skip — play it safe
			</button>
		</div>

	</div>
</div>
