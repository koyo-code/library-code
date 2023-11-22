class Category {
  static init({
    and = false,
    name = 'category',
    btn = '.category__btn',
    content = '.category__content',
    toggleClass = 'is-filter',
  } = {}) {
    new this({ and, name, btn, content, toggleClass });
  }
  constructor({ and, name, btn, content, toggleClass }) {
    this.and = and;
    this.toggleClass = toggleClass;
    this.filterEls = document.querySelectorAll(`[name=${name}]`);
    this.btnEls = document.querySelectorAll(btn);
    this.contentEls = document.querySelectorAll(content);
    this.filterEls.forEach((_, i) => {
      this.filterEls[i].addEventListener('change', this.main.bind(this, i));
    });
  }

  firstDisplay() {
    let judge = [];
    this.filterEls.forEach((filterEl) => {
      if (filterEl.checked) {
        judge.push(true);
      }
    });
    if (!judge.includes(true)) {
      this.contentEls.forEach((contentEl) => {
        contentEl.classList.remove(this.toggleClass);
      });
    }
  }

  btnToggle(i) {
    if (this.filterEls[i].checked) {
      this.btnEls[i].classList.add(this.toggleClass);
    } else {
      this.btnEls[i].classList.remove(this.toggleClass);
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

  containsAny(targetArray, checkArray) {
    return targetArray.some((item) => checkArray.includes(item));
  }

  areArraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }
  filter() {
    const checkElValues = this.getCheckElsValue();
    this.contentEls.forEach((contentEl) => {
      const data = contentEl.dataset.category;
      const datas = data.split('+');
      if (this.and) {
        this.andFilter(contentEl, checkElValues, datas);
      } else {
        this.orFilter(contentEl, checkElValues, datas);
      }
    });
  }

  orFilter(el, elValues, datas) {
    if (this.containsAny(elValues, datas)) {
      el.classList.remove(this.toggleClass);
    } else {
      el.classList.add(this.toggleClass);
    }
  }

  andFilter(el, elValues, datas) {
    if (this.areArraysEqual(elValues, datas)) {
      el.classList.remove(this.toggleClass);
    } else {
      el.classList.add(this.toggleClass);
    }
  }

  main(i) {
    this.btnToggle(i);
    this.filter();
    this.firstDisplay();
  }
}

Category.init();
