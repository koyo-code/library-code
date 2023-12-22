class CountUp {
  static init({ targets } = {}) {
    new this({ targets });
  }
  constructor({ targets }) {
    this.targets = document.querySelectorAll(targets);
    this.initNum = 0;
    this.targets.forEach((target) => {
      window.addEventListener('load', this.shuffleNumberCounter.bind(this, target));
    });
  }
  countUp(counterData, target, targetNum) {
    if (Number.isInteger(targetNum)) {
      target.innerHTML = this.initNum;
    } else {
      target.innerHTML = `${this.initNum}.${Math.floor(Math.random() * 9)}`;
    }
    this.initNum++;
    if (this.initNum > targetNum) {
      target.innerHTML = targetNum;
      clearInterval(counterData);
    }
  }
  shuffleNumberCounter(target) {
    const targetNum = Number(target.getAttribute('data-num'));
    let targetSpeed;
    if (target.getAttribute('data-speed')) {
      targetSpeed = Number(target.getAttribute('data-speed'));
    } else {
      targetSpeed = 1;
    }
    if (!targetNum) {
      return;
    }
    let counterData = null;
    const speed = targetSpeed;

    counterData = setInterval(this.countUp(counterData, target, targetNum), speed * 10);
  }
}
CountUp.init({ targets: '.number' });
