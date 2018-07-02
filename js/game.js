import * as functions from "./functions";
import game1 from "./screens/game-1";
import game2 from "./screens/game-2";
import game3 from "./screens/game-3";
import intro from "./screens/intro";
import stats from "./screens/stats";

const COUNT_QUESTIONS = 10;
const ANSWERS_TYPE = [
  {
    type: `paint`,
    text: `рисунок`
  },
  {
    type: `photo`,
    text: `фото`
  }
];
const IMAGES_DATA = [
  [
    `/img/dataImages/painting_animals.jpg`,
    `/img/dataImages/painting_nature.jpg`,
    `/img/dataImages/painting_people.jpg`
  ],
  [
    `/img/dataImages/photos_animals.jpg`,
    `/img/dataImages/photos_nature.jpg`,
    `/img/dataImages/photos_people.jpg`
  ]
];

const createNewGame = (gamerName) => {
  let gameData = {
    gameGamerData: {
      gamerName,
      gamerLives: 3,
      gamerAnswers: Array()
    },
    gameQuestionsData: createGameQuestions()
  };
  console.log(gameData);
  return gameData;
};

const createGameQuestions = () => {
  let gameQuestions = Array();
  for (let i = 0; i < COUNT_QUESTIONS; i++) {
    let questionNodeType = functions.getRandomFromInterval(1, 3);
    let questionCorrectType = functions.getRandomFromInterval(0, ANSWERS_TYPE.length - 1);
    let questionData = createGameQuestion(questionNodeType, questionCorrectType);

    gameQuestions.push({
      questionNodeType,
      questionCorrectType,
      questionData
    });
  }

  return gameQuestions;
};

const createGameQuestion = (countAnswers, correctType) => {
  let tempAnswer = [];

  tempAnswer.push({
    number: 0,
    type: ANSWERS_TYPE[incorrectType].type,
    data: IMAGES_DATA[incorrectType][functions.getRandomFromInterval(0, IMAGES_DATA[incorrectType].length - 1)]
  });

  // Если всего 3, то корректных - 2, если всего 2, то 1, если всего 1, то 1 же корректный
  let incorrectAnswersCount = countAnswers - 1;

  // Получаем номер некорректного варианта (т.к. варианта всего 2, то выйдет 1 - 1 = 0; 1 - 0 = 1)
  let incorrectType = (ANSWERS_TYPE.length - 1) - correctType;

  // Получаем индексы нескольких (0-2) "плохих" элементов
  let incorrectAnswers = Array.from(functions.getCountRandomFromInterval(IMAGES_DATA[correctType].length - 1, incorrectAnswersCount));

  // Если нужен "плохой" вариант
  for (let i = 1; i <= incorrectAnswersCount; i++) {
    tempAnswer.push({
      number: i,
      type: ANSWERS_TYPE[incorrectType].type,
      data: IMAGES_DATA[incorrectType][incorrectAnswers[i]]
    });
  }

  return tempAnswer;
};

const createNextGameQuestionScreen = (gameData) => {
  let questionNumber = gameData.gameGamerData.gamerAnswers.length;
  if (questionNumber === 10) {
    functions.setScreen(stats);
  }
  else {
    if (gameData.gameQuestionsData[questionNumber].questionNodeType === 1) {
      functions.setScreen(game1(gameData, questionNumber));
    }
    if (gameData.gameQuestionsData[questionNumber].questionNodeType === 2) {
      functions.setScreen(game2(gameData, questionNumber));
    }
    if (gameData.gameQuestionsData[questionNumber].questionNodeType === 3) {
      functions.setScreen(game3(gameData, questionNumber));
    }
  }
};

const checksAnswerForQuestion = (gameData, answers) => {
  let questionNumber = gameData.gameGamerData.gamerAnswers.length;
  let checkAnswer = 0;
  let isGood = 1;

  for (let i = 0; i < answers.length; i++) {
    if (gameData.gameQuestionsData[questionNumber].questionData[i].type !== answers[i]) {
      isGood = 0;
    }
  }

  // Сверить введённые данные с тем, как должно быть
  //  if ()

  // Ставим время, за которое получен ответ
  gameData.gameGamerData.gamerAnswers.push([isGood, 15]);
};

const letsTheGameBegin = () => {

};

export {createNewGame, checksAnswerForQuestion, createNextGameQuestionScreen};
export {ANSWERS_TYPE};
