<script lang="ts">
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

<!-- Content -->
<div class="relative z-10 flex h-full flex-col items-center justify-center gap-5 overflow-y-auto px-5 pt-8 pb-[max(2rem,env(safe-area-inset-bottom))]">

	<!-- Question panel -->
	<div class="w-full max-w-lg rounded-3xl bg-cream px-6 py-6 shadow-[0_6px_0_#2e1446] sm:max-w-2xl">
		<p class="mb-3 text-center font-display text-xl tracking-[0.2em] text-curtain-red uppercase">
			{$questionStore.category} &bull; {$questionStore.difficulty}
		</p>
		<p class="text-center font-body text-3xl leading-snug text-ink">
			{$questionStore.text}
		</p>
		{#if $questionStore.hasImage}
			<p class="mt-3 text-center font-body text-lg tracking-wide text-ink">
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
			class="w-full resize-none rounded-t-2xl border-4 border-b-2 border-plate bg-stage-dark px-5 py-4 font-body text-2xl leading-snug text-title outline-none placeholder:text-lilac/60 [field-sizing:content]"
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
