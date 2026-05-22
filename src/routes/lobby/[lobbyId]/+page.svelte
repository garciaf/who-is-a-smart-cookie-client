<script lang="ts">
	import { page } from '$app/state';

	const lobbyId = page.params.lobbyId;
	let name = $state('');

	function joinLobby(event: Event) {
		event.preventDefault();
		// socket logic comes later
	}
</script>

	<!-- Corner accents -->
	<img src="/images/burst-teal.png"    alt="" aria-hidden="true" class="absolute -top-16 -left-16 h-56 w-56 opacity-80" />
	<img src="/images/burst-magenta.png" alt="" aria-hidden="true" class="absolute -bottom-12 -right-12 h-56 w-56 opacity-80" />
	<img src="/images/star-yellow.png"   alt="" aria-hidden="true" class="absolute top-8 right-16 h-10 w-10 rotate-12 opacity-90" />
	<img src="/images/star-orange.png"   alt="" aria-hidden="true" class="absolute bottom-12 left-16 h-8 w-8 -rotate-6 opacity-80" />
	<img src="/images/star-teal.png"     alt="" aria-hidden="true" class="absolute top-1/4 right-8 h-7 w-7 rotate-30 opacity-70" />

	<!-- Center card -->
	<div class="relative z-10 flex h-full items-center justify-center px-4">
		<div class="w-full max-w-md rounded-3xl border-4 border-game-yellow bg-navy/90 px-8 py-10 shadow-[0_8px_0_#8a7000] backdrop-blur-sm">

			<!-- Cookie icon -->
			<div class="mb-4 flex justify-center">
				<img
					src="/images/cookie-64-64px.png"
					alt="Cookie"
					class="pixel-perfect h-16 w-16 drop-shadow-[0_4px_0_#7a3a14]"
				/>
			</div>

			<!-- Lobby ID badge -->
			<p class="mb-1 text-center font-limelight text-xs tracking-[0.25em] text-teal uppercase">
				LOBBY
			</p>
			<div class="mb-8 flex items-center justify-center gap-3">
				<img src="/images/star-yellow.png" alt="" aria-hidden="true" class="pixel-perfect h-6 w-6" />
				<span class="font-monoton text-2xl tracking-widest text-game-yellow drop-shadow-[0_2px_0_#8a7000]">
					{lobbyId}
				</span>
				<img src="/images/star-yellow.png" alt="" aria-hidden="true" class="pixel-perfect h-6 w-6" />
			</div>

			<!-- Divider -->
			<div class="mb-8 h-px bg-gradient-to-r from-transparent via-game-yellow/40 to-transparent"></div>

			<!-- Form -->
			<form onsubmit={joinLobby} class="flex flex-col gap-6">
				<div class="flex flex-col gap-2">
					<label for="player_name" class="text-center font-boogaloo text-xl text-cream">
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
						class="w-full rounded-xl border-2 border-game-yellow/60 bg-navy px-5 py-3 font-boogaloo text-xl text-cream placeholder:text-teal/60 outline-none transition focus:border-game-yellow focus:ring-2 focus:ring-game-yellow/30"
					/>
				</div>

				<button
					type="submit"
					disabled={!name.trim()}
					class="w-full cursor-pointer rounded-full bg-magenta py-4 font-paytone text-2xl text-cream shadow-[0_6px_0_#7a003d] transition-transform hover:brightness-110 active:translate-y-1 active:shadow-[0_2px_0_#7a003d] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:translate-y-0"
				>
					JOIN THE SHOW!
				</button>
			</form>

		</div>
	</div>
