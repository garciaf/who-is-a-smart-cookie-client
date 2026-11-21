<script lang="ts">
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
			<div class="w-full rounded-3xl bg-cream px-6 py-6 shadow-[0_6px_0_#2e1446]">
				<p
					class="mb-3 text-center font-boogaloo text-xl tracking-[0.2em] text-curtain-red uppercase"
				>
					Game Settings
				</p>
				<p class="text-center font-boogaloo text-3xl leading-snug text-ink">
					Pick your difficulties and categories!
				</p>
			</div>

			<!-- Difficulties -->
			<div class="flex flex-col gap-3">
				<div class="flex items-baseline justify-between gap-3">
					<p class="font-boogaloo text-lg tracking-[0.2em] text-cream uppercase">Difficulties</p>
					<p class="font-boogaloo text-base text-title">Pick one or more</p>
				</div>
				<div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
					{#each $settingsStore.difficulties as difficulty (difficulty.key)}
						<label class="flex option items-center gap-3 px-4 py-4 text-left text-xl option-filled">
							<input
								type="checkbox"
								class="sr-only"
								checked={selectedDifficulties.has(difficulty.key)}
								onchange={() => toggleDifficulty(difficulty.key)}
							/>
							<span class="checkbox" aria-hidden="true">
								<svg
									viewBox="0 0 24 24"
									class="size-5"
									fill="none"
									stroke="currentColor"
									stroke-width="4"
									stroke-linecap="round"
									stroke-linejoin="round"><path d="M5 12l5 5L19 7" /></svg
								>
							</span>
							{difficulty.label}
						</label>
					{/each}
				</div>
			</div>

			<!-- Categories -->
			<div class="flex flex-col gap-3">
				<div class="flex items-baseline justify-between gap-3">
					<p class="font-boogaloo text-lg tracking-[0.2em] text-cream uppercase">Categories</p>
					<p class="font-boogaloo text-base text-title">Pick one or more</p>
				</div>
				<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
					{#each $settingsStore.categories as category (category.key)}
						<label
							class="flex option items-center gap-4 px-6 py-5 text-left text-2xl option-filled"
						>
							<input
								type="checkbox"
								class="sr-only"
								checked={selectedCategories.has(category.key)}
								onchange={() => toggleCategory(category.key)}
							/>
							<span class="checkbox" aria-hidden="true">
								<svg
									viewBox="0 0 24 24"
									class="size-5"
									fill="none"
									stroke="currentColor"
									stroke-width="4"
									stroke-linecap="round"
									stroke-linejoin="round"><path d="M5 12l5 5L19 7" /></svg
								>
							</span>
							{category.label}
						</label>
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
