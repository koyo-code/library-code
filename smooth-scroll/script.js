gsap.registerPlugin(ScrollToPlugin);

class SmoothScroll {
  constructor({ which, clickEls, move, standardPosition, header }) {
    this.clickEls = document.querySelectorAll(`.${clickEls}`);
    header && (this.header = document.querySelector(`.${header}`));
    this.move = move;
    if (which === "InpageLink") {
      this.clickEls.forEach((clickEl) => {
        if (this.header) {
          new InPageLink(clickEl, this.move, this.header);
        } else {
          new InPageLink(clickEl, this.move);
        }
      });
    }
    if (which === "ScrollTriggerInPageLink") {
      this.standardPosition = document.querySelector(`.${standardPosition}`);
      this.clickEls.forEach((clickEl, i) => {
        new ScrollTriggerInPageLink(this.standardPosition, clickEl, i, this.move);
      });
    }
    if (which === "OutPageLink") {
      if (this.header) {
        new OutPageLink(this.move, this.header);
      } else {
        new OutPageLink(this.move);
      }
    }
    if (which === "PageTopLink") {
      this.clickEls.forEach((clickEl) => {
          new PageTopLink(clickEl,this.move);
      });
    }
  }
}

class OutPageLink {
  constructor(move, header) {
    this.move = move;
    header && (this.header = header);
    this.urlHash = location.hash;
    if (this.urlHash) {
      this.hashMove();
    }
  }
  hashMove() {
    setTimeout(() => {
      gsap.to(window, { duration: 0, scrollTo: 0 });
    }, 0);
    const scrollAmount = window.scrollY;
    const target = document.getElementById(this.urlHash.replace("#", ""));
    const targetPosition = target.getBoundingClientRect().top;
    let movePosition = scrollAmount + targetPosition;
    if (this.header) {
      movePosition = movePosition - this.header.offsetHeight;
    }
    setTimeout(() => {
      gsap.to(window, { duration: this.move.duration, ease: this.move.ease, scrollTo: movePosition });
    }, 100);
  }
}

class InPageLink {
  constructor(clickEl, move, header) {
    this.clickEl = clickEl;
    this.move = move;
    header && (this.header = header);
    this.clickEl.addEventListener("click", this.toTarget.bind(this));
  }
  toTarget(event) {
    event.preventDefault();
    const scrollAmount = window.scrollY;
    const targetId = this.clickEl.getAttribute("href");
    const target = document.getElementById(targetId.replace("#", ""));
    const targetPosition = target.getBoundingClientRect().top;
    let movePosition = scrollAmount + targetPosition;
    if (this.header) {
      movePosition = movePosition - this.header.offsetHeight;
    }
    gsap.to(window, { duration: this.move.duration, ease: this.move.ease, scrollTo: movePosition });
  }
}

class ScrollTriggerInPageLink {
  constructor(standardPosition, clickEl, i, move) {
    this.standardPosition = standardPosition;
    this.clickEl = clickEl;
    this.move = move;
    this.i = i;
    this.clickEl.addEventListener("click", this.clickHandler.bind(this, this.i));
  }
  clickHandler(i) {
    gsap.to(window, { duration: this.move.duration, ease: this.move.ease, scrollTo: this.scrollInfo(i) });
  }
  scrollInfo(i) {
    const windowHeight = window.innerHeight;
    const scrollAmount = window.scrollY;
    const itemPosition = this.standardPosition.getBoundingClientRect().top + windowHeight * i;
    const targetPosition = scrollAmount + itemPosition;
    return targetPosition;
  }
}
class PageTopLink{
  constructor(clickEl,move){
    this.clickEl = clickEl;
    this.move = move
    this.clickEl.addEventListener("click",this.pageTop.bind(this))
  }
  pageTop(e){
    e.preventDefault();
    gsap.to(window, { duration: this.move.duration, ease:             this.move.ease, scrollTo: 0});
  }
}

new SmoothScroll({
  which: "InpageLink",
  clickEls: "moveToTarget",
  header: "header",
  move: {
    duration: 1,
    ease: "power2.inOut",
  },
});

new SmoothScroll({
  which: "PageTopLink",
  clickEls: "pageTop",
  move: {
    duration: 2,
    ease: "power4.inOut",
  },
});

new SmoothScroll({
  which: "OutPageLink",
  header: "header",
  move: {
    duration: 2,
    ease: "power4.inOut",
  },
});