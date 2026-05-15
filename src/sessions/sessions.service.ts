import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionsService {
  private activeSessions = new Map<string, Set<string>>();

  addSession(userId: string, socketId: string) {
    if (!this.activeSessions.has(userId)) {
      this.activeSessions.set(userId, new Set());
    }
    this.activeSessions.get(userId)!.add(socketId);
  }

  removeSession(userId: string, socketId: string) {
    const userSockets = this.activeSessions.get(userId);
    if (userSockets) {
      userSockets.delete(socketId);
      if (userSockets.size === 0) {
        this.activeSessions.delete(userId);
      }
    }
  }

  isUserOnline(userId: string): boolean {
    return this.activeSessions.has(userId);
  }

  getOnlineUsers(): string[] {
    return Array.from(this.activeSessions.keys());
  }
}
