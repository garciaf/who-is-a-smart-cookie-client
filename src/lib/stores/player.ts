import { writable } from 'svelte/store';
import { persisted } from 'svelte-persisted-store';

export interface GamePlayer {
	id: string;
	name: string;
	balance: number;
	color: string;
	points: number;
}

export interface Category {
	label: string;
	difficulty: string;
}

export interface Notification {
	message: string;
	author: string;
}

export interface ConnectionStatus {
	connected: boolean;
	reconnecting: boolean;
	reconnectAttempt: number;
	maxAttempts: number;
	lastError: string | null;
}

export const playerStore = persisted(
	'player',
	{
		id: null as string | null,
		lobbyId: '',
		name: 'Guest',
		balance: 0
	},
	{ storage: 'session' }
);

export const gameStore = persisted(
	'game',
	{
		players: [] as GamePlayer[],
		betPresets: [1, 2, 3, 4] as number[]
	},
	{ storage: 'session' }
);

export const loadingMessage = persisted(
	'loadingMessage',
	{ message: 'Look at the screen!' },
	{ storage: 'session' }
);

export const questionStore = persisted(
	'question',
	{
		category: '',
		difficulty: '',
		text: '',
		answers: [] as string[]
	},
	{ storage: 'session' }
);

export const categoryStore = persisted(
	'category',
	{
		categories: [] as Category[]
	},
	{ storage: 'session' }
);

export const notifications = writable<Notification[]>([]);

export const connectionStatus = writable<ConnectionStatus>({
	connected: false,
	reconnecting: false,
	reconnectAttempt: 0,
	maxAttempts: 10,
	lastError: null
});
