import header from "../template/header";
import localStats from "../template/local-stats";

export default (gameData, questionNumber) => {
  return `
    ${header(gameData)};
    <div class="game">
      <p class="game__task">Угадай, фото или рисунок?</p>
      <form class="game__content  game__content--wide">
        <div class="game__option">
          <img src="${gameData.gameQuestionsData[questionNumber].questionData[0].data}" alt="Option 1" width="705" height="455">
          <label class="game__answer  game__answer--photo">
            <input name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--wide  game__answer--paint">
            <input name="question1" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
        </div>
      </form>
    </div>
    <div class="stats">
      ${localStats(gameData.gameGamerData.gamerAnswers)};
    </div>
`;
};
