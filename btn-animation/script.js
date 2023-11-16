class ButtonHoverEffect {
  constructor(selectors) {
    this.buttons = document.querySelectorAll(selectors);
    window.addEventListener('load', this.init.bind(this));
  }
  init() {
    this.buttons.forEach((button) => {
      this.createSpan(button);
      button.addEventListener('mouseenter', this.handleMouseEnter.bind(this, button));
      button.addEventListener('mouseout', this.handleMouseOut.bind(this, button));
    });
  }

  createSpan(button) {
    const spanEl = document.createElement('span');
    button.appendChild(spanEl);
  }

  handleMouseEnter(button, e) {
    const parentOffset = button.getBoundingClientRect();
    const relX = e.pageX - parentOffset.left;
    const relY = e.pageY - window.scrollY - parentOffset.top;
    button.querySelector('span').style.top = relY + 'px';
    button.querySelector('span').style.left = relX + 'px';
  }

  handleMouseOut(button, e) {
    const parentOffset = button.getBoundingClientRect();
    const relX = e.pageX - parentOffset.left;
    const relY = e.pageY - window.scrollY - parentOffset.top;
    button.querySelector('span').style.top = relY + 'px';
    button.querySelector('span').style.left = relX + 'px';
  }
}

new ButtonHoverEffect('.btn');
