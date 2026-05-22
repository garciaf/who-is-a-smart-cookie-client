<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { page } from '$app/state';
</script>

<!-- Burst accents -->
<img src={asset('/images/burst-magenta.png')} alt="" aria-hidden="true" class="absolute -top-16 -left-16 h-64 w-64 opacity-80" />
<img src={asset('/images/burst-teal.png')}    alt="" aria-hidden="true" class="absolute -bottom-16 -right-16 h-64 w-64 opacity-80" />

<!-- Stars -->
<img src={asset('/images/star-yellow.png')}  alt="" aria-hidden="true" class="absolute top-10 right-16 h-10 w-10 rotate-12 opacity-90" />
<img src={asset('/images/star-orange.png')}  alt="" aria-hidden="true" class="absolute bottom-20 left-16 h-8 w-8 -rotate-6 opacity-80" />
<img src={asset('/images/star-magenta.png')} alt="" aria-hidden="true" class="absolute top-1/3 left-10 h-7 w-7 rotate-45 opacity-70" />

<!-- Content -->
<div class="relative z-10 flex h-full flex-col items-center justify-center gap-5 px-4 text-center">

	<h1 class="font-monoton text-7xl text-game-yellow drop-shadow-[0_6px_0_#8a7000] sm:text-8xl">
		{page.status}
	</h1>

	<div class="w-full max-w-sm rounded-3xl bg-cream px-8 py-8 shadow-[0_8px_0_#8a7000]">

		<div class="relative mb-4 flex justify-center">
			<img
				src={asset('/images/cookie-64-64px.png')}
				alt="Cookie"
				class="pixel-perfect spin-slow relative h-20 w-20"
			/>
		</div>

		<p class="font-limelight text-xs tracking-[0.3em] text-teal uppercase">
			Error {page.status}
		</p>

		<h2 class="mt-1 font-boogaloo text-4xl text-navy sm:text-5xl">
			WRONG CHANNEL!
		</h2>

		<p class="mt-2 font-paytone text-base text-magenta">
			That page doesn't exist, contestant.
		</p>

	</div>

	<a
		href={resolve('/')}
		class="cursor-pointer rounded-full bg-game-green px-10 py-4 font-paytone text-xl text-cream shadow-[0_6px_0_#1a6638] transition-transform hover:brightness-110 active:translate-y-1 active:shadow-[0_2px_0_#1a6638]"
	>
		BACK TO THE SHOW
	</a>

</div>
