import { Component, Input, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { SessionService } from 'src/app/services/session.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-modal-loading',
  templateUrl: './modal-loading.component.html'
})
export class ModalLoadingComponent implements OnInit {
  @Input() tipoLoading: string = "start";
  @Input() mensagem: string = "";
  public displayStyle = "none";
  public codeRoom: string = "-";
  
  constructor(
    private gameService: GameService,
    private sessionService: SessionService,
    private webSocketService: WebsocketService,
  ){
  }

  ngOnInit(){
    this.codeRoom = this.sessionService.getRoomLogged().CodeRoom;
    this.openPopup();
  }

  openPopup() {
    this.displayStyle = "block";
  }
  
  closePopup() {
    this.displayStyle = "none";
  }

  notifyNewRound(){
    //Manda criar nova rodada
    this.gameService.createOrUpdateRound(this.codeRoom).subscribe(retorno => {
      if(retorno && !retorno.Finished)
        this.webSocketService.sendMessage('start');
      if(retorno && retorno.Finished)
        this.webSocketService.sendMessage('ranking');
    });
  }
}
