import AbstractView from "../AbstractView";
import * as game from "../../game";

export default class Game1 extends AbstractView {
  constructor(gameData, questionNumber) {
    super();
    this.gameData = gameData;
    this.questionNumber = questionNumber;
  }

  get template() {
    return `
      <div class="game">
        <p class="game__task">Угадай, фото или рисунок?</p>
        <form class="game__content  game__content--wide">
          <div class="game__option">
            <img src="${this.gameData.gameQuestionsData[this.questionNumber].questionData[0].data}" alt="Option 1" width="705" height="455">
            <label class="game__answer  game__answer--photo">
              <input name="question1" type="radio" value="photo">
              <span>Фото</span>
            </label>
            <label class="game__answer  game__answer--wide  game__answer--paint">
              <input name="question1" type="radio" value="paint">
              <span>Рисунок</span>
            </label>
          </div>
        </form>
      </div>
    `;
  }

  bind() {
    document.addEventListener(`change`, (evt) => {
      if (document.querySelector(`.game__content--wide`)) {
        if (evt.target &&
            evt.target.offsetParent &&
            evt.target.offsetParent.matches(`.game__answer`)) {
          this.onSubmit(evt.target.offsetParent);
        }
      }
    });
  }

  onSubmit(parentOfTarget) {
    game.checksAnswerForQuestion(this.gameData, [parentOfTarget.querySelector(`input`).value]);
    game.createNextGameQuestionScreen(this.gameData);
  }
}
