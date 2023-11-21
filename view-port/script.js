class ViewPort {
  static init() {
    const initObj = new this();
    window.addEventListener('load', initObj.fixViewport.bind(initObj));
    window.addEventListener('resize', initObj.fixViewport.bind(initObj));
  }
  constructor() {
    this.viewport = document.querySelector('meta[name="viewport"]');
  }
  fixViewport() {
    const value = window.innerWidth > 375 ? 'width=device-width,initial-scale=1' : 'width=375';
    if (this.viewport.getAttribute('content') !== value) {
      this.viewport.setAttribute('content', value);
    }
  }
}

ViewPort.init();
