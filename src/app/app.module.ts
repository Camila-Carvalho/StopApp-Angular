import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { URL_API } from './app.api';

import { WebsocketService } from './services/websocket.service';
import { SessionService } from './services/session.service';
import { RoomService } from './services/room.service';
import { GameService } from './services/game.service';
import { ModalLoadingComponent } from './modal-loading/modal-loading/modal-loading.component';
import { RoomComponent } from './room/room.component';
import { GameComponent } from './game/game.component';

const config: SocketIoConfig = {
	url: URL_API, // socket server url;
	options: {
		transports: ['websocket'],
    reconnection: true,
    reconnectionAttempts: 5, //Tenta reconectar 5 vezes
    reconnectionDelay: 1000 //Em 1 segundo
	}
}

@NgModule({
  declarations: [
    GameComponent,
    RoomComponent,
    AppComponent,
    ModalLoadingComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    SocketIoModule.forRoot(config), 
  ],
  exports:[
    RouterModule
  ],
  providers: [
    GameService,
    RoomService,
    WebsocketService,
    SessionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
