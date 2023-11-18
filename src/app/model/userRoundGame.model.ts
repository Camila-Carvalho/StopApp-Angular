import { AnswerCategory } from "./answerCategory.model";

export class UserRoundGame {
    id: number | undefined;
    idRoundGame: number | undefined;
    idUser: number | undefined;
    answers: AnswerCategory[];
    dateTimeStop: Date;
    score: number;

    constructor() {
        this.answers = this.generateAnswerCategoryRound();
        this.dateTimeStop = new Date();
        this.score = 0;
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