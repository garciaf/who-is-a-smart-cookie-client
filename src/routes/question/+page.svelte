<script lang="ts">
	import { asset } from '$app/paths';
	import socket from '$lib/socket';
	import { questionStore } from '$lib/stores/player';

	let selected = $state<number | null>(null);

	function submitAnswer(event: Event) {
		event.preventDefault();
		if (selected === null) return;
		socket?.emit('submit-answer', { answer: $questionStore.answers[selected] });
		selected = null;
	}
</script>

<!-- Decorative accents -->
<img src={asset('/images/burst-orange.png')} alt="" aria-hidden="true" class="absolute -top-16 -left-16 h-56 w-56 opacity-80" />
<img src={asset('/images/burst-teal.png')}   alt="" aria-hidden="true" class="absolute -bottom-16 -right-16 h-56 w-56 opacity-80" />
<img src={asset('/images/star-yellow.png')}  alt="" aria-hidden="true" class="absolute top-8 right-16 h-10 w-10 rotate-12 opacity-90" />
<img src={asset('/images/star-magenta.png')} alt="" aria-hidden="true" class="absolute bottom-12 left-16 h-8 w-8 -rotate-6 opacity-80" />
<img src={asset('/images/star-teal.png')}    alt="" aria-hidden="true" class="absolute top-1/3 right-8 h-7 w-7 rotate-30 opacity-70" />

<!-- Content -->
<div class="relative z-10 flex h-full flex-col items-center justify-center gap-5 overflow-y-auto px-5 pt-8 pb-[max(2rem,env(safe-area-inset-bottom))]">

	<!-- Question panel -->
	<div class="w-full max-w-lg rounded-3xl bg-cream sm:max-w-2xl px-6 py-6 shadow-[0_6px_0_#8a7000]">
		<p class="mb-3 font-limelight text-base tracking-[0.2em] text-magenta uppercase text-center">
			{$questionStore.category} &bull; {$questionStore.difficulty}
		</p>
		<p class="font-boogaloo text-3xl leading-snug text-navy text-center">
			{$questionStore.text}
		</p>
	</div>

	<!-- Answer buttons -->
	<form onsubmit={submitAnswer} class="w-full max-w-lg sm:max-w-2xl flex flex-col gap-3">
		<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
			{#each $questionStore.answers as answer, i (i)}
				<button
					type="button"
					onclick={() => { selected = selected === i ? null : i; }}
					class="w-full rounded-2xl border-4 bg-cream px-6 py-5 font-boogaloo text-2xl text-navy shadow-[0_4px_0_#8a7000] transition-all hover:brightness-95 active:translate-y-1 active:shadow-[0_1px_0_#8a7000] {selected === i ? 'border-magenta shadow-[0_4px_0_#7a003d]' : 'border-game-yellow'}"
				>
					{answer}
				</button>
			{/each}
		</div>
		<button
			type="submit"
			disabled={selected === null}
			class="w-full cursor-pointer rounded-full bg-magenta py-4 font-paytone text-2xl text-cream shadow-[0_6px_0_#7a003d] transition-transform hover:brightness-110 active:translate-y-1 active:shadow-[0_2px_0_#7a003d] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:translate-y-0"
		>
			SUBMIT!
		</button>
	</form>

</div>
