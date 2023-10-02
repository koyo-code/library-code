class CountUp {
  constructor({ targets }) {
    this.targets = document.querySelectorAll(targets);
    this.targets.forEach((target) => {
      window.addEventListener('load', this.shuffleNumberCounter.bind(this, target));
    });
  }
  shuffleNumberCounter(target) {
    const targetNum = Number(target.getAttribute('data-num'));
    let targetSpeed;
    if (target.getAttribute('data-speed')) {
      targetSpeed = Number(target.getAttribute('data-speed'));
    } else {
      targetSpeed = 2;
    }
    if (!targetNum) {
      return;
    }
    let counterData = null;
    const speed = targetSpeed;
    let initNum = 0;
    function countUp() {
      if (Number.isInteger(targetNum)) {
        target.innerHTML = initNum;
      } else {
        target.innerHTML = `${initNum}.${Math.floor(Math.random() * 9)}`;
      }
      initNum++;
      if (initNum > targetNum) {
        target.innerHTML = targetNum;
        clearInterval(counterData);
      }
    }
    counterData = setInterval(countUp, speed * 10);
  }
}
new CountUp({
  targets: '.number',
});
