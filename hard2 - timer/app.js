'use strict';

const input = document.querySelector('#duration');
const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');
const circle = document.querySelector('#circle');
const perimeter = circle.getAttribute('r') * Math.PI * 2;
circle.setAttribute('stroke-dasharray', perimeter);


class Timer {
  constructor(input, startBtn, stopBtn, callbacks) {
    this.input = input;
    this.startBtn = startBtn;
    this.stopBtn = stopBtn;
    this.savedTime = parseFloat(this.input.value); //default initial value of input (if no interaction did)
    if (callbacks) {
      this.onComplete = callbacks.onComplete;
      this.onTick = callbacks.onTick;
      this.onStart = callbacks.onStart;
    }

    this.startBtn.addEventListener('click', this.start);
    this.stopBtn.addEventListener('click', this.stop);
    this.input.addEventListener('keyup', this.saveTime);
  }

  saveTime = () => { // saves the initial value of timer to restore it when finished
    this.savedTime = parseFloat(this.input.value);
  }

  start = () => {
    if ( this.onStart ) this.onStart(this.timeRemaining, this.savedTime);
    this.tick(); // first tick before the setInterval starts
    this.started = setInterval(this.tick, 20);
    this.lockBtn(this.startBtn);
    this.unlockBtn(this.stopBtn);
  };

  tick = () => {
    if (this.timeRemaining <= 0 || isNaN(this.timeRemaining)) {
      this.stop();
      if (this.onComplete) {
        this.onComplete(this.input, this.savedTime);
      }// resets timer
      this.lockBtn(this.stopBtn);
    } else {
      this.timeRemaining = this.timeRemaining - 0.02;
      if (this.onTick) this.onTick(this.timeRemaining, this.savedTime);
    }
  };

  stop = () => {
    console.log('stopped');
    clearInterval(this.started);
    this.unlockBtn(this.startBtn);
    this.lockBtn(this.stopBtn);

  };

  get timeRemaining() {
    return parseFloat(this.input.value);
  }

  set timeRemaining(time) {
    this.input.value = time.toFixed(2);
  }

  lockBtn(btn) {
    btn.setAttribute('disabled', true);
  }

  unlockBtn(btn) {
    btn.removeAttribute('disabled');
  }
}

const timer = new Timer(input, startBtn, stopBtn, {

  onStart() {  // start / resume animation

  },

  onComplete(input, savedTime) {
    console.log("That's all folks!")
    setTimeout(() => {   // restores the default value of timer when finished
      input.value = savedTime;
      circle.setAttribute('stroke-dashoffset', '0');

    }, 1000)
  },

  onTick(timeRemaining, savedTime) {

    circle.setAttribute('stroke-dashoffset',
      `${perimeter * timeRemaining / savedTime - perimeter}`
    );
  }
});
