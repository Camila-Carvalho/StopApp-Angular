export class Room {
    id: number | undefined;
    codeRoom: string
    numberPlayers: number;
    numberRounds: number;
    playerNameCreator: string

    constructor() {
      this.codeRoom = "";
      this.playerNameCreator = "";
      this.numberRounds = 1;
      this.numberPlayers = 1;
    }

    public generateRandomCode(): string {
      return (Math.random() * (99 - 10) + 10).toLocaleString('pt-BR', { minimumIntegerDigits: 2 }).substring(0, 2) + (+ new Date()).toString().substring(1, 10);
    }
}