gsap.registerPlugin(ScrollTrigger);

class Parallax {
  static init({
    data = 'parallax',
    y,
    power = 1,
    area = { start: 'bottom', end: 'top' },
    breakpoint,
  } = {}) {
    const initObj = new this({ data, y, breakpoint, power, area });
    window.addEventListener('load', initObj.main());
    return initObj;
  }
  constructor({ data, y, breakpoint, power, area }) {
    this.dataEls = document.querySelectorAll(`[data-${data}]`);
    this.y = y;
    this.power = power;
    this.breakpoint = breakpoint;
    this.area = area;
  }

  setPcAnimation(dataEl, data) {
    const animationObj = {
      scrollTrigger: {
        trigger: dataEl,
        start: `top ${this.area.start}`,
        end: `bottom ${this.area.end}`,
        scrub: this.power,
      },
    };
    animationObj[data] = this.y;
    return animationObj;
  }

  setSpAnimation(dataEl, data) {
    const animationObj = {
      scrollTrigger: {
        trigger: dataEl,
        start: `top ${
          this.breakpoint.area && this.breakpoint.area.start
            ? this.breakpoint.area.start
            : this.area.start
        }`,
        end: `bottom  ${
          this.breakpoint.area && this.breakpoint.area.end
            ? this.breakpoint.area.end
            : this.area.end
        }`,
        scrub: this.breakpoint.power ? this.breakpoint.power : this.power,
      },
    };
    animationObj[data] = this.breakpoint.y ? this.breakpoint.y : this.y;
    return animationObj;
  }

  main() {
    this.dataEls.forEach((dataEl) => {
      const data = dataEl.dataset.parallax;
      let animationObj = {};
      let mm = gsap.matchMedia();
      if (this.breakpoint) {
        mm.add('(min-width: 769px)', () => {
          animationObj = this.setPcAnimation(dataEl, data);
          gsap.to(dataEl, animationObj);
        });
        mm.add(`(max-width: 768px)`, () => {
          animationObj = this.setSpAnimation(dataEl, data);
          gsap.to(dataEl, animationObj);
        });
      } else {
        mm.add('(min-width: 0px)', () => {
          animationObj = this.setPcAnimation(dataEl, data);
          gsap.to(dataEl, animationObj);
        });
      }
    });
  }
}

Parallax.init({ y: '20%', breakpoint: { max: 768, y: '10%' } });
