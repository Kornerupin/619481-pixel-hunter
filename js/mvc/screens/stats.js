import * as functions from "../../functions";
import LocalStats from "../template/local-stats";
import AbstractView from "../AbstractView";

export default class Stats extends AbstractView {
  constructor(gameData, historyData) {
    super();
    this.gameData = gameData;
    if (historyData) {
      this.historyData = historyData;
    } else {
      this.historyData = [false, false];
    }

    this.title = `Победа`;
    if (gameData.gameGamerData.gamerAnswers.length !== 10) {
      this.title = `Поражение`;
    }
  }

  // ${this.createTableWithResults(this.historyData[0])}
  // ${this.createTableWithResults(this.historyData[1])}

  get template() {
    return `
      <div class="result">
        <h1>${this.title}!</h1>
        ${this.createTableWithResults(this.gameData)}
    `;
  }

  createAntiSpeedBonusesString(count) {
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
  }

  createSpeedBonusesString(count) {
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
  }

  createLivesBonusesString(count) {
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
  }

  countUpTotalScoreWithoutBonuses(answers) {
    let totalScoreWithoutBonuses = 0;
    for (let i = 0; i < answers.length; i++) {
      if (answers[i][0] === 1) {
        totalScoreWithoutBonuses += 100;
      }
    }
    return totalScoreWithoutBonuses;
  }

  createTableWithResults(gameData) {
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
              ${new LocalStats(gameData.gameGamerData.gamerAnswers)}
            </td>
            <td class="result__points">×&nbsp;100</td>
            <td class="result__total">${this.countUpTotalScoreWithoutBonuses(gameData.gameGamerData.gamerAnswers)}</td>
          </tr>
          ${this.createSpeedBonusesString(countSpeedBonuses)};
          ${this.createLivesBonusesString(gameData.gameGamerData.gamerLives)};
          ${this.createAntiSpeedBonusesString(countAntiSpeedBonuses)};
          <tr>
            <td colspan="5" class="result__total  result__total--final">${functions.calculateScoreForAnswers(gameData.gameGamerData.gamerLives, gameData.gameGamerData.gamerAnswers)}</td>
          </tr>
        </table>
    `;
    } else {
      return ``;
    }
  }
}
