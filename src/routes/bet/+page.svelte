<script lang="ts">
	import { asset } from '$app/paths';

	const players = ['Alice', 'Fab', 'Sonja', 'Dave'];
	const presets = [1, 2, 3, 4];
	const balance = 8;

	let selectedPlayer = $state<string | null>(null);
	let bet = $state<number | null>(null);

	function placeBet(event: Event) {
		event.preventDefault();
		// logic comes later
	}
</script>

<!-- Corner accents -->
<img src={asset('/images/burst-teal.png')}    alt="" aria-hidden="true" class="absolute -top-16 -left-16 h-56 w-56 opacity-80" />
<img src={asset('/images/burst-magenta.png')} alt="" aria-hidden="true" class="absolute -bottom-12 -right-12 h-56 w-56 opacity-80" />
<img src={asset('/images/star-yellow.png')}   alt="" aria-hidden="true" class="absolute top-8 right-16 h-10 w-10 rotate-12 opacity-90" />
<img src={asset('/images/star-orange.png')}   alt="" aria-hidden="true" class="absolute bottom-12 left-16 h-8 w-8 -rotate-6 opacity-80" />
<img src={asset('/images/star-teal.png')}     alt="" aria-hidden="true" class="absolute top-1/3 right-6 h-7 w-7 rotate-30 opacity-70" />

<!-- Scrollable wrapper -->
<div class="relative z-10 flex h-full items-start justify-center overflow-y-auto px-4 py-6">
	<div class="w-full max-w-md rounded-3xl border-4 border-game-yellow bg-navy/90 px-8 py-10 shadow-[0_8px_0_#8a7000] backdrop-blur-sm flex flex-col gap-6">

		<!-- Header -->
		<div class="flex flex-col items-center gap-3">
			<img
				src={asset('/images/cookie-64-64px.png')}
				alt="Cookie"
				class="pixel-perfect h-14 w-14 drop-shadow-[0_4px_0_#7a3a14]"
			/>
			<p class="font-limelight text-xs tracking-[0.3em] text-teal uppercase">Betting Round</p>
		</div>

		<!-- Balance -->
		<div class="rounded-2xl border-2 border-game-yellow/40 bg-navy px-5 py-3 text-center">
			<p class="font-limelight text-xs tracking-widest text-teal uppercase mb-1">Your balance</p>
			<p class="font-monoton text-3xl text-game-yellow drop-shadow-[0_2px_0_#8a7000]">
				{balance} <span class="font-boogaloo text-xl text-cream">pts</span>
			</p>
		</div>

		<div class="h-px bg-gradient-to-r from-transparent via-game-yellow/40 to-transparent"></div>

		<!-- Player selection -->
		<div class="flex flex-col gap-3">
			<p class="text-center font-boogaloo text-xl text-cream">WHO DO YOU THINK IS THE SMART COOKIE?</p>
			<div class="grid grid-cols-2 gap-3">
				{#each players as player (player)}
					<button
						type="button"
						onclick={() => selectedPlayer = player}
						class={[
							'rounded-2xl border-2 px-4 py-4 font-boogaloo text-xl transition-all',
							selectedPlayer === player
								? 'border-game-yellow bg-game-yellow/20 text-game-yellow shadow-[0_4px_0_#8a7000]'
								: 'border-teal/40 bg-navy text-cream hover:border-teal hover:bg-teal/10'
						].join(' ')}
					>
						{player}
					</button>
				{/each}
			</div>
		</div>

		<div class="h-px bg-gradient-to-r from-transparent via-game-yellow/40 to-transparent"></div>

		<!-- Bet amount -->
		<div class="flex flex-col gap-3">
			<p class="text-center font-boogaloo text-xl text-cream">HOW MANY POINTS WILL YOU RISK?</p>
			<div class="grid grid-cols-4 gap-2">
				{#each presets as amount (amount)}
					<button
						type="button"
						onclick={() => bet = amount}
						class={[
							'rounded-xl border-2 py-3 font-paytone text-lg transition-all',
							bet === amount
								? 'border-magenta bg-magenta/20 text-magenta shadow-[0_3px_0_#7a003d]'
								: 'border-teal/40 bg-navy text-cream hover:border-teal hover:bg-teal/10'
						].join(' ')}
					>
						{amount}
					</button>
				{/each}
			</div>
			<button
				type="button"
				onclick={() => bet = balance}
				class={[
					'w-full rounded-xl border-2 py-3 font-paytone text-lg transition-all',
					bet === balance
						? 'border-magenta bg-magenta/20 text-magenta shadow-[0_3px_0_#7a003d]'
						: 'border-teal/40 bg-navy text-cream hover:border-teal hover:bg-teal/10'
				].join(' ')}
			>
				ALL IN 🔥
			</button>
		</div>

		<div class="h-px bg-gradient-to-r from-transparent via-game-yellow/40 to-transparent"></div>

		<!-- Actions -->
		<form onsubmit={placeBet} class="flex flex-col gap-3">
			<button
				type="submit"
				disabled={!selectedPlayer || !bet}
				class="w-full cursor-pointer rounded-full bg-magenta py-4 font-paytone text-2xl text-cream shadow-[0_6px_0_#7a003d] transition-transform hover:brightness-110 active:translate-y-1 active:shadow-[0_2px_0_#7a003d] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:translate-y-0"
			>
				PLACE YOUR BET!
			</button>
			<button
				type="button"
				class="w-full py-2 font-boogaloo text-lg text-teal/70 hover:text-teal transition-colors"
			>
				Skip — play it safe
			</button>
		</form>

	</div>
</div>
