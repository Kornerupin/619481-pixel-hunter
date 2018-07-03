import * as functions from "./functions";
import listeners from "./listeners";
import intro from "./screens/intro";

functions.setScreen(intro);

if (!listeners) {
  let a = 1 === 1;
  if (a) {
    a += listeners + a;
  }
}
