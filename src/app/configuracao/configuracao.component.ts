import { Component } from '@angular/core';

@Component({
  selector: 'app-configuracao',
  templateUrl: './configuracao.component.html'
})

export class ConfiguracaoComponent {
  
  public tipoSala: string = '';
  public visibleButtonIniciarJogo: boolean = false;

  public nameJogador: string = '';
  public codigoSala: string = '';
  public numeroParticipantes: number = 1;
  public numeroJogadas: number = 1;

  constructor (
  ){
  }

  defineTipoSala(tipo: string){
    this.tipoSala = tipo;
    this.visibleButtonIniciarJogo = true;
  }
}