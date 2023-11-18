import { Injectable } from '@angular/core';
import { UserRoom } from '../model/userRoom.model';
import { Room } from '../model/room.model';

@Injectable()
export class SessionService {

  constructor() { }

  private userRoomLogged: UserRoom = new UserRoom;

  getUserRoomLogged(): UserRoom {
    return this.userRoomLogged;
  }

  setUserRoomLogged(userRoom: UserRoom) {
    this.userRoomLogged = userRoom;
  }

  private roomLogged: Room = new Room;

  getRoomLogged(): Room {
    return this.roomLogged;
  }

  setRoomLogged(room: Room) {
    this.roomLogged = room;
  }

}
