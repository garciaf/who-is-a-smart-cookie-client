<script lang="ts">
	import PlayerCookie from '$lib/components/PlayerCookie.svelte';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
</script>

<!-- Content -->
<div class="relative z-10 flex h-full flex-col items-center justify-center gap-5 px-4 text-center">

	<h1 class="font-boogaloo text-7xl text-title drop-shadow-[0_6px_0_#2e1446] sm:text-8xl">
		{page.status}
	</h1>

	<div class="w-full max-w-sm rounded-3xl bg-cream px-8 py-8 shadow-[0_8px_0_#2e1446]">

		<div class="relative mb-4 flex justify-center">
			<PlayerCookie class="spin-slow relative h-20 w-20" />
		</div>

		<p class="font-boogaloo text-base tracking-[0.15em] text-lilac uppercase">
			Error {page.status}
		</p>

		<h2 class="mt-1 font-boogaloo text-4xl text-ink sm:text-5xl">
			WRONG CHANNEL!
		</h2>

		<p class="mt-2 font-boogaloo text-xl text-curtain-red">
			That page doesn't exist, contestant.
		</p>

	</div>

	<a
		href={resolve('/')}
		class="btn max-w-xs px-10"
	>
		BACK TO THE SHOW
	</a>

</div>
