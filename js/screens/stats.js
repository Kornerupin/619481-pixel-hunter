import {headerMini} from "../template/header";
import localStats from "../template/local-stats";

export default (gameData) => {
  let title = `Победа`;
  let countSpeedBonuses = 0;
  let countAntiSpeedBonuses = 0;

  if (gameData.gameGamerData.gamerAnswers.length !== 10) {
    title = `Поражение`;
  }

  for (let i = 0; i < gameData.gameGamerData.gamerAnswers.length; i++) {
    if (gameData.gameGamerData.gamerAnswers[i][1] <= 10) {
      countSpeedBonuses++;
    }
    if (gameData.gameGamerData.gamerAnswers[i][1] >= 20) {
      countAntiSpeedBonuses++;
    }
  }
  countSpeedBonuses = countAntiSpeedBonuses + 123;
  if (!countSpeedBonuses) {
    title = `SDFDSFS`;
  }

  let createAntiSpeedBonusesString = (count) => {
    if (count > 0) {
      return `
        <tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">2&nbsp;<span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">×&nbsp;50</td>
          <td class="result__total">-100</td>
        </tr>
    `;
    } else {
      return false;
    }
  };

  return `
    ${headerMini};
    <div class="result">
      <h1>${title}!</h1>
      <table class="result__table">
        <tr>
          <td class="result__number">1.</td>
          <td colspan="2">
            ${localStats(gameData.gameGamerData.gamerAnswers)}
          </td>
          <td class="result__points">×&nbsp;100</td>
          <td class="result__total">900</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">1&nbsp;<span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">×&nbsp;50</td>
          <td class="result__total">50</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${gameData.gameGamerData.gamerLives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">×&nbsp;50</td>
          <td class="result__total">${gameData.gameGamerData.gamerLives * 50}</td>
        </tr>
        ${createAntiSpeedBonusesString(countAntiSpeedBonuses)};
        <tr>
          <td colspan="5" class="result__total  result__total--final">950</td>
        </tr>
      </table>
      <table class="result__table">
        <tr>
          <td class="result__number">2.</td>
          <td>
            <ul class="stats">
              <li class="stats__result stats__result--wrong"></li>
              <li class="stats__result stats__result--slow"></li>
              <li class="stats__result stats__result--fast"></li>
              <li class="stats__result stats__result--correct"></li>
              <li class="stats__result stats__result--wrong"></li>
              <li class="stats__result stats__result--unknown"></li>
              <li class="stats__result stats__result--slow"></li>
              <li class="stats__result stats__result--wrong"></li>
              <li class="stats__result stats__result--fast"></li>
              <li class="stats__result stats__result--wrong"></li>
            </ul>
          </td>
          <td class="result__total"></td>
          <td class="result__total  result__total--final">fail</td>
        </tr>
      </table>
      <table class="result__table">
        <tr>
          <td class="result__number">3.</td>
          <td colspan="2">
            <ul class="stats">
              <li class="stats__result stats__result--wrong"></li>
              <li class="stats__result stats__result--slow"></li>
              <li class="stats__result stats__result--fast"></li>
              <li class="stats__result stats__result--correct"></li>
              <li class="stats__result stats__result--wrong"></li>
              <li class="stats__result stats__result--unknown"></li>
              <li class="stats__result stats__result--slow"></li>
              <li class="stats__result stats__result--unknown"></li>
              <li class="stats__result stats__result--fast"></li>
              <li class="stats__result stats__result--unknown"></li>
            </ul>
          </td>
          <td class="result__points">×&nbsp;100</td>
          <td class="result__total">900</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">2&nbsp;<span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">×&nbsp;50</td>
          <td class="result__total">100</td>
        </tr>
        <tr>
          <td colspan="5" class="result__total  result__total--final">950</td>
        </tr>
      </table>
    </div>
`;
};
