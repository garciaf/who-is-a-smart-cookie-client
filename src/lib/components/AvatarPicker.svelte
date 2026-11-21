<script lang="ts">
	import { avatars, avatarUrl } from '$lib/avatars';

	interface Props {
		/** Id of the chosen cookie. */
		value: string;
		/** Cookies other players already have. */
		taken?: string[];
		disabled?: boolean;
	}

	let { value = $bindable(), taken = [], disabled = false }: Props = $props();
</script>

<div
	role="radiogroup"
	aria-label="Choose your cookie"
	class="grid max-h-72 grid-cols-5 gap-2 overflow-y-auto rounded-2xl border-2 border-plate/30 bg-stage-dark p-2"
>
	{#each avatars as avatar (avatar.id)}
		{@const isTaken = taken.includes(avatar.id) && avatar.id !== value}
		<button
			type="button"
			role="radio"
			aria-checked={value === avatar.id}
			aria-label={isTaken ? `${avatar.name} (taken)` : avatar.name}
			title={isTaken ? `${avatar.name} — taken` : avatar.name}
			disabled={disabled || isTaken}
			onclick={() => (value = avatar.id)}
			class="relative aspect-square rounded-xl border-2 p-1 transition-all
				{value === avatar.id
				? 'scale-105 border-plate bg-gold/20 shadow-[0_3px_0_#2e1446]'
				: 'border-transparent hover:border-lavender hover:bg-lavender/10'}
				{isTaken ? 'cursor-not-allowed opacity-30 grayscale' : 'cursor-pointer'}"
		>
			<img
				src={avatarUrl(avatar.id)}
				alt=""
				width="160"
				height="160"
				loading="lazy"
				class="h-full w-full object-contain"
			/>
		</button>
	{/each}
</div>
