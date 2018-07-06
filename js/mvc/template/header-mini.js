import AbstractView from "../AbstractView";
import Intro from "../screens/intro";
import {setScreen} from "../../functions";
import Footer from "./footer";

export default class HeaderMini extends AbstractView {
  constructor() {
    super();
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
