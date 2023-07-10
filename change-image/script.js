class ChangeImage {
  constructor(obj) {
    this.i = 1;
    this.toggleClass = obj.toggleClass;
    this.kvImgList = document.querySelectorAll(`.${obj.targets}`);
    setInterval(this.changeImg.bind(this), obj.time);
  }
  changeImg() {
    switch (this.i) {
      case this.i:
        this.kvImgList[this.i].classList.add(this.toggleClass);
        if (this.i === 0) {
          this.kvImgList[this.kvImgList.length - 1].classList.remove(this.toggleClass);
          break;
        }
        this.kvImgList[this.i - 1].classList.remove(this.toggleClass);
        break;
    }
    this.i += 1;
    if (this.i === this.kvImgList.length) {
      this.i = 0;
    }
  }
}

new ChangeImage({
  targets: 'slide__img',
  toggleClass: 'fade-in-image',
  time: 6000
});