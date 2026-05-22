<script lang="ts">
	import { asset } from '$app/paths';

	const question = {
		category: 'History',
		difficulty: 'Hard',
		text: 'Describe the main causes of the First World War.',
	};

	let answer = $state('');
</script>

<!-- Decorative accents -->
<img src={asset('/images/burst-teal.png')}    alt="" aria-hidden="true" class="absolute -top-16 -left-16 h-56 w-56 opacity-80" />
<img src={asset('/images/burst-orange.png')}  alt="" aria-hidden="true" class="absolute -bottom-16 -right-16 h-56 w-56 opacity-80" />
<img src={asset('/images/star-yellow.png')}   alt="" aria-hidden="true" class="absolute top-8 right-16 h-10 w-10 rotate-12 opacity-90" />
<img src={asset('/images/star-magenta.png')}  alt="" aria-hidden="true" class="absolute bottom-12 left-16 h-8 w-8 -rotate-6 opacity-80" />
<img src={asset('/images/star-teal.png')}     alt="" aria-hidden="true" class="absolute top-1/3 right-8 h-7 w-7 rotate-30 opacity-70" />

<!-- Content -->
<div class="relative z-10 flex h-full flex-col items-center justify-center gap-5 overflow-y-auto px-5 py-8">

	<!-- Question panel -->
	<div class="w-full max-w-lg rounded-3xl bg-cream px-6 py-6 shadow-[0_6px_0_#8a7000] sm:max-w-2xl">
		<p class="mb-3 text-center font-limelight text-base tracking-[0.2em] text-magenta uppercase">
			{question.category} &bull; {question.difficulty}
		</p>
		<p class="text-center font-boogaloo text-3xl leading-snug text-navy">
			{question.text}
		</p>
	</div>

	<!-- Answer area -->
	<div class="flex w-full max-w-lg flex-col sm:max-w-2xl">
		<textarea
			bind:value={answer}
			placeholder="Give your answer here..."
			rows="3"
			class="w-full resize-none rounded-t-2xl border-4 border-b-2 border-game-yellow bg-navy px-5 py-4 font-boogaloo text-2xl leading-snug text-game-yellow outline-none placeholder:text-game-yellow/40 [field-sizing:content]"
		></textarea>
		<button
			disabled={!answer.trim()}
			class="w-full rounded-b-2xl bg-game-green py-5 font-paytone text-2xl text-cream shadow-[0_4px_0_#1a6638] transition-all hover:brightness-110 active:translate-y-1 active:shadow-[0_1px_0_#1a6638] disabled:cursor-not-allowed disabled:bg-gray disabled:shadow-[0_4px_0_#4a4a5e] disabled:translate-y-0"
		>
			VALIDATE
		</button>
	</div>

</div>
