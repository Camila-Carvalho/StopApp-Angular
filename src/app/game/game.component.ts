import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { WebsocketService } from '../services/websocket.service';
import { UserRoom } from '../model/userRoom.model';
import { RoundGame } from '../model/roundGame.model';
import { GameService } from '../services/game.service';
import { UserRoundGame } from '../model/userRoundGame.model';
import { Room } from '../model/room.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html'
})
export class GameComponent implements OnInit {

  public letterRound: string = "A";
  public letterShowing: string = "-";
  public roundGame: RoundGame = new RoundGame();
  public userRoundGame: UserRoundGame = new UserRoundGame();
  public userRoom: UserRoom = new UserRoom();
  public room: Room = new Room;
  public blockFields: boolean = true;
  public load: boolean = false;
  private countStart: number = 10;

  constructor(
    private gameService: GameService,
    private sessionService: SessionService,
    private webSocketService: WebsocketService,
    private router: Router
  ){
  }

  ngOnInit() {
    this.load = true;
    this.room = this.sessionService.getRoomLogged();
    this.userRoom = this.sessionService.getUserRoomLogged();
    //Conecta no websocket
    this.webSocketService.connect(this.userRoom);
    this.recebeMensagem();
    //Enquanto não recebe a notificação e websocket, testei assim
    //this.timeOutIniciar();
  }

  recebeMensagem(){
    console.log("Entrou na função do game");
    this.webSocketService.onMessage().subscribe((message: any) => { 
      console.log("mensagem que voltou: ", message);
      if(message === 'connectUser'){
        this.webSocketService.updateUserConnection(this.userRoom);
      }
      if(message === 'stop'){
        this.blockFields = true;
        this.stopPartida();
      }
      if(message === 'start'){
        this.novaPartida();
      }
    });
  }

  novaPartida(){
    //Verifica se é a última partida, se for vai pra tela de ranking
    if(this.roundGame.NumberRound > this.roundGame.NumberOfRounds)//
      this.finalPartida();
    else{
      //Busca uma nova partida para o jogo, retorna um objeto com o id da partida e letra sorteada
      this.gameService.startGame(this.roundGame).subscribe((ret: any) => {
        this.roundGame = ret.roundGame;
        this.letterRound = ret.letter;
        this.contagemMostraLetra();
      });
    }
  }

  stopPartida(){
    this.blockFields = true;
    console.log("Respostas", this.userRoundGame.Answers);
    this.gameService.stopGame(this.userRoundGame).subscribe((ret: any) => {
      this.roundGame = ret.roundGame;
      this.letterRound = ret.letra;
    }, e => {
      this.blockFields = false;
      console.log("Erro: ", e);
    });
  }

  finalPartida(){
    this.router.navigateByUrl('/ranking');
  }

  contagemMostraLetra(){
    this.load = false;
    setTimeout(() => { 
      if(this.countStart > 0){
        this.letterShowing = this.countStart.toString();
        this.countStart--;
        this.contagemMostraLetra();
      }
      else {
        this.letterShowing = this.letterRound;
        this.blockFields = false;
      }
    }, 1000);
  }

  timeOutIniciar(){
    setTimeout(() => { this.load = false; this.contagemMostraLetra(); }, 300000); // 300000 milissegundos = 5 minutos
  }

  onBlur(categoria: string, input: any){
    this.userRoundGame.Answers.forEach(answers => { if(answers.Category === categoria) answers.Answer = input.target.value });
  }
}
