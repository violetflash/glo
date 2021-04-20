'use strict';

const calculator = {
  a: document.querySelector('#a'),
  b: document.querySelector('#b'),
  sumBtn: document.querySelector('#sum'),
  multBtn: document.querySelector('#mult'),
  res: document.querySelector('#res'),

  sum: function(){
    const {a, b} = this;
    this.show(Number(a.value) + Number(b.value));
  },
  mult: function(){
    const {a, b} = this;
    this.show(a.value * b.value);
  },
  show: function(result){
    this.res.value = result;
  },

  initialize() {
    [this.a, this.b].forEach((input) => {
      input.addEventListener('input', () => {
        input.value = input.value.replace(/[^\d]/g, '');
      });
    });
    this.sumBtn.addEventListener('click', this.sum.bind(this));
    this.multBtn.addEventListener('click', this.mult.bind(this));
  }
};

calculator.initialize();