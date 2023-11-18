import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { UserRoom } from '../model/userRoom.model';
import { RoomService } from '../services/room.service';
import { Room } from '../model/room.model';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
})

export class RoomComponent implements OnInit {
  
  public typeRoom: string = ''; //existing/new
  public visibleButtonStartGame: boolean = false;

  public userRoom: UserRoom = new UserRoom();
  public room: Room = new Room();

  constructor (
    private roomService: RoomService,
    private sessionService: SessionService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ){
  }

  ngOnInit(): void {
  this.cdr.detectChanges();
  }

  defineTypeRoom(tipo: string){
    this.typeRoom = tipo;
    this.visibleButtonStartGame = true;
  }

  startGame(){
    if(this.typeRoom === 'new'){
      this.room.CodeRoom = this.room.generateRandomCode();
      this.roomService.connectNewRoom(this.room).subscribe((ret: any) => {
        this.treatReturnConexao(ret);
      });
    }
    else { //Existente
      this.roomService.connectExistingRoom(this.userRoom).subscribe((ret: any) => {
        this.treatReturnConexao(ret);
      });
    }
  }

  treatReturnConexao(ret: any){
    this.sessionService.setRoomLogged(ret.room);
    this.sessionService.setUserRoomLogged(ret.user);
    this.room = ret.room;
    this.userRoom = ret.user;
    this.router.navigateByUrl('/game');
  }

  onKey(tipo: string, event: any){
    switch(tipo){
      case 'playerNameCreator': this.room.PlayerNameCreator = event.target.value; break;
      case 'numberPlayers': this.room.NumberPlayers = event.target.value; break;
      case 'numberRounds': this.room.NumberRounds = event.target.value; break;
      case 'playerName': this.userRoom.Name = event.target.value; break;
      case 'codeRoom': this.userRoom.CodeRoom = event.target.value; break;
    }
  }
}