import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { SessionService } from 'src/app/services/session.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-modal-loading',
  templateUrl: './modal-loading.component.html'
})
export class ModalLoadingComponent implements OnInit {
  @Output() buttomModal = new EventEmitter<boolean>();
  @Input() tipoLoading: string = "start";
  @Input() mensagem: string = "";
  public displayStyle = "none";
  public codeRoom: string = "-";
  public playerCreator: boolean = false;
  
  constructor(
    private gameService: GameService,
    private sessionService: SessionService,
    private webSocketService: WebsocketService,
  ){
  }

  ngOnInit(){
    let room = this.sessionService.getRoomLogged();
    let userRoom = this.sessionService.getUserRoomLogged();
    this.codeRoom = room.CodeRoom;
    if(room.PlayerNameCreator === userRoom.Name){
      this.playerCreator = true;
    }
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
    console.log("Veio aqui no modal pra enviar mensagem");
    this.webSocketService.sendMessage('start');
    this.buttomModal.emit(true);
  }
}
