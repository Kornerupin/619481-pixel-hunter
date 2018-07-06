import {setScreen} from "./functions";
import Intro from "./mvc/screens/intro";
import Footer from "./mvc/template/footer";

let startGameContent = new Intro();
let startGameFooter = new Footer();
setScreen(false, startGameContent.element, false, startGameFooter.element);
