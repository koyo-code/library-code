class Search {
  static init({
    inputEl = '#searchForm',
    wrapper = '.category',
    data = 'search',
    toggleClass = 'is-filter',
    errorDOM = '<p>お探しの条件では見つかりませんでした。</p>',
  } = {}) {
    const initObj = new this({ inputEl, data, toggleClass, errorDOM, wrapper });
    initObj.searchForm.addEventListener('input', initObj.searchProcess.bind(initObj));
    return initObj;
  }
  constructor({ inputEl, data, toggleClass, errorDOM, wrapper }) {
    this.data = data;
    this.wrapper = document.querySelector(wrapper);
    this.errorDOM = errorDOM;
    this.searchForm = document.querySelector(inputEl);
    this.els = document.querySelectorAll(`[data-${data}]`);
    this.toggleClass = toggleClass;
  }
  toHiragana = (str) => {
    return str.replace(/[\u30A1-\u30FA]/g, (x) => String.fromCharCode(x.charCodeAt(0) - 0x60));
  };
  toHankaku = (str) => {
    return str.replace(/[！-～]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0));
  };
  createNotFoundEl() {
    if (!this.notFoundEl) {
      this.notFoundEl = document.createElement('div');
      this.notFoundEl.setAttribute('id', 'not-found');
      this.notFoundEl.innerHTML = this.errorDOM;
      this.wrapper.appendChild(this.notFoundEl);
    }
  }
  deleteNotFoundEl() {
    if (this.notFoundEl) {
      this.notFoundEl = null;
      document.querySelector('#not-found').remove();
    }
  }
  searchProcess() {
    const inputText = this.toHankaku(this.toHiragana(this.searchForm.value)).toLowerCase();
    const filterEls = [...this.els]
      .map((el) => {
        el.classList.remove(this.toggleClass);
        return el;
      })
      .filter((el) => {
        const dataText = el.dataset[this.data];
        return !dataText.includes(inputText);
      })
      .map((filterEl) => {
        filterEl.classList.add(this.toggleClass);
        return filterEl;
      });

    if (filterEls.length === this.els.length) {
      this.createNotFoundEl();
    } else {
      this.deleteNotFoundEl();
    }
  }
}
Search.init();
