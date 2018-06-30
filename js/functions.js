const setScreen = (screenDataString) => {
  let screen = createDOMNodeFromTemplate(screenDataString);
  const centralContent = document.querySelector(`.central`);

  while (centralContent.firstChild) {
    centralContent.removeChild(centralContent.firstChild);
  }

  centralContent.appendChild(screen);
};

const createDOMNodeFromTemplate = (elementStringData) => {
  const temp = document.createElement(`div`);
  const fragment = document.createDocumentFragment();

  temp.innerHTML = elementStringData.trim();

  while (temp.children.length > 0) {
    fragment.appendChild(temp.children[0]);
  }

  return fragment;
};

const calculateScoreForAnswers = (lives, answers) => {
  const bonusTime = 10;
  const slowTime = 20;
  const maxTime = 30;
  let totalScore = 0;

  if (lives < 0) {
    throw new Error(`Некорректное значение lives: кол-во жизней не может быть отрицательным!`);
  }
  if (lives > 3) {
    throw new Error(`Некорректное значение lives: кол-во жизней не может быть больше 3!`);
  }
  if (!isNumeric(lives)) {
    throw new Error(`Некорректное значение lives: кол-во жизней должно быть числом!`);
  }
  if (answers.length !== 10) {
    throw new Error(`Некорректное кол-во элементов массива!`);
  }
  for (let i = 0; i < answers.length; i++) {
    if (!Array.isArray(answers)) {
      throw new Error(`Некорректный тип значения элемента массива - ожидается массив!`);
    }
    if (!isNumeric(answers[i][0])) {
      throw new Error(`Некорректное значение статуса ответа - полученное значение не является числом!`);
    }
    if (!(answers[i][0] === 0 || answers[i][0] === 1)) {
      throw new Error(`Некорректное значение статуса ответа - допустимые значения 0 или 1!`);
    }
    if (!isNumeric(answers[i][1])) {
      throw new Error(`Некорректное значение времени - ожидается число!`);
    }
    if (!(answers[i][1] >= 0 && answers[i][1] <= maxTime)) {
      throw new Error(`Некорректное значение времени - ожидается число в интервале от 0 до 30!`);
    }
  }

  for (let i = 0; i < answers.length; i++) {
    if (answers[i][0]) {
      // Если игрок уложился в макс. время (проверка на интервал проводится выше)
      totalScore += 100;
      // Если игрок уложился в бонусное время, начисляем доп. 50 очков
      if (answers[i][1] <= bonusTime) {
        totalScore += 50;
      } else // Если игрок не уложился в нормальное время, вычитаем 50 очков
      if (answers[i][1] >= slowTime) {
        totalScore -= 50;
      }
    } else {
      // Если человек не ответил на вопрос, или ответил не правильно (статус ответа - 0)
      // Do nothing =)
    }
  }

  return (totalScore += lives * 50);
};

const isNumeric = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

export {setScreen};
export {calculateScoreForAnswers};
