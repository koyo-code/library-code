class Accordion {
  static init({
    data = 'accordion',
    toggleClass = 'is-open',
    duration = 0.3,
    ease = 'none',
    autoClose = false,
  } = {}) {
    new this({ data, toggleClass, ease, duration, autoClose });
  }
  constructor({ data, toggleClass, ease, duration, autoClose }) {
    this.els = document.querySelectorAll(`[data-${data}]`);
    this.toggleClass = toggleClass;
    this.ease = ease;
    this.autoClose = autoClose;
    this.duration = duration;
    this.els.forEach((el) => {
      el.children[0].addEventListener('click', this.main.bind(this, el));
    });
  }

  closingMovement(el) {
    for (let i = 0; i < this.els.length; i++) {
      if (this.els[i] !== el) {
        this.closeMovingAnimation(this.els[i]);
        this.els[i].children[0].classList.remove(this.toggleClass);
        this.els[i].children[1].classList.remove(this.toggleClass);
      }
    }
  }

  closeMovingAnimation(el) {
    gsap.to(el.children[1], {
      height: 0,
      duration: this.duration,
      ease: this.ease,
    });
  }

  movingAnimation(el) {
    gsap.to(el.children[1], {
      height: el.children[1].classList.contains(this.toggleClass) ? 0 : 'auto',
      duration: this.duration,
      ease: this.ease,
    });
  }

  main(el) {
    if (this.autoClose) {
      this.closingMovement(el);
    }
    this.movingAnimation(el);
    el.children[0].classList.toggle(this.toggleClass);
    el.children[1].classList.toggle(this.toggleClass);
  }
}

Accordion.init();
