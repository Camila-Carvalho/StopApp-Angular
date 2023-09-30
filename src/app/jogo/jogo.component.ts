import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Jogo } from './jogo.model';
import { JogoService } from './jogo.service';
import { Partida } from './partida.model';
import { SessionService } from '../services/session.service';
import { UsuarioSala } from '../sala/usuario-sala.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html'
})
export class JogoComponent implements OnInit {

  public segundosIniciar: number = 10;
  public jogo: Jogo = new Jogo;
  public letraPartida: string = "A";
  public usuarioSala: UsuarioSala = new UsuarioSala();

  constructor(
    private jogoService: JogoService,
    private sessionService: SessionService,
    private router: Router
  ){
  }

  ngOnInit() {
    this.jogo = this.jogoService.jogoInit();
    //por enquanto que não tem a API pra buscar o jogo
    this.jogo = this.jogoService.adicionaPartidaJogo(this.jogo);
  }

  novaPartida(letra: string){
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
    this.jogoService.stopJogo(this.jogo).subscribe((ret: any) => {
      this.jogo = ret.jogo;
      this.letraPartida = ret.letra;
    }, e => {
      console.log("Erro: ", e);
    });
  }

  finalPartida(){
    this.router.navigateByUrl('/ranking');
  }

}
