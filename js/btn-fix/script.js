class StickToMouse {
  static init({ data = 'hover', duration = 0.4, stickPower = 0.4, bounce = 5 } = {}) {
    const initObj = new this({ data, duration, stickPower, bounce });
    initObj.els.forEach((el) => {
      el.addEventListener('mouseenter', initObj.enter.bind(initObj, el));
      el.addEventListener('mousemove', initObj.onMouseMove.bind(initObj, el));
      el.addEventListener('mouseleave', initObj.leave.bind(initObj, el));
    });
  }
  constructor({ data, duration, stickPower, bounce }) {
    this.duration = duration;
    this.stickPower = stickPower;
    this.bounce = bounce;
    this.els = document.querySelectorAll(`[data-${data}]`);
    this.elemData = {};
  }
  enter(el) {
    this.elemData = el.getBoundingClientRect();
  }
  onMouseMove(el, e) {
    const { height, width, left, top } = this.elemData;
    const transX = (e.clientX - width / 2 - left) * this.stickPower;
    const transY = (e.clientY - height / 2 - top) * this.stickPower;
    gsap.to(el, {
      x: transX,
      y: transY,
      duration: this.duration,
    });
  }
  leave(el) {
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: this.duration,
      ease: `back.out(${this.bounce})`,
    });
  }
}
const isTouch = () => {
  const touch_event = window.ontouchstart;
  const touch_points = navigator.maxTouchPoints;
  if (touch_event !== undefined && 0 < touch_points) {
    return true;
  } else {
    return false;
  }
};

// タッチデバイスではないならインスタンスを生成
if (!isTouch()) StickToMouse.init();
