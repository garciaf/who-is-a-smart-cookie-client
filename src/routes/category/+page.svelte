<script lang="ts">
	import socket from '$lib/socket';
	import { categoryStore } from '$lib/stores/player';

	let selected = $state<number | null>(null);

	function submitCategory(event: Event) {
		event.preventDefault();
		if (selected === null) return;
		const category = $categoryStore.categories[selected];
		socket?.emit('select-category', { category: category.key, question: category.question });
		selected = null;
	}
</script>

<!-- Content -->
<div class="relative z-10 flex h-full flex-col items-center justify-center gap-5 overflow-y-auto px-5 pt-8 pb-[max(2rem,env(safe-area-inset-bottom))]">

	<!-- Prompt panel -->
	<div class="w-full max-w-lg rounded-3xl bg-cream sm:max-w-2xl px-6 py-6 shadow-[0_6px_0_#2e1446]">
		<p class="mb-3 font-boogaloo text-xl tracking-[0.2em] text-curtain-red uppercase text-center">
			Choose Wisely
		</p>
		<p class="font-boogaloo text-3xl leading-snug text-ink text-center">
			Pick a category!
		</p>
	</div>

	<!-- Category buttons -->
	<form onsubmit={submitCategory} class="w-full max-w-lg sm:max-w-2xl flex flex-col gap-3">
		<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
			{#each $categoryStore.categories as category, i (i)}
				<button
					type="button"
					onclick={() => { selected = selected === i ? null : i; }}
					class="option px-6 py-5 text-2xl"
					aria-pressed={selected === i}
				>
					{category.label} ({category.difficulty})
				</button>
			{/each}
		</div>
		<button
			type="submit"
			disabled={selected === null}
			class="btn"
		>
			CHOOSE!
		</button>
	</form>

</div>
