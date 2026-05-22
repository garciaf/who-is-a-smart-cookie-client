<script lang="ts">
	const question = {
		category: 'Science',
		difficulty: 'Medium',
		text: 'What is the chemical symbol for gold on the periodic table?',
		answers: ['Ag', 'Au', 'Fe', 'Cu'],
	};

	let selected = $state<number | null>(null);
</script>

<!-- Decorative accents -->
<img src="/images/burst-orange.png" alt="" aria-hidden="true" class="absolute -top-16 -left-16 h-56 w-56 opacity-80" />
<img src="/images/burst-teal.png"   alt="" aria-hidden="true" class="absolute -bottom-16 -right-16 h-56 w-56 opacity-80" />
<img src="/images/star-yellow.png"  alt="" aria-hidden="true" class="absolute top-8 right-16 h-10 w-10 rotate-12 opacity-90" />
<img src="/images/star-magenta.png" alt="" aria-hidden="true" class="absolute bottom-12 left-16 h-8 w-8 -rotate-6 opacity-80" />
<img src="/images/star-teal.png"    alt="" aria-hidden="true" class="absolute top-1/3 right-8 h-7 w-7 rotate-30 opacity-70" />

<!-- Content -->
<div class="relative z-10 flex h-full flex-col items-center justify-center gap-5 overflow-y-auto px-5 py-8">

	<!-- Question panel -->
	<div class="w-full max-w-lg rounded-3xl bg-cream sm:max-w-2xl px-6 py-6 shadow-[0_6px_0_#8a7000]">
		<p class="mb-3 font-limelight text-base tracking-[0.2em] text-magenta uppercase text-center">
			{question.category} &bull; {question.difficulty}
		</p>
		<p class="font-boogaloo text-3xl leading-snug text-navy text-center">
			{question.text}
		</p>
	</div>

	<!-- Answer buttons -->
	<div class="grid w-full max-w-lg grid-cols-1 gap-3 sm:max-w-2xl sm:grid-cols-2">
		{#each question.answers as answer, i (i)}
			<button
				onclick={() => { selected = selected === i ? null : i; }}
				class="w-full rounded-2xl border-4 bg-cream px-6 py-5 font-boogaloo text-2xl text-navy shadow-[0_4px_0_#8a7000] transition-all hover:brightness-95 active:translate-y-1 active:shadow-[0_1px_0_#8a7000] {selected === i ? 'border-magenta shadow-[0_4px_0_#7a003d]' : 'border-game-yellow'}"
			>
				{answer}
			</button>
		{/each}
	</div>

</div>
