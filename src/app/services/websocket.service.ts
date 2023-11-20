import { Injectable } from '@angular/core';
import { Socket, SocketIoConfig } from 'ngx-socket-io';  
import { UserRoom } from '../model/userRoom.model';
import { URL_API } from '../app.api';
import { SessionService } from './session.service';
import { Observable } from 'rxjs';

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
    this.socket.emit('message', message);
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
