import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Jogo } from './jogo.model';
import { JogoService } from './jogo.service';
import { Partida } from './partida.model';
import { SessionService } from '../services/session.service';
import { UsuarioSala } from '../sala/usuario-sala.model';
import { Router } from '@angular/router';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html'
})
export class JogoComponent implements OnInit {

  public segundosIniciar: number = 10;
  public jogo: Jogo = new Jogo;
  public letraPartida: string = "A";
  public letraShowing: string = "-";
  public usuarioSala: UsuarioSala = new UsuarioSala();
  public bloqueiaCampos: boolean = true;
  public load: boolean = false;
  private contagemStart: number = 10;

  constructor(
    private jogoService: JogoService,
    private sessionService: SessionService,
    private webSocketService: WebsocketService,
    private router: Router
  ){
  }

  ngOnInit() {
    this.load = true;
    this.jogo = this.jogoService.jogoInit();
    //por enquanto que não tem a API pra buscar o jogo
    this.jogo = this.jogoService.adicionaPartidaJogo(this.jogo);
    //Conecta no websocket
    this.webSocketService.connect();
    this.recebeMensagem();
    this.timeOutTeste();
  }

  recebeMensagem(){
    this.webSocketService.messageReceived.subscribe((mensagem: any) => {
      if(mensagem === 'stop'){
        this.bloqueiaCampos = true;
        this.stopPartida();
      }
      if(mensagem === 'start'){
        this.novaPartida();
      }
    });
  }

  novaPartida(){
    //Verifica se é a última partida, se for vai pra tela de ranking
    if(this.jogo.numeroPartidaAtual > this.jogo.numeroPartidas)
      this.finalPartida();
    else{
      //Busca uma nova partida para o jogo, retorna um objeto com o id da partida e letra sorteada
      this.jogoService.startJogo(this.jogo).subscribe((ret: any) => {
        this.jogo = ret.jogo;
        this.letraPartida = ret.letra;
        this.contagemMostraLetra();
      });
    }
  }

  stopPartida(){
    this.bloqueiaCampos = true;
    this.jogoService.stopJogo(this.jogo).subscribe((ret: any) => {
      this.jogo = ret.jogo;
      this.letraPartida = ret.letra;
    }, e => {
      this.bloqueiaCampos = false;
      console.log("Erro: ", e);
    });
  }

  finalPartida(){
    this.router.navigateByUrl('/ranking');
  }

  contagemMostraLetra(){
    this.load = false;
    setTimeout(() => { 
      if(this.contagemStart > 0){
        this.letraShowing = this.contagemStart.toString();
        this.contagemStart--;
        this.contagemMostraLetra();
      }
      else {
        this.letraShowing = this.letraPartida;
        this.bloqueiaCampos = false;
      }
    }, 1000);
  }

  timeOutTeste(){
    setTimeout(() => { this.load = false; this.contagemMostraLetra(); }, 1000);
  }
}
