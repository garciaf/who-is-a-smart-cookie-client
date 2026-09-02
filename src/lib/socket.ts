import { io, type Socket as IOSocket } from 'socket.io-client';
import { browser } from '$app/environment';
import { get } from 'svelte/store';
import { playerStore, connectionStatus } from '$lib/stores/player';

const serverUrl = import.meta.env.VITE_WEBSOCKET_URL;

type Callback = (...args: unknown[]) => void;

class Socket {
	private socket: IOSocket | null = null;
	private listeners: Map<string, Callback[]> = new Map();
	public disconnected = true;

	private readonly maxReconnectAttempts = 10;

	constructor() {
		this.connect();
	}

	private connect(): void {
		this.socket = io(serverUrl, {
			reconnection: true,
			reconnectionAttempts: this.maxReconnectAttempts,
			reconnectionDelay: 1000,
			reconnectionDelayMax: 10000,
			// Called on every connection attempt so the server always gets the current clientId
			auth: (cb) => cb({ clientId: this.getPlayerId() })
		});

		this.socket.on('connect', () => {
			console.log('[Socket] Connected to server');
			this.disconnected = false;
			connectionStatus.set({
				connected: true,
				reconnecting: false,
				reconnectAttempt: 0,
				maxAttempts: this.maxReconnectAttempts,
				lastError: null
			});
		});

		this.socket.on('disconnect', (reason) => {
			console.warn('[Socket] Disconnected from server:', reason);
			this.disconnected = true;
			connectionStatus.update((s) => ({ ...s, connected: false, reconnecting: true }));
		});

		this.socket.io.on('reconnect_attempt', (attempt) => {
			console.log(`[Socket] Reconnection attempt ${attempt}/${this.maxReconnectAttempts}`);
			connectionStatus.update((s) => ({
				...s,
				reconnecting: true,
				reconnectAttempt: attempt,
				maxAttempts: this.maxReconnectAttempts
			}));
		});

		this.socket.io.on('reconnect_failed', () => {
			console.error('[Socket] Max reconnection attempts reached');
			connectionStatus.update((s) => ({
				...s,
				reconnecting: false,
				lastError: 'Max reconnection attempts reached'
			}));
			const callbacks = this.listeners.get('max_reconnect_failed') || [];
			callbacks.forEach((cb) => cb({ attempts: this.maxReconnectAttempts }));
		});

		this.on('connected', (data: unknown) => {
			this.disconnected = false;
			const payload = data as { from: string };
			playerStore.update((state) => ({ ...state, id: payload.from }));
		});

		// Server system events (connected, reconnected, lobby-not-found) send payload flat.
		// Server-routed game events wrap the inner data: { data: {...}, from, lobbyId }.
		this.socket.onAny((event, payload) => {
			const callbacks = this.listeners.get(event) || [];
			const arg =
				payload !== null && typeof payload === 'object' && 'data' in payload
					? (payload as { data: unknown }).data
					: payload;
			callbacks.forEach((cb) => cb(arg));
		});

		this.on('reconnected', (data: unknown) => {
			this.disconnected = false;
			const payload = data as { from: string; lobbyId: string };
			playerStore.update((state) => ({ ...state, id: payload.from, lobbyId: payload.lobbyId }));
		});

		this.on('lobby-not-found', () => {
			console.warn('[Socket] Lobby not found');
		});
	}

	public on(eventName: string, callback: Callback): void {
		if (!this.listeners.has(eventName)) {
			this.listeners.set(eventName, []);
		}
		this.listeners.get(eventName)?.push(callback);
	}

	public emit(event: string, data?: unknown, to?: string): void {
		console.log(`[Socket] Emitting event: ${event}`, data);
		const playerId = this.getPlayerId();

		// These events are handled by dedicated server listeners expecting the payload directly.
		const flatEvents = ['join-lobby', 'request-rejoin', 'player-rejoined-as'];
		if (flatEvents.includes(event)) {
			this.socket?.emit(event, data);
			return;
		}

		this.socket?.emit(event, { data, from: playerId, to: to || null });
	}

	public disconnect(): void {
		this.socket?.disconnect();
	}

	public reconnect(): void {
		this.socket?.connect();
	}

	public retryReconnection(): void {
		if (this.socket) {
			this.socket.io.reconnectionAttempts(this.maxReconnectAttempts);
			this.socket.connect();
		}
		connectionStatus.update((s) => ({ ...s, reconnecting: true, reconnectAttempt: 0 }));
	}

	public getPlayerId(): string | null {
		return get(playerStore).id;
	}

	public getLobbyId(): string | null {
		return get(playerStore).lobbyId;
	}
}

let socket: Socket | null = null;

if (browser) {
	socket = new Socket();
}

export default socket;
