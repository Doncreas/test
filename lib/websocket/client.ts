/**
 * WebSocket client for real-time driver location tracking
 * Handles connection, reconnection, and fallback to polling
 */

import { LocationUpdate, WebSocketMessage } from '@/types/tracking';

export class TrackingWebSocket {
  private ws: WebSocket | null = null;
  private url: string;
  private bookingId: string;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 3000;
  private heartbeatInterval: ReturnType<typeof setInterval> | null = null;
  private listeners: Map<string, Function[]> = new Map();
  private isIntentionallyClosed = false;

  constructor(bookingId: string, wsUrl?: string) {
    this.bookingId = bookingId;
    this.url = wsUrl || this.buildWsUrl();
  }

  private buildWsUrl(): string {
    const protocol = typeof window !== 'undefined' && window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = typeof window !== 'undefined' ? window.location.host : 'localhost:3000';
    return `${protocol}//${host}/api/bookings/${this.bookingId}/ws`;
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.url);
        this.isIntentionallyClosed = false;

        this.ws.onopen = () => {
          console.log(`[WebSocket] Connected to tracking for booking ${this.bookingId}`);
          this.reconnectAttempts = 0;
          this.startHeartbeat();
          this.emit('connected');
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const message: WebSocketMessage = JSON.parse(event.data);
            this.handleMessage(message);
          } catch (err) {
            console.error('[WebSocket] Failed to parse message:', err);
          }
        };

        this.ws.onerror = (error) => {
          console.error('[WebSocket] Connection error:', error);
          this.emit('error', { message: 'WebSocket connection error' });
          reject(error);
        };

        this.ws.onclose = () => {
          console.log('[WebSocket] Connection closed');
          this.stopHeartbeat();
          
          if (!this.isIntentionallyClosed) {
            this.attemptReconnect();
          }
          this.emit('disconnected');
        };
      } catch (err) {
        console.error('[WebSocket] Connection failed:', err);
        reject(err);
      }
    });
  }

  private handleMessage(message: WebSocketMessage): void {
    switch (message.type) {
      case 'location-update':
        this.emit('location-update', message.data as LocationUpdate);
        break;
      case 'driver-arrived':
        this.emit('driver-arrived', message.data);
        break;
      case 'trip-completed':
        this.emit('trip-completed', message.data);
        break;
      case 'ping':
        this.send({ type: 'pong', timestamp: new Date().toISOString() });
        break;
      case 'error':
        this.emit('error', message.data);
        break;
      default:
        console.warn('[WebSocket] Unknown message type:', message.type);
    }
  }

  private startHeartbeat(): void {
    this.heartbeatInterval = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.send({ type: 'ping', timestamp: new Date().toISOString() });
      }
    }, 30000); // Ping every 30 seconds
  }

  private stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
      console.log(`[WebSocket] Attempting to reconnect (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts}) in ${delay}ms`);
      
      setTimeout(() => {
        this.connect().catch((err) => {
          console.error('[WebSocket] Reconnection failed:', err);
        });
      }, delay);
    } else {
      console.warn('[WebSocket] Max reconnection attempts reached. Falling back to polling.');
      this.emit('fallback-to-polling');
    }
  }

  send(message: WebSocketMessage): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.warn('[WebSocket] WebSocket not ready. Message not sent:', message);
    }
  }

  on(event: string, callback: Function): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  off(event: string, callback: Function): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  private emit(event: string, data?: any): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach((callback) => callback(data));
    }
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  disconnect(): void {
    this.isIntentionallyClosed = true;
    this.stopHeartbeat();
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  destroy(): void {
    this.disconnect();
    this.listeners.clear();
  }
}

// Polling fallback when WebSocket is unavailable
export class LocationPoller {
  private bookingId: string;
  private pollingInterval: ReturnType<typeof setInterval> | null = null;
  private listeners: Map<string, Function[]> = new Map();
  private lastTimestamp = '';

  constructor(bookingId: string) {
    this.bookingId = bookingId;
  }

  start(intervalMs = 15000): void {
    if (this.pollingInterval) {
      console.warn('[LocationPoller] Already polling');
      return;
    }

    console.log(`[LocationPoller] Starting polling every ${intervalMs}ms`);
    this.emit('started');

    this.pollingInterval = setInterval(() => {
      this.poll();
    }, intervalMs);

    // Poll immediately
    this.poll();
  }

  private async poll(): Promise<void> {
    try {
      const res = await fetch(`/api/bookings/${this.bookingId}/tracking`, {
        cache: 'no-store'
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();

      // Only emit if location was updated
      if (data.location.updatedAt !== this.lastTimestamp) {
        this.lastTimestamp = data.location.updatedAt;
        this.emit('location-update', {
          bookingId: this.bookingId,
          driverId: data.driver.id,
          location: data.location,
          speed: data.location.speed,
          heading: data.location.heading
        });
      }

      if (data.booking.status === 'completed') {
        this.emit('trip-completed', data);
        this.stop();
      } else if (data.booking.status === 'arrived') {
        this.emit('driver-arrived', data.driver);
      }
    } catch (err) {
      console.error('[LocationPoller] Polling error:', err);
      this.emit('error', { message: 'Polling failed' });
    }
  }

  on(event: string, callback: Function): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  off(event: string, callback: Function): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  private emit(event: string, data?: any): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach((callback) => callback(data));
    }
  }

  stop(): void {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
      console.log('[LocationPoller] Stopped polling');
      this.emit('stopped');
    }
  }

  destroy(): void {
    this.stop();
    this.listeners.clear();
  }
}
