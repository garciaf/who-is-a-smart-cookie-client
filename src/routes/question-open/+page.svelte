<script lang="ts">
	import { asset } from '$app/paths';
	import socket from '$lib/socket';
	import { questionStore } from '$lib/stores/player';

	let answer = $state('');

	function validate(event: Event) {
		event.preventDefault();
		if (!answer.trim()) return;
		socket?.emit('submit-answer', { answer: answer });
		answer = '';
	}
</script>

<!-- Decorative accents -->
<img src={asset('/images/burst-teal.png')}    alt="" aria-hidden="true" class="absolute -top-16 -left-16 h-56 w-56 opacity-80" />
<img src={asset('/images/burst-orange.png')}  alt="" aria-hidden="true" class="absolute -bottom-16 -right-16 h-56 w-56 opacity-80" />
<img src={asset('/images/star-yellow.png')}   alt="" aria-hidden="true" class="absolute top-8 right-16 h-10 w-10 rotate-12 opacity-90" />
<img src={asset('/images/star-magenta.png')}  alt="" aria-hidden="true" class="absolute bottom-12 left-16 h-8 w-8 -rotate-6 opacity-80" />
<img src={asset('/images/star-teal.png')}     alt="" aria-hidden="true" class="absolute top-1/3 right-8 h-7 w-7 rotate-30 opacity-70" />

<!-- Content -->
<div class="relative z-10 flex h-full flex-col items-center justify-center gap-5 overflow-y-auto px-5 pt-8 pb-[max(2rem,env(safe-area-inset-bottom))]">

	<!-- Question panel -->
	<div class="w-full max-w-lg rounded-3xl bg-cream px-6 py-6 shadow-[0_6px_0_#8a7000] sm:max-w-2xl">
		<p class="mb-3 text-center font-limelight text-base tracking-[0.2em] text-magenta uppercase">
			{$questionStore.category} &bull; {$questionStore.difficulty}
		</p>
		<p class="text-center font-boogaloo text-3xl leading-snug text-navy">
			{$questionStore.text}
		</p>
		{#if $questionStore.hasImage}
			<p class="mt-3 text-center font-boogaloo text-lg tracking-wide text-navy">
				(Look at the screen!)
			</p>
		{/if}
	</div>

	<!-- Answer area -->
	<form onsubmit={validate} class="flex w-full max-w-lg flex-col sm:max-w-2xl">
		<textarea
			bind:value={answer}
			placeholder="Give your answer here..."
			rows="3"
			class="w-full resize-none rounded-t-2xl border-4 border-b-2 border-game-yellow bg-navy px-5 py-4 font-boogaloo text-2xl leading-snug text-game-yellow outline-none placeholder:text-game-yellow/40 [field-sizing:content]"
		></textarea>
		<button
			type="submit"
			disabled={!answer.trim()}
			class="btn btn-secondary rounded-none rounded-b-2xl py-5"
		>
			VALIDATE
		</button>
	</form>

</div>
