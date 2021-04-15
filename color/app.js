'use strict';

const colorCode = document.querySelector('.color-code');
const btn = document.querySelector('.btn');
const hexadecimals = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

function getRandHexColor(array) {
  let str = '#';
  for (let i = 0; i < 6; i++) {
    const num = Math.floor(Math.random() * array.length);
    const char = array[num];
    str += char;
  }
  return str;
}

btn.addEventListener('click', function(e) {
  const color = getRandHexColor(hexadecimals);
  console.log(color);
  colorCode.innerText = color;
  document.body.style.backgroundColor = color;
});