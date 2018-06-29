import intro from "./intro";
import * as functions from "./functions";
import game3 from "./game-3";

functions.setScreen (game3);

document.addEventListener(`click`, (evt) => {
  if (evt.target&&
      evt.target.className === `back`) {
    functions.setScreen (intro);
  }
});

