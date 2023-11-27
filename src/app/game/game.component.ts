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
  private gameGoingOn: boolean = false;
  public modalStop: boolean = false;
  public messageModalStop: string = "Botão STOP acionado!";
  public tipoLoading: string = "stop";
  public clicouStop: boolean = false;
  public blockButtonModal: boolean = true;

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
    //this.webSocketService.connect(this.userRoom);
    //this.recebeMensagem();
    this.modalStop = true;
  }

  recebeMensagem(){
    this.webSocketService.onMessage().subscribe((message: any) => { 
      console.log("mensagem que voltou: ", message);
      if(message.CodeRoom === this.room.CodeRoom){
        if(message.Message === 'connectUser'){
          this.webSocketService.updateUserConnection(this.userRoom);
        }
        if(message.Message === 'stop' && this.gameGoingOn){
          this.blockFields = true;
          if(!this.clicouStop){
            const dataAtual = new Date();
            this.userRoundGame.DateTimeStop = new Date(dataAtual.setSeconds(dataAtual.getSeconds() + 1));
          }
          this.enviaRespostas();
        }
        if(message.Message === 'start' && !this.gameGoingOn){
          this.novaPartida();
        }
        if(message.Message === 'ranking'){
          this.finalPartida();
        }
      }
    });
  }

  clickButtonStop(){
    this.blockFields = true;
    this.modalStop = true;
    this.clicouStop = true;
    this.userRoundGame.DateTimeStop = new Date();
    //Envia a mensagem de stop
    this.webSocketService.sendMessage("stop");
    this.enviaRespostas();
  }

  stopPartida(){
    this.blockFields = true;
    if(!this.clicouStop){
      const dataAtual = new Date();
      this.userRoundGame.DateTimeStop = new Date(dataAtual.setSeconds(dataAtual.getSeconds() + 1));
    }
    this.enviaRespostas();
  }

  novaPartida(){
    //Busca uma nova partida para o jogo, retorna um objeto com o id da partida e letra sorteada
    if(!this.room.Id)
      return;
    if(!this.modalStop)
      this.modalStop = true;
    this.gameService.getRoundGame(this.room.CodeRoom).subscribe((ret: any) => {
      this.clicouStop = false;
      this.roundGame = ret.roundGame;
      if(!this.roundGame || this.roundGame.Finished){
        this.load = false;
        this.modalStop = false;
        this.finalPartida();
      }
      else{
        this.userRoundGame.Answers = this.userRoundGame.generateAnswerCategoryRound();
        this.letterShowing = "-";
        this.letterRound = ret.roundGame.Letter;
        this.gameGoingOn = true;
        this.countStart = 10;
        this.contagemMostraLetra();
      }
    });
  }

  enviaRespostas(){
    this.blockFields = true;
    if(!this.modalStop)
      this.modalStop = true;
    this.userRoundGame.IdRoundGame = this.roundGame.Id;
    this.userRoundGame.IdUser = this.sessionService.getUserRoomLogged().Id;
    this.gameGoingOn = false;
    this.gameService.stopGame(this.userRoundGame).subscribe((ret: any) => {
      this.roundGame = ret.roundGame;
      this.userRoundGame.Answers = this.userRoundGame.generateAnswerCategoryRound();
    }, e => {
      this.blockFields = false;
      console.log("Erro: ", e);
    });
  }

  finalPartida(){
    this.modalStop = false;
    this.router.navigateByUrl('/');
    //this.router.navigateByUrl('/ranking');
  }

  contagemMostraLetra(){
    this.load = false;
    this.modalStop = false;
    setTimeout(() => { 
      if(this.countStart > 0){
        this.letterShowing = this.countStart.toString();
        this.countStart--;
        this.contagemMostraLetra();
      }
      else {
        this.letterShowing = this.letterRound;
        this.blockFields = false;
        this.timePartida();
      }
    }, 1000);
  }

  timeOutIniciar(){
    setTimeout(() => { this.load = false; this.contagemMostraLetra(); }, 60000); // 300000 milissegundos = 5 minutos
  }

  timePartida(){
    setTimeout(() => { this.stopPartida(); this.blockButtonModal = false; }, 180000); // 3 minutos
  }

  notifyNewRound(event: any){
    this.novaPartida();
  }

  onBlur(categoria: string, input: any){
    this.userRoundGame.Answers.forEach(answers => { if(answers.Category === categoria) answers.Answer = input.target.value });
  }
}
