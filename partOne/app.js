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
  element.style.cssText = `
    height: ${this.height}px;
    width: ${this.width}px;
    background: ${this.bg};
    font-size: ${this.fontSize};
  `;

  element.addEventListener('click', function(e) {
    if (!document.querySelector('.input')) {
      let input = document.createElement('input');
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          element.innerText = input.value;
        }
      });
      input.className = 'input';
      element.after(input);
    } else {
      document.querySelector('.input').remove();
    }
  });


  document.body.append(element);

};

DomElement.prototype.text = function() {

};


let elem1 = new DomElement('.square', 200, 200, 'lightblue', 16);
elem1.createElement();

