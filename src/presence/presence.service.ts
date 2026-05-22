import { Injectable } from '@nestjs/common';

@Injectable()
export class PresenceService {
  // Mapa armazenando: userId => lastHeartbeatTime (milissegundos)
  private activeConnections = new Map<string, number>();

  updateHeartbeat(userId: string): void {
    this.activeConnections.set(userId, Date.now());
  }

  // Mantendo compatibilidade com o GlobalGateway que ainda usa Websockets
  addConnection(userId: string, socketId: string): void {
    this.updateHeartbeat(userId);
  }

  removeConnection(userId: string, socketId: string): void {
    // Agora é limpo automaticamente após 60s
  }

  isUserOnline(userId: string): boolean {
    const lastSeen = this.activeConnections.get(userId);
    if (!lastSeen) return false;
    // Considera online se o último ping foi há menos de 60 segundos
    return Date.now() - lastSeen < 60000;
  }

  getOnlineUsers(): string[] {
    const now = Date.now();
    const onlineUsers: string[] = [];

    for (const [userId, lastSeen] of this.activeConnections.entries()) {
      if (now - lastSeen < 60000) {
        onlineUsers.push(userId);
      } else {
        // Limpar inativos
        this.activeConnections.delete(userId);
      }
    }

    return onlineUsers;
  }
}
