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

  getRoundGame(codeRoom: string){
    return this.http.post<any>(this.API + '/startGame/getRoundGame/' + codeRoom, null);
  }
  
  /*
  startGame(idRoom: number): any {
    console.log("Envia requisição de START");
    return this.http.get<any>(this.API + '/getRoundGame/' + idRoom.toString());
    //return this.http.post<any>(this.API + '/startGame', game);
  }*/

  stopGame(userRoundGame: UserRoundGame){
    console.log("Envia requisição de STOP");
    return this.http.post<any>(this.API + '/stopGame', userRoundGame);
  }
}
