import { Component } from '@angular/core';
import { UsuarioSala } from './usuario-sala.model';
import { Sala } from './sala.model';
import { Router } from '@angular/router';
import { ConfiguracaoSalaService } from './configuracao-sala.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-configuracao-sala',
  templateUrl: './configuracao-sala.component.html'
})

export class ConfiguracaoSalaComponent {
  
  public tipoSala: string = '';
  public visibleButtonIniciarJogo: boolean = false;

  public nameJogador: string = '';
  public codigoSala: string = '';
  public numeroParticipantes: number = 1;
  public numeroJogadas: number = 1;

  public usuarioSala: UsuarioSala = new UsuarioSala();
  public sala: Sala = new Sala();

  constructor (
    private configuracaoSalaService: ConfiguracaoSalaService,
    private sessionService: SessionService,
    private router: Router
  ){
  }

  defineTipoSala(tipo: string){
    this.tipoSala = tipo;
    this.visibleButtonIniciarJogo = true;
  }

  iniciarJogo(){
    if(this.tipoSala === 'nova'){
      this.configuracaoSalaService.conectaNovaSala(this.sala).subscribe((ret: any) => {
        this.trataRetornoConexao(ret);
      });
    }
    else { //Existente
      this.configuracaoSalaService.conectaSalaExistente(this.usuarioSala).subscribe((ret: any) => {
        this.trataRetornoConexao(ret);
      });
    }

    console.log("Iniciou e foi pra rota");
    this.router.navigateByUrl('/jogo');
  }

  trataRetornoConexao(retorno: any){
    this.sessionService.setSalaLogado(retorno.sala);
    this.sessionService.setUsuarioSalaLogado(retorno.usuarioSala);
    this.router.navigateByUrl('/jogo');
  }
}