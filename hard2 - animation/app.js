'use strict';

class DomElement {
  constructor(selector, height, width, bg, fontSize, position) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.position = position;
  }

  createElement() {
    let element;
    if (this.selector[0] === '.') {
      element = document.createElement('div');
      element.className = `${this.selector.slice(1)}`;
    }
    if (this.selector[0] === '#') {
      element = document.createElement('p');
      element.id = `${this.selector.slice(1)}`;
    }
    element.style.cssText = `
      height: ${this.height}px;
      width: ${this.width}px;
      background: ${this.bg};
      font-size: ${this.fontSize};
      position: ${this.position};
      display: flex; justify-content: center; align-items: center;
      color: red;`;
    document.body.append(element);
  }

  moveUp(amount) {
    let element = document.querySelector(`${this.selector}`);
    element.innerText = '';
    let topPosition = parseInt(getComputedStyle(element).top);
    if (element.getBoundingClientRect().y > amount) {
      element.style.top = topPosition - amount + 'px';
    } else {
      element.innerText = 'no way UP!';
    }
  }

  moveDown(amount) {
    let element = document.querySelector(`${this.selector}`);
    element.innerText = '';
    let topPosition = parseInt(getComputedStyle(element).top);
    if (element.getBoundingClientRect().bottom + amount < window.innerHeight) {
      element.style.top = topPosition + amount + 'px';
    } else {
      element.innerText = 'no way DOWN!';
    }
  }

  moveLeft(amount) {
    let element = document.querySelector(`${this.selector}`);
    element.innerText = '';
    let leftPosition = parseInt(getComputedStyle(element).left);
    if (element.getBoundingClientRect().x > amount) {
      element.style.left = leftPosition - amount + 'px';
    } else {
      element.innerText = 'no way LEFT!';
    }
  }

  moveRight(amount) {
    let element = document.querySelector(`${this.selector}`);
    element.innerText = '';
    let leftPosition = parseInt(getComputedStyle(element).left);
    if (element.getBoundingClientRect().right + amount < window.innerWidth) {
      element.style.left = leftPosition + amount + 'px';
    } else {
      element.innerText = 'no way RIGHT!';
    }
  }

}


let elem1 = new DomElement('.square', 100, 100, 'lightblue', 16, 'absolute');


window.addEventListener('DOMContentLoaded', function(e) {
  elem1.createElement();
});

window.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowUp') {
    elem1.moveUp(10);
  }
  if (e.key === 'ArrowDown') {
    elem1.moveDown(10);
  }
  if (e.key === 'ArrowLeft') {
    elem1.moveLeft(10);
  }
  if (e.key === 'ArrowRight') {
    elem1.moveRight(10);
  }
});