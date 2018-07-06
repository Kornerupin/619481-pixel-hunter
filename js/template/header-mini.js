import AbstractView from "../mvc/AbstractView";
import * as functions from "../functions";
import intro from "../screens/intro";

export default class Header extends AbstractView{
  constructor (gameData, questionNumber) {
    super();
    this.gameData = gameData;
    this.questionNumber = questionNumber;
  };

  get template() {
    return `
      <header class="header">
        <div class="header__back">
          <button class="back">
            <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
            <img src="img/logo_small.svg" width="101" height="44">
          </button>
        </div>
      </header>
    `;
  }

  bind = () => {
    // Слушатель для кнопки "Назад"
    document.addEventListener(`click`, (evt) => {
      if (document.querySelector(`.back`)) {
        if (evt.target &&
          evt.target.offsetParent &&
          (evt.target.matches(`.back`) || evt.target.offsetParent.matches(`.header__back`))) {
          this.onBack();
        }
      }
    });
  };

  onBack = () => {
    functions.setScreen(intro());
  };
};
