class SplitText {
  constructor({ targets, addClass }) {
    this.targets = document.querySelectorAll(`.${targets}`);
    this.addClass = addClass;
    this.targets.forEach((el) => {
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
new SplitText({
  targets: 'split',
  addClass: 'is-split',
});
