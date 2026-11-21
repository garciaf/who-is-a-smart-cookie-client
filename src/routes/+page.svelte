<script lang="ts">
	import { asset, resolve } from '$app/paths';
</script>

<!-- Center stage: the game's logo and the way in -->
<div class="relative z-10 flex h-full flex-col items-center justify-center gap-8 px-6 text-center">
	<!-- Soft spotlight behind the logo -->
	<div
		class="pointer-events-none absolute top-1/3 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lilac opacity-30 blur-3xl"
		aria-hidden="true"
	></div>

	<img
		src={asset('/images/logo.webp')}
		alt="Who is a Smart Cookie?"
		width="640"
		height="477"
		class="relative w-full max-w-md drop-shadow-[0_8px_0_#2e1446]"
	/>

	<a href={resolve('/join')} class="btn relative max-w-xs px-10 text-center">PLAY NOW</a>
</div>
