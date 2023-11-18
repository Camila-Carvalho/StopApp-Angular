import { AnswerCategory } from "./answerCategory.model";

export class UserRoundGame {
    Id: number | undefined;
    IdRoundGame: number | undefined;
    IdUser: number | undefined;
    Answers: AnswerCategory[];
    DateTimeStop: Date;
    Score: number;

    constructor() {
        this.Answers = this.generateAnswerCategoryRound();
        this.DateTimeStop = new Date();
        this.Score = 0;
    }

    
    private generateAnswerCategoryRound () : AnswerCategory[] {
        let answerCategory: AnswerCategory[] = [];
        answerCategory.push(new AnswerCategory("Nome"));
        answerCategory.push(new AnswerCategory("Cor"));
        answerCategory.push(new AnswerCategory("Fruta"));
        answerCategory.push(new AnswerCategory("Animal"));
        answerCategory.push(new AnswerCategory("Objeto"));
        return answerCategory;
    }
}