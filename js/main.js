import * as functions from "./functions";
import listeners from "./listeners";
import intro from "./screens/intro";

functions.setScreen(intro);
let a = listeners();
if (a) {
  Math.round(1234);
}
