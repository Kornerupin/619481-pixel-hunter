import * as functions from "./functions";
import game1 from "./screens/game-1";
import game2 from "./screens/game-2";
import game3 from "./screens/game-3";
import stats from "./screens/stats";

const COUNT_QUESTIONS = 10;
const AnswersType = [
  {
    type: `paint`,
    text: `рисунок`
  },
  {
    type: `photo`,
    text: `фото`
  }
];
const ImagesData = [
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
      gamerAnswers: []
    },
    gameQuestionsData: createGameQuestions()
  };
  return gameData;
};

const createGameQuestions = () => {
  let gameQuestions = [];
  for (let i = 0; i < COUNT_QUESTIONS; i++) {
    let questionNodeType = functions.getRandomFromInterval(1, 3);
    let questionCorrectType = functions.getRandomFromInterval(0, AnswersType.length - 1);
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
  let correctAnswersCount = 0;
  let correctAnswers = [];
  let incorrectAnswersCount = 0;
  let incorrectAnswers = [];

  // Получаем номер некорректного варианта (т.к. варианта всего 2, то выйдет 1 - 1 = 0; 1 - 0 = 1)
  let incorrectType = (AnswersType.length - 1) - correctType;

  if (countAnswers === 1) {
    correctAnswersCount = 1;
    correctAnswers = Array.from(functions.getCountRandomFromInterval(ImagesData[correctType].length - 1, correctAnswersCount));
  } else if (countAnswers === 2) {
    correctAnswersCount = functions.getRandomFromInterval(0, 2);
    incorrectAnswersCount = 2 - correctAnswersCount;
    correctAnswers = Array.from(functions.getCountRandomFromInterval(ImagesData[correctType].length - 1, correctAnswersCount));
    incorrectAnswers = Array.from(functions.getCountRandomFromInterval(ImagesData[incorrectType].length - 1, incorrectAnswersCount));
  } else if (countAnswers === 3) {
    correctAnswersCount = 1;
    incorrectAnswersCount = 2;
    correctAnswers = Array.from(functions.getCountRandomFromInterval(ImagesData[correctType].length - 1, correctAnswersCount));
    incorrectAnswers = Array.from(functions.getCountRandomFromInterval(ImagesData[incorrectType].length - 1, incorrectAnswersCount));
  }

  // Добавляем "хорошие" вырианты
  for (let i = 0; i < correctAnswersCount; i++) {
    tempAnswer.push({
      type: AnswersType[correctType].type,
      data: ImagesData[correctType][correctAnswers[i]]
    });
  }

  // Добавляем "плохие" вырианты
  for (let i = 0; i < incorrectAnswersCount; i++) {
    tempAnswer.push({
      type: AnswersType[incorrectType].type,
      data: ImagesData[incorrectType][incorrectAnswers[i]]
    });
  }

  return tempAnswer;
};

const createNextGameQuestionScreen = (gameData) => {
  let questionNumber = gameData.gameGamerData.gamerAnswers.length;
  if (questionNumber === 10 || gameData.gameGamerData.gamerLives === 0) {
    functions.setScreen(stats(gameData));
  } else {
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

const checksAnswerForQuestion = (gameData, answers, time = 15) => {
  let questionNumber = gameData.gameGamerData.gamerAnswers.length;
  let isGood = 1;

  for (let i = 0; i < answers.length; i++) {
    if (gameData.gameQuestionsData[questionNumber].questionData[i].type !== answers[i]) {
      isGood = 0;
    }
  }

  // Если задание было выполнено с ошибкой, уменьшаем кол-во жизней
  if (!isGood) {
    gameData.gameGamerData.gamerLives--;
  }

  // Ставим статус проверки и время, за которое получен ответ
  gameData.gameGamerData.gamerAnswers.push([isGood, time]);
};

export {createNewGame, checksAnswerForQuestion, createNextGameQuestionScreen};
export {AnswersType};
