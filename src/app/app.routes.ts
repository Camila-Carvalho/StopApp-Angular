import { Routes } from "@angular/router";

import { RoomComponent } from "./room/room.component";
import { GameComponent } from "./game/game.component";

export const ROUTES: Routes = [
    { path:'', component: RoomComponent },
    { path:'game', component: GameComponent },
]
