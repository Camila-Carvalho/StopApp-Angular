import { Injectable } from '@angular/core';
import { UserRoom } from '../model/userRoom.model';
import { Room } from '../model/room.model';
import { RoundGame } from '../model/roundGame.model';

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

  private roundGame: RoundGame = new RoundGame;
  getRoundGame(): RoundGame {
    return this.roundGame;
  }

  setRoundGame(roundGame: RoundGame) {
    this.roundGame = roundGame;
  }
}
