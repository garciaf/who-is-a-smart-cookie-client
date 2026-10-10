import { writable } from 'svelte/store';
import { persisted } from 'svelte-persisted-store';

export interface GamePlayer {
	id: string;
	name: string;
	balance: number;
	color: string;
}

export interface Category {
	label: string;
	key: string;
	question: string;
	difficulty: string;
}

export interface CategorySetting {
	label: string;
	key: string;
	question: string;
}

export interface DifficultySetting {
	label: string;
	key: string;
	question: string;
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
		betPresets: [1, 2, 3, 4] as number[],
		roundCount: 0 as number,
		maxRoundCount: 0 as number
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
		answers: [] as string[],
		hasImage: false
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

export const settingsStore = persisted(
	'settings',
	{
		categories: [] as CategorySetting[],
		difficulties: [] as DifficultySetting[]
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
