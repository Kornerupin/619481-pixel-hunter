import AbstractView from "../AbstractView";
import * as game from "../../game";

export default class Rules extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
      <div class="rules">
      <h1 class="rules__title">Правила</h1>
      <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
        src="img/photo_icon.png" width="16" height="16"> или рисунок <img
        src="img/paint_icon.png" width="16" height="16" alt="">.<br>
        Фотографиями или рисунками могут быть оба изображения.<br>
        На каждую попытку отводится 30 секунд.<br>
        Ошибиться можно не более 3 раз.<br>
        <br>
        Готовы?
      </p>
      <form class="rules__form">
        <input class="rules__input" type="text" placeholder="Ваше Имя">
        <button class="rules__button  continue" type="submit" disabled>Go!</button>
      </form>
    </div>
    `;
  }

  bind() {
    // Слушатель для проверки статуса кнопки "Go" - отключает, если не указано имя, включает если указано
    document.addEventListener(`keyup`, (evt) => {
      if (document.querySelector(`.rules__form`)) {
        if (evt.target &&
          evt.target.matches(`.rules__input`)) {
          this.onChange(evt);
        }
      }
    });

    // Слушатель кнопки "Go" - при нажатии начинает игру
    document.addEventListener(`click`, (evt) => {
      if (document.querySelector(`.rules__form`)) {
        if (evt.target.matches(`.rules__button`)) {
          evt.preventDefault();
          this.onGo();
        }
      }
    });
  }

  onGo() {
    this.gameData = game.createNewGame(document.querySelector(`.rules__input`).value);
    game.createNextGameQuestionScreen(this.gameData);
  }

  onChange(evt) {
    if (evt.target.value !== ``) {
      document.querySelector(`.rules__button`).disabled = false;
    } else {
      document.querySelector(`.rules__button`).disabled = true;
    }
  }
}
