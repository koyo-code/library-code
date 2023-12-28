gsap.registerPlugin(ScrollToPlugin);

class SmoothScroll {
  static init({ duration = 0.5, ease = 'power2,inOut', header = null, outAnchor = true } = {}) {
    const initObj = new this({ duration, ease, header, outAnchor });
    window.addEventListener('load', initObj.setBodyId.bind(initObj));
    if (outAnchor) window.addEventListener('load', initObj.outAnchorLink.bind(initObj));
  }
  constructor({ duration, ease, header }) {
    this.header = document.querySelector(header);
    this.duration = duration;
    this.ease = ease;
    this.clickEls = document.querySelectorAll("a[href*='#']");
    this.clickEls.forEach((clickEl) => {
      clickEl.addEventListener('click', this.anchorLink.bind(this, clickEl));
    });
  }

  setBodyId() {
    document.body.setAttribute('id', 'page-top');
  }

  movingAnimation(toEl) {
    const animationData = {
      duration: this.duration,
      ease: this.ease,
      scrollTo: { y: toEl, offsetY: 0 },
    };
    if (this.header !== null) {
      const headerHeight = this.header.offsetHeight;
      animationData.scrollTo.offsetY = headerHeight;
    }
    gsap.to(window, animationData);
  }
  anchorLink(clickEl, e) {
    if (document.querySelector(clickEl.hash)) {
      e.preventDefault();
    }
    let attr = clickEl.getAttribute('href');
    let toEl;
    if (attr === '#page-top') {
      toEl = document.body;
    } else {
      attr.indexOf('/') === -1
        ? (toEl = document.querySelector(attr))
        : (toEl = document.querySelector(attr.substr(attr.indexOf('#'))));
    }
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
