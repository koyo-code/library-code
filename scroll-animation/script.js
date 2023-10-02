class ScrollAnimation {
  constructor({ target, animationClass, division, sp }) {
    sp && (this.sp = sp);
    this.animationClass = animationClass;
    this.division = division;
    this.animations = document.querySelectorAll(`.${target}`);
    window.addEventListener('load', this.init());
    window.addEventListener('scroll', this.addClass.bind(this));
  }
  init() {
    this.addClass();
  }
  addClass() {
    const scrollAmount = window.scrollY;
    const windowHeight = window.innerHeight;
    let windowHeightDivision;
    if (this.sp) {
      if (this.sp.break < window.innerWidth) {
        windowHeightDivision = windowHeight / this.division;
      } else {
        windowHeightDivision = windowHeight / this.sp.division;
      }
    } else {
      windowHeightDivision = windowHeight / this.division;
    }
    this.animations.forEach((animation) => {
      const animationPos = animation.getBoundingClientRect().top;
      let delay = animation.dataset.delay;
      let spDelay = animation.dataset.spdelay;
      delay ?? (delay = 0);
      spDelay ?? (spDelay = 0);

      if (!spDelay) {
        if (scrollAmount >= animationPos + scrollAmount - windowHeight + windowHeightDivision) {
          setTimeout(() => {
            animation.classList.add(this.animationClass);
          }, delay);
        }
      } else {
        if (window.innerWidth > 768) {
          if (scrollAmount >= animationPos + scrollAmount - windowHeight + windowHeightDivision) {
            setTimeout(() => {
              animation.classList.add(this.animationClass);
            }, delay);
          }
        } else {
          if (scrollAmount >= animationPos + scrollAmount - windowHeight + windowHeightDivision) {
            setTimeout(() => {
              animation.classList.add(this.animationClass);
            }, spDelay);
          }
        }
      }
    });
  }
}
new ScrollAnimation({
  target: 'scroll-target',
  animationClass: 'fade-up',
  division: 4,
  sp: {
    break: 768,
    division: 6,
  },
});
