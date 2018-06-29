import intro from "./intro";
import * as functions from "./functions";

functions.setScreen(intro);
functions.setScreen(intro);

document.addEventListener(`click`, (evt) => {
  if (evt.target &&
      evt.target.offsetParent &&
      (evt.target.matches(`.back`) || evt.target.offsetParent.matches(`.header__back`))) {
    functions.setScreen(intro);
  }
});
