import { Routes } from "@angular/router";

import { ConfiguracaoSalaComponent } from './sala/configuracao-sala.component';
import { JogoComponent } from "./jogo/jogo.component";

export const ROUTES: Routes = [
    { path:'', component: ConfiguracaoSalaComponent },
    { path:'jogo', component: JogoComponent },
]
