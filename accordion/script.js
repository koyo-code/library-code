class Accordion {
  constructor({ items, autoClose, duration, toggleClass }) {
    this.stateBox = [];
    this.duration = duration;
    this.autoClose = autoClose;
    this.toggleClass = toggleClass;
    this.accordionItems = document.querySelectorAll(`.${items}`);
    this.accordionItems.forEach((_, index) => {
      this.stateBox.push(false);
      this.accordionItems[index].children[0].addEventListener(
        'click',
        this.clickEvent.bind(this, index)
      );
    });
  }
  clickEvent(index) {
    if (this.autoClose) {
      this.accordionItems.forEach((_, i) => {
        if (i !== index) {
          this.accordionItems[i].children[0].classList.remove(this.toggleClass);
          this.accordionItems[i].children[1].children[0].classList.remove(this.toggleClass);
          this.stateBox[i] = false;
        }
        gsap.to(this.accordionItems[i].children[1].children[0], {
          height: this.stateBox[i] ? 'auto' : 0,
          duration: this.duration,
        });
      });
    }
    this.stateBox[index] = !this.stateBox[index];
    this.animation(index);
  }
  animation(index) {
    if (this.stateBox[index]) {
      this.accordionItems[index].children[0].classList.add(this.toggleClass);
      this.accordionItems[index].children[1].children[0].classList.add(this.toggleClass);
    } else {
      this.accordionItems[index].children[0].classList.remove(this.toggleClass);
      this.accordionItems[index].children[1].children[0].classList.remove(this.toggleClass);
    }
    gsap.to(this.accordionItems[index].children[1].children[0], {
      height: this.stateBox[index] ? 'auto' : 0,
      duration: this.duration,
    });
  }
}

// cssでセットするdurationとjsのdurationの値はそろえて使う
// 初見だと分かりづらいので変数にしていません。

new Accordion({
  items: 'accordion__item',
  autoClose: true,
  duration: 0.5,
  toggleClass: 'is-active',
});
