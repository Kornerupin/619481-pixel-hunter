import {assert} from 'chai';
import {calculateScoreForAnswers, newTimer} from '../functions';

const TEST_ARRAY_INCORRECT_LENGTH = Object.freeze({
  lives: 2,
  answers: [[1, 23.4324], [1, 12.7753]]
});
const TEST_ARRAY_INCORRECT_TYPE = Object.freeze({
  lives: 2,
  answers: [`incorrect_type`, [0, 30], [1, 12.2134], [0, 12.2423], [0, 0.9923], [1, 29.2230], [1, 5.2342], [0, 28.2214], [1, 19.4022], [1, 12.7753]]
});
const TEST_ARRAY_INCORRECT_STATUS = Object.freeze({
  lives: 2,
  answers: [[1, 23.4324], [0, 30], [40, 12.2134], [0, 12.2423], [0, 0.9923], [1, 29.2230], [1, 5.2342], [0, 28.2214], [1, 19.4022], [1, 12.7753]]
});
const TEST_ARRAY_INCORRECT_STATUS_2 = Object.freeze({
  lives: 2,
  answers: [[1, 23.4324], [0, 30], [`40`, 12.2134], [0, 12.2423], [0, 0.9923], [1, 29.2230], [1, 5.2342], [0, 28.2214], [1, 19.4022], [1, 12.7753]]
});
const TEST_ARRAY_INCORRECT_TIME = Object.freeze({
  lives: 2,
  answers: [[1, 23.4324], [0, 30], [1, `-12.2134`], [0, 12.2423], [0, 0.9923], [1, 29.2230], [1, 5.2342], [0, 28.2214], [1, 19.4022], [1, 12.7753]]
});
const TEST_ARRAY_INCORRECT_TIME_2 = Object.freeze({
  lives: 2,
  answers: [[1, 23.4324], [0, 30], [1, -12.2134], [0, 12.2423], [0, 0.9923], [1, 29.2230], [1, 5.2342], [0, 28.2214], [1, 19.4022], [1, 12.7753]]
});

const TEST_ARRAY_CORRECT = Object.freeze({
  lives: 2,
  answers: [[1, 23.4324], [0, 30], [1, 12.2134], [0, 12.2423], [0, 0.9923], [1, 29.2230], [1, 5.2342], [0, 28.2214], [1, 19.4022], [1, 12.7753]]
});
const TEST_ARRAY_CORRECT_ALL_GOOD_1150 = Object.freeze({
  lives: 3,
  answers: [[1, 13], [1, 19], [1, 19], [1, 11], [1, 15], [1, 16], [1, 18], [1, 18], [1, 19], [1, 14]]
});

describe(`Тест функции calculateScoreForAnswers`, () => {
  it(`Проверка на некорректные данные`, () => {
    assert.throws(() => calculateScoreForAnswers(`string`, TEST_ARRAY_CORRECT.answers), /Некорректное значение lives: кол-во жизней должно быть числом!/);
    assert.throws(() => calculateScoreForAnswers(-1, TEST_ARRAY_CORRECT.answers), /Некорректное значение lives: кол-во жизней не может быть отрицательным!/);
    assert.throws(() => calculateScoreForAnswers(50, TEST_ARRAY_CORRECT.answers), /Некорректное значение lives: кол-во жизней не может быть больше 3!/);

    assert.throws(() => calculateScoreForAnswers(2, TEST_ARRAY_INCORRECT_LENGTH.answers), /Некорректное кол-во элементов массива!/);
    assert.throws(() => calculateScoreForAnswers(2, TEST_ARRAY_INCORRECT_TYPE.answers), /Некорректный тип значения элемента массива - ожидается массив!/);
    assert.throws(() => calculateScoreForAnswers(2, TEST_ARRAY_INCORRECT_STATUS.answers), /Некорректное значение статуса ответа - допустимые значения 0 или 1!/);
    assert.throws(() => calculateScoreForAnswers(2, TEST_ARRAY_INCORRECT_STATUS_2.answers), /Некорректное значение статуса ответа - полученное значение не является числом!/);
    assert.throws(() => calculateScoreForAnswers(2, TEST_ARRAY_INCORRECT_TIME.answers), /Некорректное значение времени - ожидается число!/);
    assert.throws(() => calculateScoreForAnswers(2, TEST_ARRAY_INCORRECT_TIME_2.answers), /Некорректное значение времени - ожидается число в интервале от 0 до 30!/);
  });

  it(`Проверка на корректные данные`, () => {
    assert.equal(calculateScoreForAnswers(TEST_ARRAY_CORRECT.lives, TEST_ARRAY_CORRECT.answers), 650);
    assert.equal(calculateScoreForAnswers(TEST_ARRAY_CORRECT_ALL_GOOD_1150.lives, TEST_ARRAY_CORRECT_ALL_GOOD_1150.answers), 1150);
  });
});


describe(`Тест функции newTimer`, () => {
  it(`Проверка на некорректные данные`, () => {
    assert.throws(() => newTimer(`adfds`), /Невозможно создать таймер: переданное значение не является числом!/);
    assert.throws(() => newTimer(-23), /Невозможно создать таймер: переданное значение не должно быть меньше нуля!/);
    assert.throws(() => newTimer(23.23), /Невозможно создать таймер: переданное значение не является целым числом!/);
  });
  it(`Проверка на корректные данные`, () => {
    // assert.equal();
  });
});

const TEST_TIMER = newTimer(20);
const TEST_TIMER_BROKE_TICK_FUNCTION = {
  timerCounter: 10,
  endTimer: () => {
    return 2;
  }
};
const TEST_TIMER_BROKE_END_FUNCTION = {
  timerCounter: 10,
  tickTimer: () => {
    return 1;
  }
};
const TEST_TIMER_BROKE_COUNTER = {
  timerCounter: `10`,
  tickTimer: () => {
    return 1;
  },
  endTimer: () => {
    return 2;
  }
};
const TEST_TIMER_BROKE_COUNTER_2 = {
  timerCounter: -100,
  tickTimer: () => {
    return 1;
  },
  endTimer: () => {
    return 2;
  }
};

describe(`Тест функции tickTimer`, () => {
  it(`Проверка на некорректные данные`, () => {
    assert.throws(() => TEST_TIMER.tickTimer(), /Невозможно обновить таймер: не передан объект таймера для обновления!/);
    assert.throws(() => TEST_TIMER.tickTimer(TEST_TIMER_BROKE_TICK_FUNCTION), /Невозможно обновить таймер: объект таймера повреждён \(нет функции tickTimer\)!/);
    assert.throws(() => TEST_TIMER.tickTimer(TEST_TIMER_BROKE_END_FUNCTION), /Невозможно обновить таймер: объект таймера повреждён \(нет функции endTimer\)!/);
    assert.throws(() => TEST_TIMER.tickTimer(TEST_TIMER_BROKE_COUNTER), /Невозможно обновить таймер: объект таймера повреждён \(счётчик таймера не является числом\)!/);
    assert.throws(() => TEST_TIMER.tickTimer(TEST_TIMER_BROKE_COUNTER_2), /Невозможно обновить таймер: объект таймера повреждён \(счётчик таймера меньше нуля\)!/);
  });
  it(`Проверка на корректные данные`, () => {

  });
});
