const setScreen = (screen) => {
  const centralContent = document.querySelector(`.central`);

  while (centralContent.firstChild) {
    centralContent.removeChild(centralContent.firstChild);
  }

  centralContent.appendChild(screen);
};

const createDOMNodeFromTemplate = (elementStringData) => {
  const temp = document.createElement(`div`);
  const fragment = document.createDocumentFragment();

  temp.innerHTML = elementStringData.trim();

  while (temp.children.length > 0) {
    fragment.appendChild(temp.children[0]);
  }

  return fragment;
};

export {setScreen};
export {createDOMNodeFromTemplate};
