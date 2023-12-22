class Popup {
  static init({
    data = 'popup',
    closeEls = ['.popup__overlay', '.popup__close-btn'],
    toggleClass = 'is-active',
  } = {}) {
    const initObj = new this({ data, closeEls, toggleClass });
    initObj.closeEls.forEach((closeEl) => {
      closeEl.addEventListener('click', initObj.close.bind(initObj));
    });
    initObj.openEls.forEach((openEl) => {
      openEl.addEventListener('click', initObj.open.bind(initObj));
    });
  }
  constructor({ data, closeEls, toggleClass }) {
    this.toggleClass = toggleClass;
    this.data = data;
    this.openEls = document.querySelectorAll(`[data-${this.data}-btn]`);
    this.closeEls = document.querySelectorAll([...closeEls]);
  }
  open(e) {
    e.preventDefault();
    const data = e.target.dataset[`${this.data}Btn`];
    const popupEl = document.querySelector(`[data-${this.data}-display="${data}"]`);
    popupEl.classList.add(this.toggleClass);
  }
  close(e) {
    e.preventDefault();
    const popupEl = e.target.closest(`.${this.data}`);
    popupEl.classList.remove(this.toggleClass);
  }
}
Popup.init();
