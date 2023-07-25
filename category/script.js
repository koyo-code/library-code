class Gallery {
  constructor({ toggleClass, btns, items, more }) {
    if (more) {
      this.more = more;
      this.initAppear = more.appear;
      this.appear = more.appear;
      this.add = more.add;
      this.moreBtn = document.querySelector(`.${more.btn}`);
      if (more.sp) {
        this.totalInitAppear;
        this.totalAppear;
        this.totalAdd;
        this.sp = more.sp;
        this.break = this.sp.break;
        this.spInitAppear = this.sp.appear;
        this.spAppear = this.sp.appear;
        this.spAdd = this.sp.add;
      }
    }
    this.toggleClass = toggleClass;
    this.btns = document.querySelectorAll(`.${btns}`);
    this.item = items;
    this.items = document.querySelectorAll(`.${this.item}`);
    window.addEventListener('load', this.init());
    if (this.sp) {
      window.addEventListener('resize', this.resizeEvent.bind(this));
    }
    if (this.more) {
      this.moreBtn.addEventListener('click', this.moreView.bind(this));
    }
    this.btns.forEach((_, index) => {
      this.btns[index].addEventListener('click', this.search.bind(this, index));
    });
  }
  total() {
    if (window.innerWidth > this.break) {
      this.totalInitAppear = this.initAppear;
      this.totalAppear = this.appear;
      this.totalAdd = this.add;
    } else {
      this.totalInitAppear = this.spInitAppear;
      this.totalAppear = this.spAppear;
      this.totalAdd = this.spAdd;
    }
  }
  init() {
    if (this.sp) {
      this.total();
    }
    this.btns.forEach((btn) => {
      const btnData = Object.keys(btn.dataset)[0];
      const btnFilter = btn.getAttribute(`data-${btnData}`);
      if (btnFilter === 'all') {
        btn.classList.add(this.toggleClass);
      }
    });
    if (this.more) {
      if (this.sp) {
        if (this.items.length > this.totalInitAppear) {
          this.moreBtn.classList.add(this.toggleClass);
        }
        for (let i = 0; i < this.totalAppear; i++) {
          this.items[i].classList.add(this.toggleClass);
        }
      } else {
        if (this.items.length > this.initAppear) {
          this.moreBtn.classList.add(this.toggleClass);
        }
        for (let i = 0; i < this.appear; i++) {
          this.items[i].classList.add(this.toggleClass);
        }
      }
    } else {
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].classList.add(this.toggleClass);
      }
    }
  }
  resizeEvent() {
    this.total();
    if (this.items.length > this.totalInitAppear) {
      this.moreBtn.classList.add(this.toggleClass);
    }
    for (let i = 0; i < this.totalAppear; i++) {
      this.items[i].classList.add(this.toggleClass);
    }
  }
  moreView(event) {
    event.preventDefault();
    if (this.sp) {
      this.totalAppear = this.totalAppear + this.totalAdd;
    } else {
      this.appear = this.appear + this.add;
    }
    this.btns.forEach((_, i) => {
      if (this.btns[i].classList.contains(this.toggleClass)) {
        const btnData = Object.keys(this.btns[i].dataset)[0];
        const btnFilter = this.btns[i].getAttribute(`data-${btnData}`);
        if (btnFilter == 'all') {
          if (this.sp) {
            if (this.items.length === this.totalAppear) {
              this.moreBtn.classList.remove(this.toggleClass);
            }
          } else {
            if (this.items.length === this.appear) {
              this.moreBtn.classList.remove(this.toggleClass);
            }
          }
          if (this.sp) {
            if (this.items.length >= this.totalAppear) {
              for (let i = 0; i < this.totalAppear; i++) {
                this.items[i].classList.add(this.toggleClass);
              }
            } else {
              for (let i = 0; i < this.items.length; i++) {
                this.items[i].classList.add(this.toggleClass);
              }
              this.moreBtn.classList.remove(this.toggleClass);
            }
          } else {
            if (this.items.length >= this.appear) {
              for (let i = 0; i < this.appear; i++) {
                this.items[i].classList.add(this.toggleClass);
              }
            } else {
              for (let i = 0; i < this.items.length; i++) {
                this.items[i].classList.add(this.toggleClass);
              }
              this.moreBtn.classList.remove(this.toggleClass);
            }
          }
        } else {
          const itemsData = Object.keys(this.items[i].dataset)[0];
          const fadeItems = document.querySelectorAll(
            `.${this.item}[data-${itemsData}='${btnFilter}']`
          );
          if (this.sp) {
            if (fadeItems.length === this.totalAppear) {
              this.moreBtn.classList.remove(this.toggleClass);
            }
          } else {
            if (fadeItems.length === this.appear) {
              this.moreBtn.classList.remove(this.toggleClass);
            }
          }
          if (this.sp) {
            if (fadeItems.length >= this.totalAppear) {
              for (let i = 0; i < this.totalAppear; i++) {
                fadeItems[i].classList.add(this.toggleClass);
              }
            } else {
              for (let i = 0; i < fadeItems.length; i++) {
                fadeItems[i].classList.add(this.toggleClass);
              }
              this.moreBtn.classList.remove(this.toggleClass);
            }
          } else {
            if (fadeItems.length >= this.appear) {
              for (let i = 0; i < this.appear; i++) {
                fadeItems[i].classList.add(this.toggleClass);
              }
            } else {
              for (let i = 0; i < fadeItems.length; i++) {
                fadeItems[i].classList.add(this.toggleClass);
              }
              this.moreBtn.classList.remove(this.toggleClass);
            }
          }
        }
      }
    });
  }
  search(index, event) {
    event.preventDefault();
    if (this.sp) {
      this.totalAppear = this.totalInitAppear;
    } else {
      this.appear = this.initAppear;
    }
    this.items.forEach((item) => {
      item.classList.remove(this.toggleClass);
    });
    this.btns.forEach((btn) => {
      btn.classList.remove(this.toggleClass);
    });
    this.btns[index].classList.add(this.toggleClass);
    const btnData = Object.keys(this.btns[index].dataset)[0];
    const btnFilter = this.btns[index].getAttribute(`data-${btnData}`);
    if (btnFilter == 'all') {
      this.init();
    } else {
      const itemsData = Object.keys(this.items[index].dataset)[0];
      const fadeItems = document.querySelectorAll(
        `.${this.item}[data-${itemsData}='${btnFilter}']`
      );
      if (this.more) {
        if (this.sp) {
          if (fadeItems.length >= this.totalInitAppear) {
            this.moreBtn.classList.add(this.toggleClass);
            for (let i = 0; i < this.totalInitAppear; i++) {
              fadeItems[i].classList.add(this.toggleClass);
            }
          } else {
            for (let i = 0; i < fadeItems.length; i++) {
              fadeItems[i].classList.add(this.toggleClass);
            }
            this.moreBtn.classList.remove(this.toggleClass);
          }
        } else {
          if (fadeItems.length >= this.initAppear) {
            this.moreBtn.classList.add(this.toggleClass);
            for (let i = 0; i < this.initAppear; i++) {
              fadeItems[i].classList.add(this.toggleClass);
            }
          } else {
            for (let i = 0; i < fadeItems.length; i++) {
              fadeItems[i].classList.add(this.toggleClass);
            }
            this.moreBtn.classList.remove(this.toggleClass);
          }
        }
      } else {
        fadeItems.forEach((fadeItem) => {
          fadeItem.classList.add(this.toggleClass);
        });
      }
    }
  }
}

new Gallery({
  toggleClass: 'is-active',
  btns: 'category-area__btn-list--item',
  items: 'category-area__detail-list--item',
  more: {
    appear: 6,
    add: 6,
    btn: 'category-area--btn',
    sp: {
      break: 768,
      appear: 3,
      add: 3,
    },
  },
});
