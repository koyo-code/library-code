gsap.registerPlugin(ScrollTrigger);
class Parallax {
  constructor({ bgEls, yPercent, scrubPower, sp }) {
    this.sp = sp;
    this.bgEls = document.querySelectorAll(`.${bgEls}`);
    this.yPercent = yPercent;
    this.scrubPower = scrubPower;
    window.addEventListener('load', this.init());
  }
  pcProcess() {
    this.bgEls.forEach((bgEl) => {
      gsap.to(bgEl, {
        backgroundPosition: `center ${this.yPercent}%`,
        scrollTrigger: {
          trigger: bgEl,
          start: 'top bottom',
          end: 'bottom top',
          scrub: this.scrubPower,
        },
      });
    });
  }
  spProcess() {
    this.bgEls.forEach((bgEl) => {
      gsap.to(bgEl, {
        backgroundPosition: `center ${this.sp.yPercent}%`,
        scrollTrigger: {
          trigger: bgEl,
          start: 'top bottom',
          end: 'bottom top',
          scrub: this.sp.scrubPower,
        },
      });
    });
  }
  init() {
    if (!this.sp) {
      this.pcProcess();
    } else {
      const mm = gsap.matchMedia();
      mm.add(`(max-width: ${this.sp.break}px)`, () => {
        this.spProcess();
      });
      mm.add(`(min-width: ${this.sp.break + 1}px)`, () => {
        this.pcProcess();
      });
    }
  }
}
new Parallax({
  bgEls: 'bg',
  yPercent: 70,
  scrubPower: 1,
  sp: {
    break: 768,
    yPercent: 100,
    scrubPower: 1,
  },
});
