'use strict';

let DomElement = function(selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
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
  element.innerText = 'CLICK to update this text';
  element.style.cssText = `
    height: ${this.height}px;
    width: ${this.width}px;
    background: ${this.bg};
    font-size: ${this.fontSize};
  `;
  document.body.append(element);
};

DomElement.prototype.eventListeners = function() {
  let element = document.querySelector(`${this.selector}`);
  element.addEventListener('click', function(e) {
    if (!document.querySelector('.input')) {
      let input = document.createElement('input');
      input.placeholder = "press 'Enter' to save";
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          element.innerText = input.value;
          input.value = '';
        }
      });
      input.className = 'input';
      element.after(input);
      input.focus();
    } else {
      document.querySelector('.input').remove();
    }
  });
};

let elem1 = new DomElement('.square', 200, 200, 'lightblue', 16);
elem1.createElement();
elem1.eventListeners();


