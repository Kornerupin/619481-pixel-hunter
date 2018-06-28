const setScreen = function(screen)
{
  const centralContent = document.querySelector('.central__content');

  while (centralContent.firstChild) {
    centralContent.removeChild(centralContent.firstChild)
  }

  centralContent.appendChild(screen.cloneNode(true));
};

const createDOMNodeFromTemplate = function(elementStringData)
{
  let temp = document.createElement('div');
  temp.innerHTML = elementStringData;
  return temp.firstChild;
};

export {setScreen, createDOMNodeFromTemplate};
