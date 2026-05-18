import { Socket } from 'socket.io';

export interface SocketClientData {
  userId?: string;
  sessionId?: string;
  childId?: string;
}

export type AuthSocket = Socket<any, any, any, SocketClientData>;

export interface WsClientData {
  sessionId: string;
  childId: string;
}
