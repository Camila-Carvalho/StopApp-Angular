export class RoundGame {
    id: number | undefined;
    idRoom: number | undefined;
    numberRound: number;
    numberOfRounds: number;
    letter: string;
    finished: boolean;
    dateTimeInit: Date;
    dateTimeEnd: Date;
    
    constructor() {
      this.numberRound = 1;
      this.numberOfRounds = 1;
      this.letter = "";
      this.finished = false;
      this.dateTimeInit = new Date();
      this.dateTimeEnd = new Date();
    }
}