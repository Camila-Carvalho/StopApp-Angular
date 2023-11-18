import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../app.api';
import { UserRoom } from '../model/userRoom.model';
import { Room } from '../model/room.model';

@Injectable()
export class RoomService {
  private readonly API = URL_API + '/roomConfiguration';

  constructor(
    private http: HttpClient
  ) { }

  connectExistingRoom(userRoom: UserRoom): any {
    console.log("Front: ", userRoom);
    return this.http.post<any>(this.API + '/existingRoom', userRoom);
  }

  connectNewRoom(room: Room): any {
    console.log("Front: ", room);
    return this.http.post<any>(this.API + '/newRoom', room);
    //Retorna a sala e o usuarioSala
  }
}
