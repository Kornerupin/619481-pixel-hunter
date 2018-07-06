export default class LocalStats {
  constructor(answers) {
    this.answers = answers;
  }

  get template() {
    return `
      <ul class="stats">
        ${this.getFillItemsList().innerHTML};
        ${new Array(10 - this.answers.length).fill(`<li class="stats__result stats__result--unknown"></li>`).join(``)}
      </ul>
      `;
  }

  getFillItemsList() {
    let statsResults = document.querySelectorAll(`.stats .stats .stats__result`);
    let ul = document.createElement(`ul`);

    for (let i = 0; i < this.answers.length; i++) {
      let answerStatus = this.answers[i][0];
      let time = this.answers[i][1];

      if (answerStatus === 0) {
        statsResults[i].classList.add(`stats__result--wrong`);
      } else {
        if (this.answers[i][1] <= 10) {
          statsResults[i].classList.add(`stats__result--fast`);
        } else if (time > 10 && time < 20) {
          statsResults[i].classList.add(`stats__result--correct`);
        } else if (time >= 20) {
          statsResults[i].classList.add(`stats__result--slow`);
        }
      }
      ul.appendChild(statsResults[i]);
    }
    return ul;
  }
}


