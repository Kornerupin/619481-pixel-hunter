import footer from "./template/footer";

const setScreen = (screenDataString, data = '') => {
  let screen = createDOMNodeFromTemplate(screenDataString);
  let screenFooter = createDOMNodeFromTemplate(footer);
  const centralContent = document.querySelector(`.central`);

  while (centralContent.firstChild) {
    centralContent.removeChild(centralContent.firstChild);
  }

  centralContent.appendChild(screen);
  centralContent.appendChild(screenFooter);
};

const createDOMNodeFromTemplate = (elementStringData) => {
  const temp = document.createElement(`div`);
  const fragment = document.createDocumentFragment();

  temp.innerHTML = elementStringData;

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

  if (!isNumeric(lives)) {
    throw new Error(`Некорректное значение lives: кол-во жизней должно быть числом!`);
  }
  if (lives < 0) {
    throw new Error(`Некорректное значение lives: кол-во жизней не может быть отрицательным!`);
  }
  if (lives > 3) {
    throw new Error(`Некорректное значение lives: кол-во жизней не может быть больше 3!`);
  }
  if (answers.length !== 10) {
    throw new Error(`Некорректное кол-во элементов массива!`);
  }
  for (let i = 0; i < answers.length; i++) {
    if (!Array.isArray(answers[i])) {
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
  return !isNaN(parseFloat(n)) && isFinite(n) && typeof n === `number`;
};

const newTimer = (time) => {
  if (!isNumeric(time)) {
    throw new Error(`Невозможно создать таймер: переданное значение не является числом!`);
  }
  if (time <= 0) {
    throw new Error(`Невозможно создать таймер: переданное значение не должно быть меньше нуля!`);
  }
  if (time !== Math.round(time)) {
    throw new Error(`Невозможно создать таймер: переданное значение не является целым числом!`);
  }

  const timer = {
    timerCounter: time,
    tickTimer: (tempTimer) => {
      // Проверки
      if (!(typeof tempTimer === `object`)) {
        throw new Error(`Невозможно обновить таймер: не передан объект таймера для обновления!`);
      }
      if (!(typeof tempTimer.tickTimer === `function`)) {
        throw new Error(`Невозможно обновить таймер: объект таймера повреждён \(нет функции tickTimer\)!`);
      }
      if (!(typeof tempTimer.endTimer === `function`)) {
        throw new Error(`Невозможно обновить таймер: объект таймера повреждён \(нет функции endTimer\)!`);
      }
      if (!isNumeric(tempTimer.timerCounter)) {
        throw new Error(`Невозможно обновить таймер: объект таймера повреждён \(счётчик таймера не является числом\)!`);
      }
      if (tempTimer.timerCounter < 0) {
        throw new Error(`Невозможно обновить таймер: объект таймера повреждён \(счётчик таймера меньше нуля\)!`);
      }

      // Логика
      if (tempTimer.timerCounter === 0) {
        tempTimer.endTimer();
        return 2;
      } else {
        tempTimer.timerCounter--;
        return 1;
      }
    },
    endTimer: () => {
      // Здесь можно разместить код, который выполнится, когда таймер станет = 0
    }
  };
  return timer;
};

const getRandomFromInterval = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

const getCountRandomFromInterval = (max, count) => {
  let arr = new Set();

  while (arr.size < count)
    arr.add(getRandomFromInterval(0, max));

  return arr;
};

export {setScreen};
export {calculateScoreForAnswers};
export {newTimer};
export {getRandomFromInterval};
export {getCountRandomFromInterval};
