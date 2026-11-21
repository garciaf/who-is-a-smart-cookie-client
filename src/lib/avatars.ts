import { asset } from '$app/paths';
import manifest from './avatars.json';

/** A cookie a player can pick. The previews are rendered from the game by tools/cookies/render_avatars.gd. */
export interface Avatar {
	id: string;
	shape: string;
	name: string;
}

export const avatars: Avatar[] = manifest;

export function avatarUrl(id: string): string {
	return asset(`/images/avatars/${id}.webp`);
}

export function isAvatar(id: string | null | undefined): id is string {
	return !!id && avatars.some((a) => a.id === id);
}

/** A random cookie nobody has taken yet, or '' when they are all gone. */
export function randomFreeAvatar(taken: string[]): string {
	const free = avatars.filter((a) => !taken.includes(a.id));
	return free.length ? free[Math.floor(Math.random() * free.length)].id : '';
}
