export class Sala {
    codigoSala: string;
    numeroJogadas: number;
    numeroJogares: number;

    nomeUsuarioCriador: string;

    constructor() {
      this.codigoSala  = this.generateRandomCode();
      this.nomeUsuarioCriador = "";
      this.numeroJogadas = 1;
      this.numeroJogares = 2;
    }

    private generateRandomCode(): string {
      return (Math.random() * (99 - 10) + 10).toLocaleString('pt-BR', { minimumIntegerDigits: 2 }).substring(0, 2) + (+ new Date()).toString().substring(1, 10);
    }
  }