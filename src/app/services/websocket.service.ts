import { Injectable } from '@angular/core';
import { Socket, SocketIoConfig } from 'ngx-socket-io';  
import { UserRoom } from '../model/userRoom.model';
import { URL_API } from '../app.api';
import { SessionService } from './session.service';
import { Observable } from 'rxjs';
import { MessageWebSocket } from '../model/messageWebSocket.model';

@Injectable()
export class WebsocketService {

  constructor(
    private socket: Socket,
    private sessionService: SessionService,
  ) {
  }

  connect(userRoom: UserRoom): void {
    this.socket.connect();
    this.socket.emit('connection');
    this.socket.emit('connectionUser', userRoom);
    this.sendMessage("Teste enviando mensagem");
  }

  sendMessage(message: string): void {
    let socketMessage = new MessageWebSocket;
    socketMessage.CodeRoom = this.sessionService.getRoomLogged().CodeRoom;
    socketMessage.Message = message;
    this.socket.emit('message', socketMessage);
  }

  updateUserConnection(userRoom: UserRoom){
    this.socket.emit('connectionUser', userRoom);
  }

  // Método para ouvir mensagens do servidor WebSocket
  onMessage(): any {
    return this.socket.fromEvent('message');
  }

  closeConnection(): void {
    this.socket.emit('disconnect');
    this.socket.disconnect('disconnect');
  }
}
