import { Injectable } from '@angular/core';
import { URL_API } from '../app.api';
import { HttpClient } from '@angular/common/http';
import { RoundGame } from '../model/roundGame.model';
import { UserRoundGame } from '../model/userRoundGame.model';
import { Room } from '../model/room.model';

@Injectable()
export class GameService {
  private readonly API = URL_API + '/game';
  
  constructor(
    private http: HttpClient
  ) { }

  startGame(idRoom: number): any {
    console.log("Envia requisição de START");
    return this.http.get<any>(this.API + '/getRoundGame/' + idRoom.toString());
    //return this.http.post<any>(this.API + '/startGame', game);
  }

  stopGame(userRoundGame: UserRoundGame){
    console.log("Envia requisição de STOP");
    return this.http.post<any>(this.API + '/stopGame', userRoundGame);
  }

/*
  jogoInit(): Jogo {
    let jogo = new Jogo();
    jogo.categorias = this.categoriasInit();
    return jogo;
  }*/
/*
  //Para quando não se tem a API ainda
  adicionaPartidaJogo(jogo: Jogo): Jogo {
    let ultimaPartida = jogo.categorias[0].partidas[jogo.categorias[0].partidas.length - 1];
    let partida = new Partida();
    if(ultimaPartida !== undefined)
      partida.id = ultimaPartida.id++;
    partida.letra = "A";

    jogo.categorias.forEach(categoria => { categoria.partidas.push(partida); });
    return jogo;
  }*/
}
