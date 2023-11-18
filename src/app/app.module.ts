import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { WebsocketService } from './services/websocket.service';
import { SessionService } from './services/session.service';
import { HttpClientModule } from '@angular/common/http';
import { ModalLoadingComponent } from './modal-loading/modal-loading/modal-loading.component';
import { RoomService } from './services/room.service';
import { GameService } from './services/game.service';
import { RoomComponent } from './room/room.component';
import { GameComponent } from './game/game.component';

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
    RouterModule.forRoot(ROUTES)
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
