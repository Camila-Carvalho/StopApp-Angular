import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'stop-app';

  constructor(
    
    ){
  }
}
