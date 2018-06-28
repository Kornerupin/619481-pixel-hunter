'use strict';

let screenPosition = 0;
const keyCodeLeft = 37;
const keyCodeRight = 39;
const templates = document.querySelectorAll(`template`);

const setScreen = function (num) {
  const centralContent = document.querySelector(`.central`);
  const template = templates[num].content.cloneNode(true);
  while (centralContent.firstChild) {
    centralContent.removeChild(centralContent.firstChild);
  }
  centralContent.appendChild(template);
};

setScreen(screenPosition);

document.addEventListener(`keydown`, function (evt) {
  if (evt.keyCode === keyCodeLeft) {
    if (screenPosition > 0) {
      setScreen(--screenPosition);
    }
  }
  if (evt.keyCode === keyCodeRight) {
    if (screenPosition < templates.length) {
      setScreen(++screenPosition);
    }
  }
});

document.querySelector(`body`).innerHTML += `<div class="arrows__wrap">
  <style>
    .arrows__wrap {
      position: absolute;
      top: 95px;
      left: 50%;
      margin-left: -56px;
    }
    .arrows__btn {
      background: none;
      border: 2px solid black;
      padding: 5px 20px;
    }
  </style>
  <button class="arrows__btn"><-</button>
  <button class="arrows__btn">-></button>
</div>`;

let arrowsBtn = document.querySelectorAll(`.arrows__btn`);
for (let i = 0; i < arrowsBtn.length; i++) {
  arrowsBtn[i].addEventListener(`click`, function () {
    if (arrowsBtn[i].textContent === `<-`) {
      if (screenPosition > 0) {
        setScreen(--screenPosition);
      }
    }

    if (arrowsBtn[i].textContent === `->`) {
      if (screenPosition < templates.length) {
        setScreen(++screenPosition);
      }
    }
  });
}
