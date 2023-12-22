class Category {
  static init({
    and = false,
    wrapper = '.category',
    name = 'category',
    btn = '.category__btn',
    content = '.category__content',
    toggleClass = 'is-filter',
    errorDOM = '<p>お探しの条件では見つかりませんでした。</p>',
  } = {}) {
    const initObj = new this({ and, name, btn, content, toggleClass, wrapper, errorDOM });
    return initObj;
  }
  constructor({ and, name, btn, content, toggleClass, wrapper, errorDOM }) {
    this.notFoundEl = null;
    this.errorDOM = errorDOM;
    this.and = and;
    this.toggleClass = toggleClass;
    this.wrapper = document.querySelector(wrapper);
    this.filterEls = this.wrapper.querySelectorAll(`[name=${name}]`);
    this.btnEls = this.wrapper.querySelectorAll(btn);
    this.contentEls = this.wrapper.querySelectorAll(content);
    this.filterEls.forEach((_, i) => {
      this.filterEls[i].addEventListener('change', this.main.bind(this, i));
    });
  }
  allDisplay() {
    this.filterEls[0].checked = true;
    this.btnEls[0].classList.add(this.toggleClass);
    this.btnEls.forEach((btnEl, _i) => {
      if (0 !== _i) {
        btnEl.classList.remove(this.toggleClass);
        this.filterEls[_i].checked = false;
      }
    });
    this.contentEls.forEach((contentEl) => {
      contentEl.classList.remove(this.toggleClass);
    });
    this.deleteNotFoundEl();
  }

  btnProcess(i) {
    if (i !== 0) {
      this.btnEls[0].classList.remove(this.toggleClass);
      this.filterEls[0].checked = false;
      if (this.filterEls[i].checked) {
        this.filterEls[i].checked = true;
        this.btnEls[i].classList.add(this.toggleClass);
      } else {
        this.filterEls[i].checked = false;
        this.btnEls[i].classList.remove(this.toggleClass);
      }
    }
  }
  getCheckElsValue() {
    let checkElsValue = [];
    this.filterEls.forEach((filterEl) => {
      if (filterEl.checked) {
        const checkElValue = filterEl.value;
        checkElsValue.push(checkElValue);
      }
    });
    return checkElsValue;
  }

  filter() {
    const checkElValues = this.getCheckElsValue();
    if (checkElValues[0] === 'all') {
      this.allDisplay();
    } else if (checkElValues.length === 0) {
      this.allDisplay();
    } else {
      const boolBox = [];
      this.contentEls.forEach((contentEl) => {
        const data = contentEl.dataset.category;
        const datas = data.split('+');
        let filterProcess;
        if (this.and) {
          filterProcess = this.andFilter(contentEl, checkElValues, datas);
        } else {
          filterProcess = this.orFilter(contentEl, checkElValues, datas);
        }
        boolBox.push(filterProcess);
      });

      const noAllBtns = [...this.btnEls].slice(1);

      const boolBox2 = noAllBtns.map((noAllBtn) => {
        if (noAllBtn.classList.contains(this.toggleClass)) {
          return true;
        } else {
          return false;
        }
      });

      if (!boolBox.includes(true)) {
        this.createNotFoundEl();
      } else {
        if (!this.and && !boolBox2.includes(false)) {
          this.allDisplay();
        } else {
          this.deleteNotFoundEl();
        }
      }
    }
  }

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

  orFilter(contentEl, checkElValues, datas) {
    const filterBool = this.containsAny(checkElValues, datas);
    if (filterBool) {
      contentEl.classList.remove(this.toggleClass);
    } else {
      contentEl.classList.add(this.toggleClass);
    }
    return filterBool;
  }

  andFilter(contentEl, checkElValues, datas) {
    const filterBool = this.areArraysEqual(checkElValues, datas);
    if (filterBool) {
      contentEl.classList.remove(this.toggleClass);
    } else {
      contentEl.classList.add(this.toggleClass);
    }
    return filterBool;
  }

  containsAny(checkElValues, datas) {
    return checkElValues.some((item) => datas.includes(item));
  }

  areArraysEqual(checkElValues, datas) {
    if (checkElValues.length !== datas.length) return false;
    for (let i = 0; i < checkElValues.length; i++) {
      if (checkElValues[i] !== datas[i]) return false;
    }
    return true;
  }

  main(i) {
    this.btnProcess(i);
    this.filter();
  }
}

Category.init();
