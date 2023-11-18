import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { UserRoom } from '../model/userRoom.model';
import { RoomService } from '../services/room.service';
import { Room } from '../model/room.model';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html'
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
    console.log("Teste de inicialização do componente")
  }

  ngOnInit(): void {
    console.log('Antes de detectChanges:', this.room.playerNameCreator);
  this.cdr.detectChanges();
  console.log('Após detectChanges:', this.room.playerNameCreator);
  }

  defineTypeRoom(tipo: string){
    this.typeRoom = tipo;
    this.visibleButtonStartGame = true;
  }

  startGame(){
    if(this.typeRoom === 'new'){
      this.room.codeRoom = this.room.generateRandomCode();
      this.roomService.connectNewRoom(this.room).subscribe((ret: any) => {
        this.treatReturnConexao(ret);
      });
    }
    else { //Existente
      this.roomService.connectExistingRoom(this.userRoom).subscribe((ret: any) => {
        this.treatReturnConexao(ret);
      });
    }

    console.log("Iniciou e foi pra rota");
    this.router.navigateByUrl('/game');
  }

  treatReturnConexao(ret: any){
    this.sessionService.setRoomLogged(ret.room);
    this.sessionService.setUserRoomLogged(ret.userRoom);
    this.router.navigateByUrl('/game');
  }
}