import intro from "./intro";
import * as functions from "./functions";

functions.setScreen(intro);

document.addEventListener(`click`, (evt) => {
  if (evt.target &&
      evt.target.className === `back`) {
    functions.setScreen(intro);
  }
});

