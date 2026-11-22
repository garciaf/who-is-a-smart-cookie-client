<script lang="ts">
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

<!-- Content -->
<div class="relative z-10 flex h-full flex-col items-center justify-center gap-5 overflow-y-auto px-5 pt-8 pb-[max(2rem,env(safe-area-inset-bottom))]">

	<!-- Question panel -->
	<div class="w-full max-w-lg rounded-3xl bg-cream sm:max-w-2xl px-6 py-6 shadow-[0_6px_0_#2e1446]">
		<p class="mb-3 font-display text-xl tracking-[0.2em] text-curtain-red uppercase text-center">
			{$questionStore.category} &bull; {$questionStore.difficulty}
		</p>
		<p class="font-body text-3xl leading-snug text-ink text-center">
			{$questionStore.text}
		</p>
		{#if $questionStore.hasImage}
			<p class="mt-3 text-center font-body text-lg tracking-wide text-ink">
				(Look at the screen!)
			</p>
		{/if}
	</div>

	<!-- Answer buttons -->
	<form onsubmit={submitAnswer} class="w-full max-w-lg sm:max-w-2xl flex flex-col gap-3">
		<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
			{#each $questionStore.answers as answer, i (i)}
				<button
					type="button"
					onclick={() => { selected = selected === i ? null : i; }}
					class="option px-6 py-5 text-2xl"
					aria-pressed={selected === i}
				>
					{answer}
				</button>
			{/each}
		</div>
		<button
			type="submit"
			disabled={selected === null}
			class="btn"
		>
			SUBMIT!
		</button>
	</form>

</div>
