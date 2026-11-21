<script lang="ts">
	import { asset } from '$app/paths';
	import { avatarUrl, isAvatar } from '$lib/avatars';
	import { playerStore } from '$lib/stores/player';

	interface Props {
		/** Size and effects, e.g. "h-16 w-16 drop-shadow-[0_4px_0_#2e1446]". */
		class?: string;
	}

	let { class: className = '' }: Props = $props();

	// The cookie the player picked, or the show's default cookie until they pick one.
	const avatar = $derived(isAvatar($playerStore.avatar) ? $playerStore.avatar : null);
</script>

{#if avatar}
	<!-- The previews have a little padding, so draw them a touch larger than the default cookie. -->
	<img src={avatarUrl(avatar)} alt="Your cookie" class="scale-125 {className}" />
{:else}
	<img src={asset('/images/avatars/chocolate_chip.webp')} alt="Cookie" class="pixel-perfect {className}" />
{/if}
