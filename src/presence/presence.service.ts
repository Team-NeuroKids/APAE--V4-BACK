import { Injectable } from '@nestjs/common';

@Injectable()
export class PresenceService {
  private activeConnections = new Map<string, Set<string>>();

  addConnection(userId: string, socketId: string): void {
    if (!this.activeConnections.has(userId)) {
      this.activeConnections.set(userId, new Set());
    }
    this.activeConnections.get(userId)!.add(socketId);
  }

  removeConnection(userId: string, socketId: string): void {
    const userSockets = this.activeConnections.get(userId);
    if (userSockets) {
      userSockets.delete(socketId);
      if (userSockets.size === 0) {
        this.activeConnections.delete(userId);
      }
    }
  }

  isUserOnline(userId: string): boolean {
    return this.activeConnections.has(userId);
  }

  getOnlineUsers(): string[] {
    return Array.from(this.activeConnections.keys());
  }
}
