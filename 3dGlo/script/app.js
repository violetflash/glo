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

    //SLIDER

    const slider = () => {
        const slides = document.querySelectorAll('.portfolio-item'),
            btns = document.querySelectorAll('.portfolio-btn'),
            dotsBox = document.querySelector('.portfolio-dots'),
            slider = document.querySelector('.portfolio-content');

        let interval;
        //Создаёт доты
        const createDots = (parentTarget, slidesNodeList, dotClass, dotActiveClass) => {
            slidesNodeList.forEach((elem, index) => {
                const li = document.createElement('li');
                li.classList.add(dotClass);
                if (index === 0) li.classList.add(dotActiveClass);
                parentTarget.append(li);
            });
        };

        createDots(dotsBox, slides, 'dot', 'dot-active');


        let currentSlide = 0;

        const hideElement = (elem, index, activeClass) => {
            elem[index].classList.remove(activeClass);
        };

        const showElement = (elem, index, activeClass) => {
            elem[index].classList.add(activeClass);

        };

        const dots = document.querySelectorAll('.dot');
        const autoPlay = () => {
            hideElement(slides, currentSlide, 'portfolio-item-active');
            hideElement(dots, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide === slides.length) {
                currentSlide = 0;
            }
            showElement(slides, currentSlide, 'portfolio-item-active');
            showElement(dots, currentSlide, 'dot-active');

        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlay, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', event => {
            event.preventDefault();
            let target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            hideElement(slides, currentSlide, 'portfolio-item-active');
            hideElement(dots, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
                if (currentSlide === slides.length) {
                    currentSlide = 0;
                }
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
                if (currentSlide < 0) {
                    currentSlide = slides.length - 1;
                }
            } else if (target.matches('.dot')) {
                dots.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            showElement(slides, currentSlide, 'portfolio-item-active');
            showElement(dots, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', (e) => {
            const target = e.target;
            if (target.matches('.portfolio-btn') || target.matches('.dot')) {
                stopSlide();
            }
        });
        slider.addEventListener('mouseout', (e) => {
            if (e.target.matches('.portfolio-btn') || e.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(1500);
    };



    slider();

    //OUR TEAM HOVER
    const commandImagesHandler = () => {
        const commandSection = document.getElementById('command');

        const getDatasetValue = (target, name) => target.dataset[name];
        const setDatasetValue = (target, name, value) => {
            target.dataset[name] = value;
        };
        const switchSrcToDataAttr = (target, name) => {
            const dataAttr = getDatasetValue(target, name);
            setDatasetValue(target, name, target.src);
            target.src = dataAttr;
        };

        const changeImageSrc = e => {
            let target = e.target;
            if (!target.classList.contains('command__photo')) {
                return;
            }
            target = target.closest('.command__photo');
            target.classList.add('js-faded');
            setTimeout(switchSrcToDataAttr.bind(null, target, 'img'), 250);
            setTimeout(() => {
                target.classList.remove('js-faded');
            }, 250);
        };

        commandSection.addEventListener('mouseover', changeImageSrc);
        commandSection.addEventListener('mouseout', changeImageSrc);
    };

    commandImagesHandler();


    //ВАЛИДАЦИЯ

    const digitsValidator = function() {
        this.value = this.value.replace(/[^\d]/g, '');
    };

    const textValidator = function() {
        this.value = this.value.replace(/[^а-яА-Я -]/g, '');
    };

    const emailValidator = function() {
        this.value = this.value.replace(/[^A-Za-z@_.!~*'-]/g, '');
    };

    const phoneValidator = function() {
        this.value = this.value.replace(/[^\d()-]/g, '');
    };


    //Calculator validator
    const validateCalc = () => {
        const calc = document.getElementById('calc');

        const calcValidator = e => {
            const target = e.target;

            if (target.tagName !== 'INPUT' && !target.classList.contains('calc-item')) {
                return;
            }

            target.addEventListener('input', digitsValidator);
        };

        calc.addEventListener('click', calcValidator);
    };

    validateCalc();

    //CONNECT SECTION VALIDATION
    const connectValidation = () => {
        const connect = document.getElementById('connect');

        /*
        Должны удаляться все символы, кроме допустимых
        Несколько идущих подряд пробелов или дефисов должны заменяться на один.
        Пробелы и дефисы в начале и конце значения должны удаляться.
        Для поля "Ваше имя" Первая буква каждого слова должна приводиться к
        верхнему регистру, а все остальные — к нижнему.
         */

        const checkWholeValidation = function() {
            this.value = this.value.replace(/-+/g, '-').replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, '');

            if (this.value.length === 1) {
                this.value = '';
            }

            if (this.name === 'user_name' && this.value) {
                let name = this.value;
                name = name.replace(/./g, letter => letter.toLowerCase())
                    .replace(/^[а-я]|\s[а-я]/g, letter => letter.toUpperCase());
                this.value = name;
            }

            // if (this.value) {
            //     this.value = this.value[0].toLowerCase() + this.value.slice(1);
            // }
        };

        const connectValidator = e => {
            const target = e.target;

            if (target.tagName !== 'INPUT' && !target.classList.contains('top-form')) {
                return;
            }

            if (target.name === 'user_name' || target.name === 'user_message') {
                target.addEventListener('input', textValidator);
            }

            if (target.name === 'user_email') {
                target.addEventListener('input', emailValidator);
            }

            if (target.name === 'user_phone') {
                target.addEventListener('input', phoneValidator);
            }

            target.addEventListener('blur', checkWholeValidation);

        };

        connect.addEventListener('click', connectValidator);
    };

    connectValidation();
});
