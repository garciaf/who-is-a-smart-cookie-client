<script lang="ts">
	import PlayerCookie from '$lib/components/PlayerCookie.svelte';
	import { loadingMessage } from '$lib/stores/player';
</script>

<!-- Center card -->
<div class="relative z-10 flex h-full items-center justify-center px-4">
	<div class="w-full max-w-md rounded-3xl border-4 border-plate bg-stage-dark/90 px-8 py-10 shadow-[0_8px_0_#2e1446] backdrop-blur-sm flex flex-col items-center gap-6 text-center">

		<!-- Cookie icon -->
		<PlayerCookie class="h-16 w-16 drop-shadow-[0_4px_0_#2e1446]" />

		<!-- Label -->
		<p class="font-body text-base tracking-[0.15em] text-lilac uppercase">
			FROM YOUR HOST
		</p>

		<!-- Divider -->
		<div class="w-full h-px bg-gradient-to-r from-transparent via-plate/40 to-transparent"></div>

		<!-- Message -->
		<p class="font-body text-4xl leading-snug text-cream drop-shadow-[0_2px_0_#2e1446] sm:text-5xl">
			{$loadingMessage.message}
		</p>

	</div>
</div>
