import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../app.api';
import { Sala } from './sala.model';
import { UsuarioSala } from './usuario-sala.model';

@Injectable()
export class ConfiguracaoSalaService {
  private readonly API = URL_API + '/roomConfiguration';

  constructor(
    private http: HttpClient
  ) { }

  conectaSalaExistente(usuarioSala: UsuarioSala): any {
    return this.http.post<any>(this.API + '/existingRoom', usuarioSala);
    //Retorna a sala e o usuarioSala
  }

  conectaNovaSala(sala: Sala): any {
    return this.http.post<any>(this.API + '/newRoom', sala);
    //Retorna a sala e o usuarioSala
  }
}
