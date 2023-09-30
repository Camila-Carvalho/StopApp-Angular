import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { ConfiguracaoComponent } from './configuracao/configuracao.component';
import { JogoComponent } from './jogo/jogo.component';
import { WebsocketService } from './services/websocket.service';
import { ConfiguracaoService } from './configuracao/configuracao.service';
import { JogoService } from './jogo/jogo.service';

@NgModule({
  declarations: [
    AppComponent,
    ConfiguracaoComponent,
    JogoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  exports:[
    RouterModule
  ],
  providers: [
    ConfiguracaoService,
    JogoService,
    WebsocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
