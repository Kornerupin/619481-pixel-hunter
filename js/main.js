import intro from "./intro";
import * as functions from "./functions";

functions.setScreen(intro);

const backButton = document.querySelector(`.back`);
backButton.addEventListener(`click`, function () {
  functions.setScreen(intro);
});

