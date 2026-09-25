import { goto } from '$app/navigation';
import { resolve } from '$app/paths';
import { browser } from '$app/environment';
import socket from '$lib/socket';
import {
	playerStore,
	gameStore,
	loadingMessage,
	questionStore,
	categoryStore,
	settingsStore,
	notifications
} from '$lib/stores/player';

class LiveNavigation {
	constructor() {
		this.onRefresh();

		socket?.on('change-screen', (data: unknown) => {
			const payload = data as {
				screen: string;
				message?: string;
				category?: string;
				difficulty?: string;
				text?: string;
				answers?: string[];
				roundCount?: number;
				maxRoundCount?: number;
				categories?: { label: string; difficulty: string; key: string }[];
				categorySettings?: { label: string; key: string }[];
				difficulties?: { label: string; key: string }[];
				players?: { id: string; name: string }[];
				betPresets?: number[];
			};

			if (payload.screen === 'loading') {
				loadingMessage.set({ message: payload.message || 'Look at the screen!' });
				goto(resolve('/loading'));
			} else if (payload.screen === 'waiting-room') {
				loadingMessage.set({ message: 'Waiting for the game to start...' });
				goto(resolve('/loading'));
			} else if (payload.screen === 'category') {
				categoryStore.set({ categories: payload.categories || [] });
				gameStore.set({
					players: payload.players || [],
					betPresets: payload.betPresets || [1, 2, 3, 4],
					roundCount: payload.roundCount || 0,
					maxRoundCount: payload.maxRoundCount || 0
				});
				goto(resolve('/category'));
			} else if (payload.screen === 'settings') {
				settingsStore.set({
					categories: payload.categorySettings || [],
					difficulties: payload.difficulties || []
				});
				goto(resolve('/settings'));
			} else if (payload.screen === 'question') {
				questionStore.set({
					category: payload.category || '',
					difficulty: payload.difficulty || '',
					text: payload.text || '',
					answers: payload.answers || []
				});
				goto(resolve('/question'));
			} else if (payload.screen === 'question-open') {
				questionStore.set({
					category: payload.category || '',
					difficulty: payload.difficulty || '',
					text: payload.text || '',
					answers: []
				});
				goto(resolve('/question-open'));
			} else if (payload.screen === 'bet') {
				gameStore.set({
					players: payload.players || [],
					betPresets: payload.betPresets || [1, 2, 3, 4]
				});
				questionStore.set({
					category: payload.category || '',
					difficulty: payload.difficulty || '',
					text: '',
					answers: []
				});
				goto(resolve('/bet'));
			}
		});

		socket?.on('player-joined-lobby', (data: unknown) => {
			const { id } = data as { id: string; name: string };
			playerStore.update((state) => ({ ...state, id }));
			loadingMessage.set({ message: 'Waiting for the game to start...' });
			goto(resolve('/loading'));
		});

		socket?.on('update-player', (data: unknown) => {
			const { id, lobbyId, name, balance } = data as {
				id: string;
				lobbyId: string;
				name: string;
				balance: number;
			};
			playerStore.set({
				id: id ?? null,
				lobbyId: lobbyId || '',
				name: name || '',
				balance: balance || 0
			});
		});

		socket?.on('update-player-state', (data: unknown) => {
			const { id, name, balance, lobbyId } = data as {
				id?: string;
				name?: string;
				balance?: number;
				lobbyId?: string;
			};
			playerStore.update((current) => ({
				...current,
				id: id ?? current.id,
				name: name || current.name,
				lobbyId: lobbyId || current.lobbyId,
				balance: balance ?? current.balance
			}));
		});

		socket?.on('update-players-list', (data: unknown) => {
			const { players } = data as { players: { id: string; name: string }[] };
			gameStore.update((current) => ({ ...current, players }));
		});

		socket?.on('update-score', (data: unknown) => {
			const { balance } = data as { balance: number };
			playerStore.update((current) => ({ ...current, balance: balance || 0 }));
		});

		socket?.on('new-message', (data: unknown) => {
			const { message, author } = data as { message: string; author: string };
			notifications.update((n) => {
				n.push({ message, author });
				return n;
			});
			setTimeout(() => {
				notifications.update((n) => n.filter((notif) => notif.message !== message));
			}, 3000);
		});
	}

	onRefresh() {
		if (!browser) return;

		const navEntries = performance.getEntriesByType('navigation');
		// @ts-ignore
		const navType = navEntries[0]?.type || performance.navigation?.type;

		if (navType === 'reload') {
			socket?.emit('player-reconnected', { message: 'Page was refreshed' });
		}

		if (sessionStorage.getItem('refreshing') === 'true') {
			sessionStorage.removeItem('refreshing');
		}

		window.addEventListener('beforeunload', () => {
			sessionStorage.setItem('refreshing', 'true');
		});
	}
}

let liveNavigation = null;

if (browser) {
	liveNavigation = new LiveNavigation();
}

export default liveNavigation;
