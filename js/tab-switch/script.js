class TabSwitch {
  static init({ data = 'tab', toggleClass = 'is-active' } = {}) {
    const initObj = new this({ data, toggleClass });
    initObj.registerEvents();
  }
  constructor({ data, toggleClass }) {
    this.el = document.querySelector(`[data-${data}]`);
    this.btnEls = [...this.el.children[0].children];
    this.contentEls = [...this.el.children[1].children];
    this.toggleClass = toggleClass;
  }
  registerEvents() {
    this.btnEls.forEach((_, i) => {
      this.btnEls[i].addEventListener('click', this.main.bind(this, i));
    });
  }
  main(i, e) {
    e.preventDefault();
    for (let _i = 0; _i < this.contentEls.length; _i++) {
      if (_i !== i) {
        this.btnEls[_i].classList.remove(this.toggleClass);
        this.contentEls[_i].classList.remove(this.toggleClass);
      }
    }
    this.btnEls[i].classList.add(this.toggleClass);
    this.contentEls[i].classList.add(this.toggleClass);
  }
}
TabSwitch.init();
