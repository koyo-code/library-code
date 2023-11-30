class ButtonHover {
  static init({ data = 'hover' } = {}) {
    const initObj = new this({ data });
    initObj.buttons.forEach((button) => {
      button.style.position = 'relative';
      button.style.overflow = 'hidden';
      initObj.createSpan(button);
      ['mouseenter', 'mouseleave'].forEach((eventName) => {
        button.addEventListener(eventName, initObj.circleMove.bind(initObj));
      });
    });
  }

  constructor({ data }) {
    this.buttons = document.querySelectorAll(`[data-${data}]`);
  }

  createSpan(button) {
    const spanEl = document.createElement('span');
    spanEl.style.position = 'absolute';
    spanEl.style.borderRadius = '50%';
    spanEl.style.top = '0px';
    spanEl.style.left = '0px';
    spanEl.style.height = '0px';
    spanEl.style.width = '0px';
    spanEl.style.zIndex = '-1';
    spanEl.style.transition = 'width 0.5s ease-in-out, height 0.5s ease-in-out';
    spanEl.style.transform = 'translate(-50%,-50%)';
    button.appendChild(spanEl);
  }

  circleMove(e) {
    const type = e.type === 'mouseenter';
    const target = e.target;
    const parentOffset = target.getBoundingClientRect();
    const circleEl = target.querySelector('span');
    let diagonal = 0;
    if (type) {
      diagonal =
        Math.sqrt(
          parentOffset.width * parentOffset.width + parentOffset.height * parentOffset.height
        ) * 2;
    }
    const relX = e.pageX - parentOffset.left;
    const relY = e.pageY - window.scrollY - parentOffset.top;
    circleEl.style.height = diagonal + 'px';
    circleEl.style.width = diagonal + 'px';
    circleEl.style.top = relY + 'px';
    circleEl.style.left = relX + 'px';
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
if (!isTouch()) ButtonHover.init();
