import * as functions from "./functions";
import greeting from "./greeting";

const intro = functions.createDOMNodeFromTemplate(`
    <div id="intro" class="intro">
      <h1 class="intro__asterisk">*</h1>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </div>`);

const nextButton = document.querySelector('.intro__asterisk');
nextButton.addEventListener('click', function()
{
  functions.setScreen(greeting);
});

export default intro;
