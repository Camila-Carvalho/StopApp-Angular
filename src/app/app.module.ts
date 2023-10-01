import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { ConfiguracaoSalaComponent } from './sala/configuracao-sala.component';
import { JogoComponent } from './jogo/jogo.component';
import { WebsocketService } from './services/websocket.service';
import { ConfiguracaoSalaService } from './sala/configuracao-sala.service';
import { JogoService } from './jogo/jogo.service';
import { SessionService } from './services/session.service';
import { HttpClientModule } from '@angular/common/http';
import { ModalLoadingComponent } from './modal-loading/modal-loading/modal-loading.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfiguracaoSalaComponent,
    JogoComponent,
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
    ConfiguracaoSalaService,
    JogoService,
    WebsocketService,
    SessionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
