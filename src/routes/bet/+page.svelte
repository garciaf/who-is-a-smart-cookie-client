<script lang="ts">
	import { asset } from '$app/paths';
	import socket from '$lib/socket';
	import { playerStore, gameStore, questionStore } from '$lib/stores/player';

	let selectedPlayer = $state<string | null>(null);
	let bet = $state<number | null>(null);

	function placeBet() {
		if (!selectedPlayer || !bet) return;
		socket?.emit('place-bet', { player: selectedPlayer, amount: bet });
	}

	function skipBet() {
		socket?.emit('place-bet', { player: null, amount: null });
	}
</script>

<!-- Corner accents -->
<img src={asset('/images/burst-teal.png')}    alt="" aria-hidden="true" class="absolute -top-16 -left-16 h-56 w-56 opacity-80" />
<img src={asset('/images/burst-magenta.png')} alt="" aria-hidden="true" class="absolute -bottom-12 -right-12 h-56 w-56 opacity-80" />
<img src={asset('/images/star-yellow.png')}   alt="" aria-hidden="true" class="absolute top-8 right-16 h-10 w-10 rotate-12 opacity-90" />
<img src={asset('/images/star-orange.png')}   alt="" aria-hidden="true" class="absolute bottom-12 left-16 h-8 w-8 -rotate-6 opacity-80" />
<img src={asset('/images/star-teal.png')}     alt="" aria-hidden="true" class="absolute top-1/3 right-6 h-7 w-7 rotate-30 opacity-70" />

<!-- Scrollable wrapper -->
<div class="relative z-10 flex h-full items-start justify-center overflow-y-auto px-4 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
	<div class="w-full max-w-md rounded-3xl border-4 border-game-yellow bg-navy/90 px-8 py-10 shadow-[0_8px_0_#8a7000] backdrop-blur-sm flex flex-col gap-6">

		<!-- Header -->
		<div class="flex flex-col items-center gap-3">
			<img
				src={asset('/images/cookie.svg')}
				alt="Cookie"
				class="pixel-perfect h-14 w-14 drop-shadow-[0_4px_0_#7a3a14]"
			/>
			<p class="font-limelight text-xs tracking-[0.3em] text-teal uppercase">Betting Round</p>
			
		</div>

		<!-- Balance -->
		<div class="rounded-2xl border-2 border-game-yellow/40 bg-navy px-5 py-3 text-center">
			<p class="font-limelight text-xs tracking-widest text-teal uppercase mb-1">Your balance</p>
			<p class="font-monoton text-3xl text-game-yellow drop-shadow-[0_2px_0_#8a7000]">
				{$playerStore.balance} <span class="font-boogaloo text-xl text-cream">pts</span>
			</p>
			
		</div>
		<div class="flex flex-col items-center gap-3">
			<p class="font-boogaloo text-lg text-cream uppercase">
					{$questionStore.category} &bull; {$questionStore.difficulty}
				</p>

		</div>
		<div class="h-px bg-gradient-to-r from-transparent via-game-yellow/40 to-transparent"></div>

		<!-- Player selection -->
		<div class="flex flex-col gap-3">
			
			<p class="text-center font-boogaloo text-xl text-cream">WHO DO YOU THINK IS THE SMART COOKIE?</p>
			<div class="grid grid-cols-2 gap-3">
				{#each $gameStore.players as player (player.id)}
					<button
						type="button"
						onclick={() => selectedPlayer = player.id}
						class="toggle rounded-2xl px-4 py-4 font-boogaloo text-xl"
						aria-pressed={selectedPlayer === player.id}
					>
						{player.name}
					</button>
				{/each}
			</div>
		</div>

		<div class="h-px bg-gradient-to-r from-transparent via-game-yellow/40 to-transparent"></div>

		<!-- Bet amount -->
		<div class="flex flex-col gap-3">
			<p class="text-center font-boogaloo text-xl text-cream">HOW MANY POINTS WILL YOU RISK?</p>
			<div class="flex gap-2">
				{#each $gameStore.betPresets as amount (amount)}
					<button
						type="button"
						onclick={() => bet = amount}
						class="toggle toggle-primary flex-1 rounded-xl py-3 font-paytone text-lg"
						aria-pressed={bet === amount}
					>
						{amount}
					</button>
				{/each}
			</div>
		</div>

		<div class="h-px bg-gradient-to-r from-transparent via-game-yellow/40 to-transparent"></div>

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
