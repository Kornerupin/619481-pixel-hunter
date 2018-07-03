import {headerMini} from "../template/header";
import * as functions from "../functions";
import localStats from "../template/local-stats";

let createAntiSpeedBonusesString = (count) => {
  if (count > 0) {
    return `
        <tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">count&nbsp;<span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">×&nbsp;50</td>
          <td class="result__total">${count * (-50)}</td>
        </tr>
    `;
  } else {
    return ``;
  }
};

let createSpeedBonusesString = (count) => {
  if (count > 0) {
    return `
        <tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">${count}&nbsp;<span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">×&nbsp;50</td>
          <td class="result__total">${count * 50}</td>
        </tr>
    `;
  } else {
    return ``;
  }
};

let createLivesBonusesString = (count) => {
  if (count > 0) {
    return `
        <tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${count}&nbsp;<span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">×&nbsp;50</td>
          <td class="result__total">${count * 50}</td>
        </tr>
    `;
  } else {
    return ``;
  }
};

let countUpTotalScoreWithoutBonuses = (answers) => {
  let totalScoreWithoutBonuses = 0;
  for (let i = 0; i < answers.length; i++) {
    if (answers[i][0] === 1) {
      totalScoreWithoutBonuses += 100;
    }
  }
  return totalScoreWithoutBonuses;
};

let createTableWithResults = (gameData) => {
  if (gameData) {
    let countSpeedBonuses = 0;
    let countAntiSpeedBonuses = 0;

    for (let i = 0; i < gameData.gameGamerData.gamerAnswers.length; i++) {
      if (gameData.gameGamerData.gamerAnswers[i][1] <= 10) {
        countSpeedBonuses++;
      }
      if (gameData.gameGamerData.gamerAnswers[i][1] >= 20) {
        countAntiSpeedBonuses++;
      }
    }

    return `
        <table class="result__table">
          <tr>
            <td class="result__number">1.</td>
            <td colspan="2">
              ${localStats(gameData.gameGamerData.gamerAnswers)}
            </td>
            <td class="result__points">×&nbsp;100</td>
            <td class="result__total">${countUpTotalScoreWithoutBonuses(gameData.gameGamerData.gamerAnswers)}</td>
          </tr>
          ${createSpeedBonusesString(countSpeedBonuses)};
          ${createLivesBonusesString(gameData.gameGamerData.gamerLives)};
          ${createAntiSpeedBonusesString(countAntiSpeedBonuses)};
          <tr>
            <td colspan="5" class="result__total  result__total--final">${functions.calculateScoreForAnswers(gameData.gameGamerData.gamerLives, gameData.gameGamerData.gamerAnswers)}</td>
          </tr>
        </table>
    `;
  } else {
    return ``;
  }
};

export default (gameData) => {
  let title = `Победа`;

  if (gameData.gameGamerData.gamerAnswers.length !== 10) {
    title = `Поражение`;
  }

  let historyData = [];
  historyData.push(gameData);

  return `
    ${headerMini};
    <div class="result">
      <h1>${title}!</h1>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      ${createTableWithResults(gameData)}
`;
};

// ${createTableWithResults(historyData[0])}
// ${createTableWithResults(historyData[1])}
