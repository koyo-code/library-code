gsap.registerPlugin(ScrollToPlugin);

class SmoothScroll {
  static init({ data = 'smooth', duration = 0.5, outAnchor = true, header = null } = {}) {
    const initObj = new this({ data, duration, header, outAnchor });
    if (outAnchor) window.addEventListener('load', initObj.outAnchorLink.bind(initObj));
  }
  constructor({ data, duration, header }) {
    this.header = document.querySelector(header);
    this.duration = duration;
    this.clickEls = document.querySelectorAll(`[data-${data}]`);
    this.clickEls.forEach((clickEl) => {
      const dataset = clickEl.dataset[data];
      if (dataset === 'anchor') {
        clickEl.addEventListener('click', this.anchorLink.bind(this, clickEl));
      }
    });
  }

  movingAnimation(toEl) {
    const animationData = { duration: this.duration, scrollTo: { y: toEl, offsetY: 0 } };
    if (this.header !== null) {
      const headerHeight = this.header.offsetHeight;
      animationData.scrollTo.offsetY = headerHeight;
    }
    gsap.to(window, animationData);
  }

  anchorLink(clickEl, e) {
    e.preventDefault();
    const getAttr = clickEl.getAttribute('href');
    const toEl = document.querySelector(getAttr);
    this.movingAnimation(toEl);
  }

  outAnchorLink() {
    const hash = location.hash;
    if (hash) {
      gsap.to(window, { duration: 0, scrollTo: 0 });
      const toEl = document.querySelector(hash);
      this.movingAnimation(toEl);
    }
  }
}

SmoothScroll.init({ header: '.header' });
