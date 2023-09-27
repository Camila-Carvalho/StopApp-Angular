import { Routes } from "@angular/router";

import { ConfiguracaoComponent } from './configuracao/configuracao.component';
import { JogoComponent } from "./jogo/jogo.component";

export const ROUTES: Routes = [
    { path:'', component: ConfiguracaoComponent },
    { path:'jogo', component: JogoComponent },
]
