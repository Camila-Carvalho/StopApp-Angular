export class Room {
    Id: number | undefined;
    CodeRoom: string
    NumberPlayers: number;
    NumberRounds: number;
    PlayerNameCreator: string

    constructor() {
      this.CodeRoom = "";
      this.PlayerNameCreator = "";
      this.NumberRounds = 1;
      this.NumberPlayers = 1;
    }

    public generateRandomCode(): string {
      return (Math.random() * (99 - 10) + 10).toLocaleString('pt-BR', { minimumIntegerDigits: 2 }).substring(0, 2) + (+ new Date()).toString().substring(1, 10);
    }
}