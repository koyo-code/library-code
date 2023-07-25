class ViewPort {
  constructor() {
    this.viewport = document.querySelector('meta[name="viewport"]');
    window.addEventListener('resize', this.fixViewport.bind(this));
  }
  fixViewport() {
    const value = window.innerWidth > 375 ? 'width=device-width,initial-scale=1' : 'width=375';
    if (this.viewport.getAttribute('content') !== value) {
      this.viewport.setAttribute('content', value);
    }
  }
}
new ViewPort();
