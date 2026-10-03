<script lang="ts">
	import { asset } from '$app/paths';
	import { SvelteSet } from 'svelte/reactivity';
	import socket from '$lib/socket';
	import { settingsStore } from '$lib/stores/player';

	let selectedCategories = new SvelteSet<string>();
	let selectedDifficulties = new SvelteSet<string>();

	function toggleCategory(key: string) {
		if (selectedCategories.has(key)) {
			selectedCategories.delete(key);
		} else {
			selectedCategories.add(key);
		}
	}

	function toggleDifficulty(key: string) {
		if (selectedDifficulties.has(key)) {
			selectedDifficulties.delete(key);
		} else {
			selectedDifficulties.add(key);
		}
	}

	function submitSettings(event: Event) {
		event.preventDefault();
		if (selectedCategories.size === 0 || selectedDifficulties.size === 0) return;
		socket?.emit('select-settings', {
			categories: Array.from(selectedCategories),
			difficulties: Array.from(selectedDifficulties)
		});
	}
</script>

<!-- Decorative accents -->
<img
	src={asset('/images/burst-orange.png')}
	alt=""
	aria-hidden="true"
	class="absolute -top-16 -left-16 h-56 w-56 opacity-80"
/>
<img
	src={asset('/images/burst-teal.png')}
	alt=""
	aria-hidden="true"
	class="absolute -right-16 -bottom-16 h-56 w-56 opacity-80"
/>
<img
	src={asset('/images/star-yellow.png')}
	alt=""
	aria-hidden="true"
	class="absolute top-8 right-16 h-10 w-10 rotate-12 opacity-90"
/>
<img
	src={asset('/images/star-magenta.png')}
	alt=""
	aria-hidden="true"
	class="absolute bottom-12 left-16 h-8 w-8 -rotate-6 opacity-80"
/>
<img
	src={asset('/images/star-teal.png')}
	alt=""
	aria-hidden="true"
	class="absolute top-1/3 right-8 h-7 w-7 rotate-30 opacity-70"
/>

<!-- Content -->
<div
	class="relative z-10 flex h-full flex-col items-center overflow-hidden px-5 pt-8 pb-[max(1rem,env(safe-area-inset-bottom))]"
>
	<form
		onsubmit={submitSettings}
		class="flex h-full min-h-0 w-full max-w-lg flex-col gap-4 sm:max-w-2xl"
	>
		<!-- Scrollable list area -->
		<div class="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto pb-4">
			<!-- Prompt panel -->
			<div class="w-full rounded-3xl bg-cream px-6 py-6 shadow-[0_6px_0_#8a7000]">
				<p
					class="mb-3 text-center font-limelight text-base tracking-[0.2em] text-magenta uppercase"
				>
					Game Settings
				</p>
				<p class="text-center font-boogaloo text-3xl leading-snug text-navy">
					Pick your difficulties and categories!
				</p>
			</div>

			<!-- Difficulties -->
			<div class="flex flex-col gap-3">
				<p class="font-limelight text-sm tracking-[0.2em] text-cream uppercase">Difficulties</p>
				<div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
					{#each $settingsStore.difficulties as difficulty (difficulty.key)}
						<button
							type="button"
							onclick={() => toggleDifficulty(difficulty.key)}
							class="option px-4 py-4 text-xl option-filled"
							aria-pressed={selectedDifficulties.has(difficulty.key)}
						>
							{difficulty.label}
						</button>
					{/each}
				</div>
			</div>

			<!-- Categories -->
			<div class="flex flex-col gap-3">
				<p class="font-limelight text-sm tracking-[0.2em] text-cream uppercase">Categories</p>
				<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
					{#each $settingsStore.categories as category (category.key)}
						<button
							type="button"
							onclick={() => toggleCategory(category.key)}
							class="option px-6 py-5 text-2xl option-filled"
							aria-pressed={selectedCategories.has(category.key)}
						>
							{category.label}
						</button>
					{/each}
				</div>
			</div>
		</div>

		<!-- Confirm button: outside the scroll area, always visible -->
		<button
			type="submit"
			disabled={selectedCategories.size === 0 || selectedDifficulties.size === 0}
			class="btn shrink-0"
		>
			CONFIRM!
		</button>
	</form>
</div>
