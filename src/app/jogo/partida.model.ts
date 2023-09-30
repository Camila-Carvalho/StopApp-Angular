export class Partida {
    id: number; //identificador da partida, número increment
    letra: string; //letra da partida
    resposta: string; //resposta do usuário
    finalizada: boolean;
    
    constructor() {
        this.id = 1;
        this.letra  = "";
        this.resposta = "";
        this.finalizada = false;
    }

    validaResposta(): boolean{
        if(this.resposta === "")
            return false;
        if(this.resposta.charAt(0) === this.letra)
            return true;
        else
            return false;
    }
  }