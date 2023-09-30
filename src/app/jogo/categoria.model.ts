import { Partida } from "./partida.model";

export class Categoria {
    nome: string;
    partidas: Partida[];

    constructor(nome: string) {
      this.nome  = nome;
      this.partidas = [];
    }
  }