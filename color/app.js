'use strict';

const colorCode = document.querySelector('.color-code');
const btn = document.querySelector('.btn');

function getRandRgbColor() {
  return Math.floor(Math.random() * 256);
}

btn.addEventListener('click', function(e) {
  let color1 = getRandRgbColor().toString(16);
  let color2 = getRandRgbColor().toString(16);
  let color3 = getRandRgbColor().toString(16);
  let hexColor = `#${color1}${color2}${color3}`;

  colorCode.innerText = hexColor;
  document.body.style.backgroundColor = hexColor;
});