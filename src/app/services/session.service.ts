import { Injectable } from '@angular/core';
import { UsuarioSala } from '../sala/usuario-sala.model';
import { Sala } from '../sala/sala.model';

@Injectable()
export class SessionService {

  constructor() { }

  private usuarioSalaLogado: UsuarioSala = new UsuarioSala;

  getUsuarioSalaLogado(): UsuarioSala {
    return this.usuarioSalaLogado;
  }

  setUsuarioSalaLogado(usuarioSala: UsuarioSala) {
    this.usuarioSalaLogado = usuarioSala;
  }

  private salaLogado: Sala = new Sala;

  getSalaLogado(): Sala {
    return this.salaLogado;
  }

  setSalaLogado(sala: Sala) {
    this.salaLogado = sala;
  }

}
