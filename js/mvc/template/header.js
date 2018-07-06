import AbstractView from "../AbstractView";
import {setScreen} from "../../functions";
import Footer from "./footer";
import Intro from "../screens/intro";

export default class Header extends AbstractView {
  constructor(lives) {
    super();
    this.lives = lives;
  }

  get template() {
    return `
      <header class="header">
      <div class="header__back">
        <button class="back">
          <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
          <img src="img/logo_small.svg" width="101" height="44">
        </button>
      </div>
      <h1 class="game__timer">NN</h1>
      <div class="game__lives">
        ${new Array(this.lives)
          .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`)
          .join(``)}
        ${new Array(3 - this.lives)
          .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`)
          .join(``)}
      </div>
    </header>
    `;
  }

  bind() {
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
  }

  onBack() {
    let startGameContent = new Intro();
    let startGameFooter = new Footer();
    setScreen(false, startGameContent.element, false, startGameFooter.element);
  }
}
