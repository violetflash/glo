'use strict';

const input = document.querySelector('input');
const start = document.querySelector('#start');
const pause = document.querySelector('#pause');
const stop = document.querySelector('#stop');
let startedState = 0;
let startValue = 0;

input.addEventListener('input', function(e) {
  this.value = this.value.replace(/[^\d]/g, '');
});

const tick = function(value, amount) {
  return value - amount;
};

const checkButtonState = function(button) {
  if (startedState) {
    button.disabled = false;
  }
};

const getInputValue = function() {
  return +input.value;
};

const setInputValue = function(value) {
  input.value = value;
};

const timer = function() {
  const value = getInputValue();
  setInputValue(tick(value, 0.02).toFixed(2));
};

const startTimer = function() {
  startValue = getInputValue();
  startedState = setInterval(timer, 20);
  checkButtonState(pause);
};

const pauseTimer = function() {
  if (startedState) {
    clearInterval(startedState);
    checkButtonState(stop);
  }
};

const stopTimer = function() {
  if (startedState) {
    clearInterval(startedState);
    setInputValue(startValue);
  }
};



start.addEventListener('click', startTimer);
pause.addEventListener('click', pauseTimer);
stop.addEventListener('click', stopTimer);

