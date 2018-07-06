import AbstractView from "../mvc/AbstractView";
import {AnswersType} from "../game";
import * as game from "../game";

export default class Game3 extends AbstractView{
  constructor (gameData, questionNumber) {
    super();
    this.gameData = gameData;
    this.questionNumber = questionNumber;
  };

  get template() {
    return `
      <div class="game">
      <p class="game__task">Найдите ${AnswersType[this.gameData.gameQuestionsData[questionNumber].questionCorrectType].text} среди изображений</p>
      <form class="game__content  game__content--triple">
        <div class="game__option">
          <img src="${this.gameData.gameQuestionsData[this.questionNumber].questionData[0].data}" data-value="${this.gameData.gameQuestionsData[this.questionNumber].questionData[0].type}" alt="Option 1" width="304" height="455">
        </div>
        <div class="game__option  game__option--selected">
          <img src="${this.gameData.gameQuestionsData[this.questionNumber].questionData[1].data}" data-value="${this.gameData.gameQuestionsData[this.questionNumber].questionData[1].type}" alt="Option 1" width="304" height="455">
        </div>
        <div class="game__option">
          <img src="${this.gameData.gameQuestionsData[this.questionNumber].questionData[2].data}" data-value="${this.gameData.gameQuestionsData[this.questionNumber].questionData[2].type}" alt="Option 1" width="304" height="455">
        </div>
      </form>
    </div>
    `;
  }

  bind = () => {
    document.addEventListener(`mousedown`, (evt) => {
      if (document.querySelector(`.game__content--triple`)) {
        if (evt.target &&
          evt.target.offsetParent &&
          evt.target.offsetParent.matches(`.game__option`)) {
          this.onSubmit();
        }
      }
    });
  };

  onSubmit = () => {
    game.checksAnswerForQuestion(this.gameData, [this.parentNode.querySelector(`input`).value]);
    game.createNextGameQuestionScreen(this.gameData);
  };
};
