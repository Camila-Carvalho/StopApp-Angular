import { Component, Input, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';

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
    private sessionService: SessionService
  ){
  }

  ngOnInit(){
    this.codeRoom = this.sessionService.getRoomLogged().codeRoom;
    this.openPopup();
  }

  openPopup() {
    this.displayStyle = "block";
  }
  
  closePopup() {
    this.displayStyle = "none";
  }
}
