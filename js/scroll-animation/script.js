class ScrollAnimation {
  static init({ percent = 25, breakpoint = null, data = 'scroll' } = {}) {
    const initObj = new this({ percent, breakpoint, data });
    document.querySelectorAll(`[data-${data}]`).forEach((targetEl) => {
      initObj.elsData.push({ el: targetEl });
    });
    window.addEventListener('load', initObj.main());
    window.addEventListener('resize', initObj.main.bind(initObj));
    window.addEventListener('scroll', initObj.main.bind(initObj));
    return initObj;
  }
  constructor({ percent, breakpoint } = {}) {
    this.scroll = {};
    this.elsData = [];
    this.breakpoint = breakpoint;
    this.percent = percent;
  }
  windowData() {
    this.scroll.y = window.scrollY;
    this.scroll.wH = window.innerHeight;
    this.scroll.wW = window.innerWidth;
    this.scroll.wHpercent = this.scroll.wH * (this.percent * 0.01);
    if (this.breakpoint) {
      this.scroll.wHPercentSp = this.scroll.wH * (this.breakpoint.percent * 0.01);
    }
  }

  setElData(elData) {
    elData.pos = elData.el.getBoundingClientRect().top + this.scroll.y;
    elData.animation = elData.el.dataset.scroll;
    elData.delay = elData.el.dataset.delay ?? (elData.delay = 0);
    elData.spDelay = elData.el.dataset.spdelay ?? (elData.spDelay = 0);
  }

  addClass(elData) {
    if (this.breakpoint) {
      if (this.scroll.wW >= this.breakpoint.max) {
        if (this.scroll.y >= elData.pos - this.scroll.wH + this.scroll.wHpercent) {
          setTimeout(() => {
            elData.el.classList.add(elData.animation);
          }, elData.delay);
        }
      } else {
        if (this.scroll.y >= elData.pos - this.scroll.wH + this.scroll.wHPercentSp) {
          setTimeout(() => {
            elData.el.classList.add(elData.animation);
          }, elData.spDelay);
        }
      }
    } else {
      if (this.scroll.y >= elData.pos - this.scroll.wH + this.scroll.wHpercent) {
        setTimeout(() => {
          elData.el.classList.add(elData.animation);
        }, elData.delay);
      }
    }
  }

  main() {
    this.windowData();
    this.elsData.forEach((elData, i) => {
      this.setElData(elData, i);
      this.addClass(elData, i);
    });
  }
}

new ScrollAnimation();
