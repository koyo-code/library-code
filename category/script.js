class ScrollAnimation {
  constructor({ target, animationClass }) {
    this.animationClass = animationClass;
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
    const windowHeightQuarter = windowHeight / 4;
    this.animations.forEach((animation) => {
      const animationPos = animation.getBoundingClientRect().top;
      let delay = animation.dataset.delay;
      delay ?? (delay = 0);
      if (scrollAmount >= animationPos + scrollAmount - windowHeight + windowHeightQuarter) {
        setTimeout(() => {
          animation.classList.add(this.animationClass);
        }, delay);
      }
    });
  }
}
  new ScrollAnimation({
      target: 'scroll-target',
      animationClass: 'fade-up',
  });