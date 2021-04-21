'use strict';

const timer = {
  input: document.querySelector('input'),
  start: document.querySelector('#start'),
  pause: document.querySelector('#pause'),
  stop: document.querySelector('#stop'),
  started: 0,


  eventsListeners() {
    this.input.addEventListener('input', function(e) {
      this.value = this.value.replace(/[^\d]/g, '');
      timer.startValue = this.value;
    });
    this.start.addEventListener('click', this.startTimer.bind(this));
    this.pause.addEventListener('click', this.pauseTimer.bind(this));
    this.stop.addEventListener('click', this.stopTimer.bind(this));
  },

  startTimer() {
    // this.started = setInterval(this.tick.bind(this),  20);
    this.started = requestAnimationFrame(this.tick.bind(this));
    this.lockBtn(this.start);
    this.unlockBtn(this.pause);
    this.unlockBtn(this.stop);
  },

  pauseTimer() {
    const {started} = this;
    // clearInterval(started);
    cancelAnimationFrame(started);
    this.unlockBtn(this.start);
    this.lockBtn(this.pause);
  },

  stopTimer() { //arrow?
    const {started} = this;
    // clearInterval(started);
    cancelAnimationFrame(started);
    this.setTimeRemaining(this.startValue);
    this.unlockBtn(this.start);
    this.lockBtn(this.pause);
    this.lockBtn(this.stop);
  },

  tick() {
    this.started = requestAnimationFrame(this.tick.bind(this));
    console.log('tick');
    if (this.getTimeRemaining() < 0) {
      this.stopTimer();
    }
    this.setTimeRemaining( (this.getTimeRemaining() - 0.02).toFixed(2) );
  },

  getTimeRemaining() {
    return +this.input.value;
  },

  setTimeRemaining(value) {
    this.input.value = value;
  },

  lockBtn(btn) {
    btn.setAttribute('disabled', true);
  },

  unlockBtn(btn) {
    btn.removeAttribute('disabled');
  },

  initialize() {
    this.eventsListeners();
  }
};

timer.initialize();