import intro from "./intro";
import * as functions from "./functions";

functions.setScreen(intro);

document.addEventListener(`click`, function (evt) {
  if (evt.target) {
    if (evt.target.offsetParent) {
      if (evt.target.offsetParent.className === `back`) {
        functions.setScreen (intro);
      }
    }
  }
});

