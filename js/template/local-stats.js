const localStats = (answers) => {
  let statsResults = document.querySelectorAll(`.stats .stats .stats__result`);
  let ul = document.createElement(`ul`);

  for (let i = 0; i < answers.length; i++) {
    let answerStatus = answers[i][0];
    let time = answers[i][1];

    if (answerStatus === 0) {
      statsResults[i].classList.add(`stats__result--wrong`);
    } else {
      if (answers[i][1] <= 10) {
        statsResults[i].classList.add(`stats__result--fast`);
      } else if (time > 10 && time < 20) {
        statsResults[i].classList.add(`stats__result--correct`);
      } else if (time >= 20) {
        statsResults[i].classList.add(`stats__result--slow`);
      }
    }
    ul.appendChild(statsResults[i]);
  }

  return `
    <ul class="stats">
      ${ul.innerHTML};
      ${new Array(10 - answers.length)
        .fill(`<li class="stats__result stats__result--unknown"></li>`)
        .join(``)}
    </ul>
  `;
};

export default localStats;
