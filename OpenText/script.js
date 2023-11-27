class TextAccordion {
  static init({
    data = 'text',
    toggleClass = 'is-active',
    btnText = {
      open: 'もっと見る',
      close: '閉じる',
    },
    duration = 0.3,
    ease = 'none',
    row = 3,
  } = {}) {
    const initObj = new this({ data, ease, btnText, toggleClass, duration, row });
    initObj.afterLoad();
    window.addEventListener('load', initObj.setHeight());
    window.addEventListener('resize', initObj.setHeight.bind(initObj));
  }
  constructor({ data, toggleClass, ease, btnText, duration, row }) {
    this.texts = [];
    this.buttons = [];
    this.selecterHeightBox = [];
    this.selectorEls = document.querySelectorAll(`[data-${data}]`);
    this.selectorEls.forEach((selectorEl) => {
      this.texts.push(selectorEl.children[0]);
      this.buttons.push(selectorEl.children[1]);
    });
    this.btnText = btnText;
    this.toggleClass = toggleClass;
    this.duration = duration;
    this.ease = ease;
    this.row = row;
    this.buttons.forEach((_, i) => {
      this.buttons[i].addEventListener('click', this.main.bind(this, i));
    });
  }

  afterLoad() {
    this.texts.forEach((text) => {
      text.style.display = 'block';
    });
  }
  setHeight() {
    this.texts.forEach((text, i) => {
      let lineHeight = getComputedStyle(text).getPropertyValue('line-height');
      lineHeight = lineHeight.replace(/[^-\d\.]/g, '');
      const trimTextHeight = `${lineHeight * this.row}px`;
      if (!text.classList.contains(this.toggleClass)) {
        text.style.height = trimTextHeight;
      }
      this.selecterHeightBox[i] = trimTextHeight;
    });
  }

  btnTextRewrite(i) {
    if (!this.texts[i].classList.contains(this.toggleClass)) {
      this.buttons[i].textContent = this.btnText.close;
    } else {
      this.buttons[i].textContent = this.btnText.open;
    }
  }

  main(i) {
    gsap.to(this.texts[i], {
      height: this.texts[i].classList.contains(this.toggleClass)
        ? this.selecterHeightBox[i]
        : 'auto',
      duration: this.duration,
      ease: this.ease,
    });
    this.btnTextRewrite(i);
    this.texts[i].classList.toggle(this.toggleClass);
  }
}

TextAccordion.init();
