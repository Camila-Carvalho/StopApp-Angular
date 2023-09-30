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
  public usuarioSala: UsuarioSala = new UsuarioSala();
  public bloqueiaCampos: boolean = false;

  constructor(
    private jogoService: JogoService,
    private sessionService: SessionService,
    private webSocketService: WebsocketService,
    private router: Router
  ){
  }

  ngOnInit() {
    this.jogo = this.jogoService.jogoInit();
    //por enquanto que não tem a API pra buscar o jogo
    this.jogo = this.jogoService.adicionaPartidaJogo(this.jogo);
    //Conecta no websocket
    this.webSocketService.connect();
    this.recebeMensagem();
  }

  recebeMensagem(){
    this.webSocketService.messageReceived.subscribe((mensagem: any) => {
      if(mensagem === 'stop'){
        this.bloqueiaCampos = true;
        this.stopPartida();
      }
      if(mensagem === 'start'){
        this.bloqueiaCampos = false;
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

}
