import AbstractView from "../AbstractView";
import HeaderMini from "../template/header-mini";
import Greeting from "./greeting";
import Footer from "../template/footer";
import * as functions from "../../functions";

export default class Intro extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
      <div id="main" class="central__content">
      <div id="intro" class="intro">
        <h1 class="intro__asterisk">*</h1>
        <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
      </div>
    </div>
    `;
  }

  bind() {
    document.addEventListener(`click`, (evt) => {
      if (document.querySelector(`.intro`)) {
        if (evt.target &&
          evt.target.matches(`.intro__asterisk`)) {
          this.onClick();
        }
      }
    });
  }

  onClick() {
    let headerNode = new HeaderMini();
    let screenNode = new Greeting();
    let footerNode = new Footer();
    functions.setScreen(headerNode.element, screenNode.element, false, footerNode.element);
  }
}
