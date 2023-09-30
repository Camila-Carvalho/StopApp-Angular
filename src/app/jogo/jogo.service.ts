import { Injectable } from '@angular/core';
import { Categoria } from './categoria.model';
import { Jogo } from './jogo.model';
import { Partida } from './partida.model';
import { URL_API } from '../app.api';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../services/session.service';

@Injectable()
export class JogoService {
  private readonly API = URL_API + '/jogo';
  
  constructor(
    private http: HttpClient
  ) { }

  startJogo(jogo: Jogo): any {
    console.log("Envia requisição de START");
    return this.http.post<Jogo>(this.API + '/startJogo', jogo);
  }

  stopJogo(jogo: Jogo){
    console.log("Envia requisição de STOP");
    return this.http.put<Jogo>(this.API + '/stopJogo', jogo);
  }

  jogoInit(): Jogo {
    let jogo = new Jogo();
    jogo.categorias = this.categoriasInit();
    return jogo;
  }

  categoriasInit(): Categoria[]{
    let categorias: Categoria[] = [];

    categorias.push(new Categoria("Nome"));
    categorias.push(new Categoria("CEP (Cidade/Estado/País)"));
    categorias.push(new Categoria("Fruta"));
    categorias.push(new Categoria("Animal"));
    categorias.push(new Categoria("MSE"));

    return categorias;
  }

  //Para quando não se tem a API ainda
  adicionaPartidaJogo(jogo: Jogo): Jogo {
    let ultimaPartida = jogo.categorias[0].partidas[jogo.categorias[0].partidas.length - 1];
    let partida = new Partida();
    if(ultimaPartida !== undefined)
      partida.id = ultimaPartida.id++;
    partida.letra = "A";

    jogo.categorias.forEach(categoria => { categoria.partidas.push(partida); });
    return jogo;
  }
}
