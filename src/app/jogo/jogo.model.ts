import { Sala } from "../sala/sala.model";
import { Categoria } from "./categoria.model";

export class Jogo {
    sala: Sala | undefined;
    categorias: Categoria[];
    numeroPartidas: number;
    numeroPartidaAtual: number;

    constructor() {
        this.categorias = [];
        this.numeroPartidas = 1;
        this.numeroPartidaAtual = 1;
    }
  }