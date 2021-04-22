window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  //Timer
  let timerInterval;

  function countTimer(deadline) {
    const timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds');


    function getTimeRemaining() {
      const dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = timeRemaining > 0 ? Math.floor(timeRemaining % 60) : 0,
        minutes = timeRemaining > 0 ? Math.floor(timeRemaining / 60 % 60) : 0,
        hours = timeRemaining > 0 ? Math.floor(timeRemaining / 3600 % 24) : 0;
      return { timeRemaining, hours, minutes, seconds };
    }

    function checkZero(num) {
      return num < 10 ? '0' + num : num;
    }

    function updateClock() {
      const timer = getTimeRemaining();


      timerHours.textContent = checkZero(timer.hours);
      timerMinutes.textContent = checkZero(timer.minutes);
      timerSeconds.textContent = checkZero(timer.seconds);

      if (timer.timeRemaining < 0) {
        clearInterval(timerInterval);
      }
    }

    updateClock();
    timerInterval = setInterval(updateClock, 1000);
  }

  countTimer('12 may 2021 00:10');

  //меню
  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
      menu = document.querySelector('menu'),
      closeBtn = document.querySelector('.close-btn'),
      menuItems = menu.querySelectorAll('ul>li');

    const menuHandler = () => {
      menu.classList.toggle('active-menu');
    };

    btnMenu.addEventListener('click', menuHandler);
    closeBtn.addEventListener('click', menuHandler);
    menuItems.forEach(elem => elem.addEventListener('click', menuHandler));

  };

  toggleMenu();

  //popup
  const togglePopup = () => {
    const popup = document.querySelector('.popup'),
      popupContent = document.querySelector('.popup-content'),
      btnPopup = document.querySelectorAll('.popup-btn'),
      popupClose = document.querySelector('.popup-close');

    let count = 0;
    let popupInterval;

    if (document.documentElement.clientWidth > 768) {
      popupContent.style.top = `-${popupContent.offsetHeight}px`;
    }

    const popupArrival = () => {
      count++;
      popupInterval = requestAnimationFrame(popupArrival);
      popup.style.display = 'block';
      if (popupContent.offsetTop < 90) {
        popupContent.style.top = -popupContent.offsetHeight + count * 20  + 'px';
      } else {
        cancelAnimationFrame(popupInterval);
      }
    };







    const popupDeparture = () => {
      // let start = performance.now();
      popupInterval = requestAnimationFrame(popupDeparture);
      console.log(popupContent.offsetTop);
      console.log(-popupContent.offsetHeight);
      console.log(popupInterval);
      if (popupContent.offsetTop > -popupContent.offsetHeight) {
        popupContent.style.top = popupContent.offsetTop - 30  + 'px';
      } else {
        cancelAnimationFrame(popupInterval);
        popup.style.display = 'none';

      }
    };

    btnPopup.forEach(elem => {
      elem.addEventListener('click', popupArrival);
    });

    popupClose.addEventListener('click', popupDeparture);

  };

  togglePopup();
});
