export class AnswerCategory {
    IdUserRoundGame: string | undefined;
    Category: string;
    Answer: string;
  
    constructor(category: string) {
        this.Category = category;
        this.Answer = "";
    }
  }