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
        const menu = document.querySelector('menu');

        const menuHandler = () => {
            menu.classList.toggle('active-menu');
        };

        document.addEventListener('click', (e) => {
            let target = e.target;
            if (target.closest('.menu')) {
                menuHandler();
            } else {
                //исключаем само меню и li внутри него
                if (target.closest('menu') && target.hasAttribute('href') && target !== menu) {
                    menuHandler();
                }
                target = target.closest('menu');
                //если клик не по меню
                if (!target) {
                    menu.classList.remove('active-menu');
                }
            }
        });

    };

    toggleMenu();

    function animate({ timing, draw, duration }) {
        const start = performance.now();
        requestAnimationFrame(function animate(time) {
            // timeFraction изменяется от 0 до 1
            let timeFraction = (time - start) / duration;
            if (timeFraction > 1) {
                timeFraction = 1;
            }
            // вычисление текущего состояния анимации
            const progress = timing(timeFraction);
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
            btnPopup = document.querySelectorAll('.popup-btn');

        if (document.documentElement.clientWidth > 768) {
            popupContent.style.top = `-${popupContent.offsetHeight}px`;
        }

        const popupArrival = () => {
            animate({
                duration: 500,
                timing(timeFraction) {
                    return 1 - Math.sin(Math.acos(timeFraction));
                },
                draw(progress) {
                    popup.style.display = 'block';
                    if (document.documentElement.clientWidth > 768) {
                        if (popupContent.offsetTop < 90) {
                            popupContent.style.top = -popupContent.offsetHeight + progress * 1000 + 'px';
                        }
                    }
                }
            });
        };

        const popupDeparture = () => {
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
        };

        btnPopup.forEach(elem => elem.addEventListener('click', popupArrival));

        popup.addEventListener('click', (e) => {
            let target = e.target;
            if (target.classList.contains('popup-close')) {
                popupDeparture();
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    popupDeparture();
                }
            }
        });
    };

    togglePopup();


    //scroll
    const scrollDown = () => {
        const scrollBtn = document.querySelector('a[href="#service-block"]'),
            menu = document.querySelector('menu'),
            menuLinks = menu.querySelectorAll('li > a');

        function scroll(e) {
            e.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        [...menuLinks, scrollBtn].forEach((elem) => {

            elem.addEventListener('click', function(e) {
                e.preventDefault();
                const element = this.getAttribute('href');
                const anchor = document.querySelector(`${element}`);
                scroll(anchor);
                //TODO реализовать скролл через requestAnimationFrame

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

    //TABS
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tabs = document.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = index => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tabs[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tabs[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', e => {
            let target = e.target;
            target = target.closest('.service-header-tab');
            if (target) {
                tabs.forEach((item, index) => {
                    if (target === item) {
                        toggleTabContent(index);
                    }
                });
            }
        });
    };

    tabs();
});
