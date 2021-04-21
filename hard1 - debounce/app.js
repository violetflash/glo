'use strict';

const debounce = (func, delay=1000) => {
  let timeoutId;

  return (...args) => {
    if ( timeoutId ) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const input = document.querySelector('input');
const p = document.querySelector('p');

const inInput = function(e){
  p.innerText = e.target.value;
};

input.addEventListener('input', debounce(inInput, 300));