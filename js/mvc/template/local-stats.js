import AbstractView from "../AbstractView";

export default class LocalStats extends AbstractView {
  constructor(gameData) {
    super();
    this.gameData = gameData;
    this.answers = gameData.gameGamerData.gamerAnswers;
  }

  get template() {
    return `
      <ul class="stats">
        ${this.getFillItemsList().innerHTML}
      </ul>
      `;
  }

  getFillItemsList() {
    let ul = document.createElement(`ul`);

    for (let i = 0; i < this.gameData.gameQuestionsData.length; i++) {
      let li = document.createElement(`li`);
      li.classList.add(`stats__result`);

      ul.appendChild(li);
    }

    for (let i = 0; i < this.answers.length; i++) {
      let answerStatus = this.answers[i][0];
      let time = this.answers[i][1];

      if (answerStatus === 0) {
        ul.children[i].classList.add(`stats__result--wrong`);
      } else {
        if (this.answers[i][1] <= 10) {
          ul.children[i].classList.add(`stats__result--fast`);
        } else if (time > 10 && time < 20) {
          ul.children[i].classList.add(`stats__result--correct`);
        } else if (time >= 20) {
          ul.children[i].classList.add(`stats__result--slow`);
        }
      }
    }

    for (let i = this.answers.length; i < this.gameData.gameQuestionsData.length; i++) {
      ul.children[i].classList.add(`stats__result--unknown`);
    }
    return ul;
  }
}


