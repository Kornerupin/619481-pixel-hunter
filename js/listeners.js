import * as functions from "./functions";
import rules from "./screens/rules";
import greeting from "./screens/greeting";
import intro from "./screens/intro";
import * as game from "./game";

let newGame;

// Слушатель для страницы игры с одним широким изображением
document.addEventListener(`change`, (evt) => {
  if (document.querySelector(`.game__content--wide`)) {
    if (evt.target &&
        evt.target.offsetParent &&
        evt.target.offsetParent.matches(`.game__answer`)) {
      game.checksAnswerForQuestion(newGame, [evt.target.offsetParent.children[0].value]);
      game.createNextGameQuestionScreen(newGame);
    }
  }
});

// Слушатель для страницы игры с двумя изображениями
document.addEventListener(`change`, (evt) => {
  if (document.querySelector(`.game__content:not(.game__content--wide):not(.game__content--triple)`)) {
    if (evt.target &&
        evt.target.offsetParent &&
        evt.target.offsetParent.offsetParent &&
        evt.target.offsetParent.offsetParent.matches(`.game__option`)) {

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
          game.checksAnswerForQuestion(newGame, answers);
          game.createNextGameQuestionScreen(newGame);
        }
      }
    }
  }
});

// Слушатель для страницы игры с тремя изображениями
document.addEventListener(`mousedown`, (evt) => {
  if (document.querySelector(`.game__content--triple`)) {
    if (evt.target &&
        evt.target.offsetParent &&
        evt.target.offsetParent.matches(`.game__option`)) {
      game.checksAnswerForQuestion(newGame, 1);
      game.createNextGameQuestionScreen(newGame);
    }
  }
});

// Слушатель для страницы greetings
document.addEventListener(`click`, (evt) => {
  if (document.querySelector(`.greeting`)) {
    if (evt.target &&
      evt.target.offsetParent &&
      evt.target.offsetParent.matches(`.greeting__continue`)) {
      functions.setScreen(rules());
    }
  }
});

// Слушатель для страницы intro
document.addEventListener(`click`, (evt) => {
  if (document.querySelector(`.intro`)) {
    if (evt.target &&
      evt.target.matches(`.intro__asterisk`)) {
      functions.setScreen(greeting());
    }
  }
});

// Слушатель для кнопки "Назад"
document.addEventListener(`click`, (evt) => {
  if (document.querySelector(`.back`)) {
    if (evt.target &&
      evt.target.offsetParent &&
      (evt.target.matches(`.back`) || evt.target.offsetParent.matches(`.header__back`))) {
      functions.setScreen(intro());
    }
  }
});

// Слушатель для проверки статуса кнопки "Go" - отключает, если не указано имя, включает если указано
document.addEventListener(`keyup`, (evt) => {
  if (document.querySelector(`.rules__form`)) {
    if (evt.target &&
      evt.target.matches(`.rules__input`)) {
      if (evt.target.value !== ``) {
        document.querySelector(`.rules__button`).disabled = false;
      } else {
        document.querySelector(`.rules__button`).disabled = true;
      }
    }
  }
});

// Слушатель кнопки "Go" - при нажатии начинает игру
document.addEventListener(`click`, (evt) => {
  if (document.querySelector(`.rules__form`)) {
    if (evt.target.matches(`.rules__button`)) {
      evt.preventDefault();
      newGame = game.createNewGame(document.querySelector(`.rules__input`).value);
      game.createNextGameQuestionScreen(newGame);
    }
  }
});

export default 1;
