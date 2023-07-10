class TabSwitch {
    constructor({ tabs, contents, toggleClass }) {
      this.tabs = document.querySelectorAll(`.${tabs}`);
      this.contents = document.querySelectorAll(`.${contents}`);
      this.toggleClass = toggleClass;
      this.init();
      this.tabs.forEach((tab, i) => {
        tab.addEventListener("click", this.switch.bind(this, i));
      });
    }
    init() {
      this.tabs[0].classList.add(this.toggleClass);
      this.contents[0].classList.add(this.toggleClass);
    }
    switch(i, e) {
      e.preventDefault();
      this.contents.forEach((_, i) => {
        this.tabs[i].classList.contains(this.toggleClass) &&
          this.tabs[i].classList.remove(this.toggleClass);
        this.contents[i].classList.contains(this.toggleClass) &&
          this.contents[i].classList.remove(this.toggleClass);
      });
      this.tabs[i].classList.add(this.toggleClass);
      this.contents[i].classList.add(this.toggleClass);
    }
  }
  new TabSwitch({
    tabs: "tab-btn-list__item",
    contents: "tab-content__item",
    toggleClass: "is-active",
  });