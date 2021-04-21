var elem = document.getElementById('my-element'),
  startTime = null,
  endPos = 500, // в пикселях
  duration = 2000; // в миллисекундах

function render(time) {
  if (time === undefined) {
    time = new Date().getTime();
  }
  if (startTime === null) {
    startTime = time;
  }

  elem.style.left = ((time - startTime) / duration * endPos % endPos) + 'px';
}

elem.onclick = function() {
  (function animationLoop(){
    render();
    requestAnimationFrame(animationLoop, elem);
  })();
};