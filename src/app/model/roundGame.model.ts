export class RoundGame {
    Id: number | undefined;
    IdRoom: number | undefined;
    NumberRound: number;
    NumberOfRounds: number;
    Letter: string;
    Finished: boolean;
    DateTimeInit: Date;
    DateTimeEnd: Date;
    
    constructor() {
      this.NumberRound = 1;
      this.NumberOfRounds = 1;
      this.Letter = "";
      this.Finished = false;
      this.DateTimeInit = new Date();
      this.DateTimeEnd = new Date();
    }
}