<script lang="ts">
	import { asset } from '$app/paths';

	const message = 'Look at the screen!';
</script>

<!-- Corner accents -->
<img src={asset('/images/burst-orange.png')}  alt="" aria-hidden="true" class="absolute -top-16 -right-16 h-64 w-64 opacity-80" />
<img src={asset('/images/burst-teal.png')}    alt="" aria-hidden="true" class="absolute -bottom-16 -left-16 h-64 w-64 opacity-80" />
<img src={asset('/images/star-yellow.png')}   alt="" aria-hidden="true" class="absolute top-8 left-12 h-10 w-10 rotate-12 opacity-90" />
<img src={asset('/images/star-magenta.png')}  alt="" aria-hidden="true" class="absolute top-16 right-24 h-8 w-8 -rotate-6 opacity-90" />
<img src={asset('/images/star-teal.png')}     alt="" aria-hidden="true" class="absolute bottom-24 right-16 h-10 w-10 rotate-12 opacity-90" />
<img src={asset('/images/star-orange.png')}   alt="" aria-hidden="true" class="absolute bottom-16 left-20 h-7 w-7 -rotate-12 opacity-80" />

<!-- Center card -->
<div class="relative z-10 flex h-full items-center justify-center px-4">
	<div class="w-full max-w-md rounded-3xl border-4 border-game-yellow bg-navy/90 px-8 py-10 shadow-[0_8px_0_#8a7000] backdrop-blur-sm flex flex-col items-center gap-6 text-center">

		<!-- Cookie icon -->
		<img
			src={asset('/images/cookie-64-64px.png')}
			alt="Cookie"
			class="pixel-perfect h-16 w-16 drop-shadow-[0_4px_0_#7a3a14]"
		/>

		<!-- Label -->
		<p class="font-limelight text-xs tracking-[0.3em] text-teal uppercase">
			FROM YOUR HOST
		</p>

		<!-- Divider -->
		<div class="w-full h-px bg-gradient-to-r from-transparent via-game-yellow/40 to-transparent"></div>

		<!-- Message -->
		<p class="font-boogaloo text-4xl leading-snug text-cream drop-shadow-[0_2px_0_#1a1a3e] sm:text-5xl">
			{message}
		</p>

	</div>
</div>
