const isTouch = () => {
  const touch_event = window.ontouchstart;
  const touch_points = navigator.maxTouchPoints;
  if (touch_event !== undefined && 0 < touch_points) {
    return true;
  } else {
    return false;
  }
};

// 下記は関係ないコードです---
const dispEl = document.querySelector('span');
!isTouch() ? (dispEl.textContent = 'しない') : (dispEl.textContent = 'する');
