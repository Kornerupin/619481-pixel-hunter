import * as functions from "../../functions";
import AbstractView from "../AbstractView";
import Rules from "./rules";
import Footer from "../template/footer";
import HeaderMini from "../template/header-mini";

export default class Game1 extends AbstractView {
  constructor(gameData, questionNumber) {
    super();
    this.gameData = gameData;
    this.questionNumber = questionNumber;
  }

  get template() {
    return `
      <div class="greeting central--blur">
      <div class="greeting__logo"><img src="img/logo_big.png" width="201" height="89" alt="Pixel Hunter"></div>
      <h1 class="greeting__asterisk">*</h1>
      <div class="greeting__challenge">
        <h3>Лучшие художники-фотореалисты бросают&nbsp;тебе&nbsp;вызов!</h3>
        <p>Правила игры просты.<br>
          Нужно отличить рисунок&nbsp;от фотографии и сделать выбор.<br>
          Задача кажется тривиальной, но не думай, что все так просто.<br>
          Фотореализм обманчив и коварен.<br>
          Помни, главное — смотреть очень внимательно.</p>
      </div>
      <div class="greeting__continue"><span><img src="img/arrow_right.svg" width="64" height="64" alt="Next"></span></div>
    </div>
    `;
  }

  bind() {
    document.addEventListener(`click`, (evt) => {
      if (document.querySelector(`.greeting`)) {
        if (evt.target &&
          evt.target.offsetParent &&
          evt.target.offsetParent.matches(`.greeting__continue`)) {
          this.onClick();
        }
      }
    });
  }

  onClick() {
    let headerNode = new HeaderMini();
    let screenNode = new Rules();
    let footerNode = new Footer();
    functions.setScreen(headerNode.element, screenNode.element, false, footerNode.element);
  }
}
