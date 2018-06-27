'use strict';

let screenPosition = 0;
const keyCodeLeft = 37;
const keyCodeRight = 39;
let templates = document.querySelectorAll('template');
let centralContent = document.querySelector('.central');

let setScreen = function(number)
{
  let template = templates[number].content;
  centralContent.innerHTML = "";
  centralContent.appendChild(template);

  console.log(template);
  console.log(templates[number].content);
};

setScreen(screenPosition);

document.addEventListener('keydown', function(evt)
{
  if (evt.keyCode == keyCodeLeft) {
    if (screenPosition > 0)
      setScreen(--screenPosition);
  }
  if (evt.keyCode == keyCodeRight) {
    if (screenPosition < templates.length)
      setScreen(++screenPosition);
  }
});

document.querySelector('body').innerHTML += "<div class=\"arrows__wrap\">\n" +
  "  <style>\n" +
  "    .arrows__wrap {\n" +
  "      position: absolute;\n" +
  "      top: 95px;\n" +
  "      left: 50%;\n" +
  "      margin-left: -56px;\n" +
  "    }\n" +
  "    .arrows__btn {\n" +
  "      background: none;\n" +
  "      border: 2px solid black;\n" +
  "      padding: 5px 20px;\n" +
  "    }\n" +
  "  </style>\n" +
  "  <button class=\"arrows__btn\"><-</button>\n" +
  "  <button class=\"arrows__btn\">-></button>\n" +
  "</div>";

let arrowsBtn = document.querySelectorAll('.arrows__btn');
for (let i = 0; i < arrowsBtn.length; i++) {
  arrowsBtn[i].addEventListener("click", function()
  {
    if (this.textContent == '<-')
      if (screenPosition > 0)
        console.log("Назад " + --screenPosition);
        // setScreen(--screenPosition);

    if (this.textContent == '->')
      if (screenPosition < templates.length)
        console.log("Вперёд " + ++screenPosition);
        // setScreen(++screenPosition);
  })
}
