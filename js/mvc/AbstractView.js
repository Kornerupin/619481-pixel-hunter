export default class AbstractView {
  constructor() {
    // Do nothing
  }

  get template() {
    // Do nothing
  }

  render() {
    const temp = document.createElement(`div`);
    const fragment = document.createDocumentFragment();

    temp.innerHTML = this.template;

    while (temp.children.length > 0) {
      fragment.appendChild(temp.children[0]);
    }

    return fragment;
  }

  bind() {
    // Do nothing
  }

  get element() {
    if (!this._element) {
      this._element = this.render(this.template);
      this.bind();
    }

    return this._element;
  }
}

