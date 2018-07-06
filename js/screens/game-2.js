import AbstractView from "../mvc/AbstractView";
import * as game from "../game";

export default class Game2 extends AbstractView{
  constructor (gameData, questionNumber) {
    super();
    this.gameData = gameData;
    this.questionNumber = questionNumber;
  };

  get template() {
    return `
      <div class="game">
      <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
      <form class="game__content">
        <div class="game__option">
          <img src="${this.gameData.gameQuestionsData[this.questionNumber].questionData[0].data}" alt="Option 1" width="468" height="458">
          <label class="game__answer game__answer--photo">
            <input name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer game__answer--paint">
            <input name="question1" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
        </div>
        <div class="game__option">
          <img src="${this.gameData.gameQuestionsData[this.questionNumber].questionData[1].data}" alt="Option 2" width="468" height="458">
          <label class="game__answer  game__answer--photo">
            <input name="question2" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint">
            <input name="question2" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
        </div>
      </form>
    </div>
    `;
  }

  bind = () => {
    this.parentNode.addEventListener(`change`, (evt) => {
      if (this.parentNode.parentNode.matches(`.game__option`)) {
        const gameContent = document.querySelector(`.game__content`);
        const gameOptions = gameContent.querySelectorAll(`.game__option`);

        const gameOptionsInputsOne = gameOptions[0].querySelectorAll(`input`);
        const gameOptionsInputsTwo = gameOptions[1].querySelectorAll(`input`);

        let answers = [];

        if (gameOptionsInputsOne[0].checked === true || gameOptionsInputsOne[1].checked === true) {
          answers[0] = gameOptionsInputsOne[1].value;
          if (gameOptionsInputsOne[0].checked === true) {
            answers[0] = gameOptionsInputsOne[0].value;
          }
          if (gameOptionsInputsTwo[0].checked === true || gameOptionsInputsTwo[1].checked === true) {
            answers[1] = gameOptionsInputsTwo[1].value;
            if (gameOptionsInputsTwo[0].checked === true) {
              answers[1] = gameOptionsInputsTwo[0].value;
            }
            this.onSubmit();
          }
        }
      }
    });
  };

  onSubmit = () => {
    game.checksAnswerForQuestion(this.gameData, [this.parentNode.querySelector(`input`).value]);
    game.createNextGameQuestionScreen(this.gameData);
  };
};
