class SplitText {
  static init({ data = 'split', addClass = 'is-split' } = {}) {
    new this({ data, addClass });
  }
  constructor({ data, addClass }) {
    this.els = document.querySelectorAll(`[data-${data}]`);
    this.addClass = addClass;
    this.els.forEach((el) => {
      this.chars = el.innerText.trim();
      this.catStr = '';
      el.innerHTML = this.splitText();
    });
  }
  splitText() {
    for (let char of this.chars) {
      char = char.replace(' ', '&nbsp;');
      this.catStr += `<span class="${this.addClass}">${char}</span>`;
    }
    return this.catStr;
  }
}
SplitText.init();
