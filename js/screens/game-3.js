import {ANSWERS_TYPE} from "../game"
export default (gameData, questionNumber) => {
  return `
    <div class="game">
      <p class="game__task">Найдите ${ANSWERS_TYPE[gameData.gameQuestionsData[questionNumber].questionCorrectType].text} среди изображений</p>
      <form class="game__content  game__content--triple">
        <div class="game__option">
          <img src="${gameData.gameQuestionsData[questionNumber].questionData[0].data}" data-value="${gameData.gameQuestionsData[questionNumber].questionData[0].type}" alt="Option 1" width="304" height="455">
        </div>
        <div class="game__option  game__option--selected">
          <img src="${gameData.gameQuestionsData[questionNumber].questionData[1].data}" data-value="${gameData.gameQuestionsData[questionNumber].questionData[1].type}" alt="Option 1" width="304" height="455">
        </div>
        <div class="game__option">
          <img src="${gameData.gameQuestionsData[questionNumber].questionData[2].data}" data-value="${gameData.gameQuestionsData[questionNumber].questionData[2].type}" alt="Option 1" width="304" height="455">
        </div>
      </form>
    </div>
`;
}
