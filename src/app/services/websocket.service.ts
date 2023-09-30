import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class WebsocketService {

  public socket: WebSocket | undefined;
  public messageReceived: Subject<string> = new Subject<string>();

  constructor() { }

  connect(): void {
    this.socket = new WebSocket('wss://your-websocket-url');

    this.socket.onopen = () => {
      console.log('WebSocket connection established.');
    };

    this.socket.onmessage = (event) => {
      const message = event.data;
      console.log('Received message:', message);
      this.messageReceived.next(message);
    };

    this.socket.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  sendMessage(message: string): void {
    console.log("Enviando a mensagem:", message);
    if(this.socket != undefined)
      this.socket.send(message);
  }

  closeConnection(): void {
    console.log("Fechando a conexão do webSocket");
    if(this.socket != undefined)
      this.socket.close();
  }
}
