'use strict';

let DomElement = function(selector, height, width, bg, fontSize, position) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
  this.position = position;

};

DomElement.prototype.createElement = function() {
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
  `;
  document.body.append(element);
};

DomElement.prototype.moveUp = function(amount) {
  let element = document.querySelector(`${this.selector}`);
  let topPosition = parseInt(getComputedStyle(element).top);
  if (element.getBoundingClientRect().y > amount) {
    element.style.top = topPosition - amount + 'px';
  } else {
    console.log('There is no way UP!');
  }
};

DomElement.prototype.moveDown = function(amount) {
  let element = document.querySelector(`${this.selector}`);
  let topPosition = parseInt(getComputedStyle(element).top);
  if (element.getBoundingClientRect().bottom + amount < window.innerHeight) {
    element.style.top = topPosition + amount + 'px';
  } else {
    console.log('There is no way DOWN!');
  }

};

DomElement.prototype.moveLeft = function(amount) {
  let element = document.querySelector(`${this.selector}`);
  let leftPosition = parseInt(getComputedStyle(element).left);
  if (element.getBoundingClientRect().x > amount) {
    element.style.left = leftPosition - amount + 'px';
  } else {
    console.log('There is no way LEFT!');
  }

};

DomElement.prototype.moveRight = function(amount) {
  let element = document.querySelector(`${this.selector}`);
  let leftPosition = parseInt(getComputedStyle(element).left);
  if (element.getBoundingClientRect().right + amount < window.innerWidth) {
    element.style.left = leftPosition + amount + 'px';
  } else {
    console.log('There is no way DOWN!');
  }
};


let elem1 = new DomElement('.square', 100, 100, 'lightblue', 16, 'absolute');


window.addEventListener('DOMContentLoaded', function(e) {
  elem1.createElement();
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
});