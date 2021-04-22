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

  function animate({timing, draw, duration}) {
    let start = performance.now();
    requestAnimationFrame(function animate(time) {
      // timeFraction изменяется от 0 до 1
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) {
        timeFraction = 1;
      }
      // вычисление текущего состояния анимации
      let progress = timing(timeFraction);
      draw(progress); // отрисовать её
      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
    });
  }

  //popup
  const togglePopup = () => {
    const popup = document.querySelector('.popup'),
      popupContent = document.querySelector('.popup-content'),
      btnPopup = document.querySelectorAll('.popup-btn'),
      popupClose = document.querySelector('.popup-close'),
      popupClosePos = popupContent.offsetHeight;

    if (document.documentElement.clientWidth > 768) {
      popupContent.style.top = `-${popupClosePos}px`;
    }

    btnPopup.forEach(elem => {
      elem.addEventListener('click', () => {
        animate({
          duration: 500,
          timing(timeFraction) {
            return 1 - Math.sin(Math.acos(timeFraction));
          },
          draw(progress) {
            if (document.documentElement.clientWidth > 768) {
              popup.style.display = 'block';
              if (popupContent.offsetTop < 90) {
                popupContent.style.top = -popupContent.offsetHeight + progress * 1000 + 'px';
              }
            } else {
              popup.style.display = 'block';
            }
          }
        });
      });
    });

    popupClose.addEventListener('click', () => {
      animate({
        duration: 500,
        timing(timeFraction) {
          return timeFraction;
        },
        draw(progress) {
          if (document.documentElement.clientWidth > 768) {
            if (popupContent.offsetTop > -popupContent.offsetHeight) {
              popupContent.style.top = popupContent.offsetTop - progress * 100 + 'px';
            } else {
              popup.style.display = 'none';
            }
          } else {
            popup.style.display = 'none';
          }
        },
      });
    });
  };

  togglePopup();


  //scroll
  const scrollDown = () => {
    const scrollBtn = document.querySelector('a[href="#service-block"]'),
      menu = document.querySelector('menu'),
      menuLinks = menu.querySelectorAll('li > a');

    function scroll(e) {
      e.scrollIntoView({behavior: "smooth", block: "start"});
    }


    [...menuLinks, scrollBtn].forEach((elem) => {

      elem.addEventListener('click', function(e) {
        e.preventDefault();
        const element = this.getAttribute('href');
        const anchor = document.querySelector(`${element}`);
        scroll(anchor);

        // console.log(this.offsetTop + ' < ' + anchor.offsetTop, window.innerHeight);
        // window.scrollTo(0, anchor.offsetTop);
        // const self = this;
        // animate({
        //   duration: 500,
        //   timing(timeFraction) {
        //     return timeFraction;
        //   },
        //   draw(progress) {
        //     if (window.pageYOffset < anchor.offsetTop ) {
        //       console.log(self.offsetTop + ' < ' + anchor.offsetTop);
        //       console.log(progress);
        //       document.body.scrollTop =  anchor.offsetTop;
        //     }
        //     window.scrollTo(0, anchor.offsetTop);
        //
        //   },
        // });
      });
    });
  };

  scrollDown();
});
