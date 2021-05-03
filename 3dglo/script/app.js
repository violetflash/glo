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
            const target = event.target;

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
            const src = target.src.replace(/.+Glo\//g, '');
            setDatasetValue(target, name, src);
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
            console.dir(target);
        };

        commandSection.addEventListener('mouseover', changeImageSrc);
        commandSection.addEventListener('mouseout', changeImageSrc);
    };

    commandImagesHandler();


    //ВАЛИДАЦИЯ

    const digitsValidator = function() {
        this.value = this.value.replace(/[^\d]/g, '');
    };

    //Calculator validator
    const validateCalc = () => {
        const calc = document.getElementById('calc');

        const calcValidator = e => {
            const target = e.target;
            if (target.tagName !== 'INPUT' && !target.classList.contains('calc-item') || target.tagName === 'SELECT') {
                return;
            }

            target.addEventListener('input', digitsValidator);
        };

        calc.addEventListener('click', calcValidator);
    };

    validateCalc();

    //CONNECT SECTION VALIDATION

    const nameValidator = function() {
        this.value = this.value.replace(/[^а-яА-Я ]/g, '');
    };

    const messageValidator = function() {
        this.value = this.value.replace(/[^а-яА-Я\d .,:()?!_-]/g, '');
    };

    const emailValidator = function() {
        this.value = this.value.replace(/[^A-Za-z@_.!~*'-]/g, '');
    };

    const phoneValidator = function() {
        this.value = this.value.replace(/[^\d+]/g, '');
    };


    const validation = () => {
        const connect = document.getElementById('connect'),
            mainForm = document.querySelector('.main-form'),
            popup = document.querySelector('.popup');


        /*
        Должны удаляться все символы, кроме допустимых
        Несколько идущих подряд пробелов или дефисов должны заменяться на один.
        Пробелы и дефисы в начале и конце значения должны удаляться.
        Для поля "Ваше имя" Первая буква каждого слова должна приводиться к
        верхнему регистру, а все остальные — к нижнему.
         */
        //TODO БАГ - с имейлом
        const checkWholeValidation = function() {
            // let trimmedValue = this.value;
            // this.value = '';
            // this.value = trimmedValue;

            this.value = this.value.replace(/\s+/g, ' ')
                .replace(/-+/g, '-')
                .replace(/^[\s|-]+|[\s|-]+$/g, '');

            if (this.value.length === 1) {
                this.value = '';
            }


            if (this.name === 'user_name' && this.value) {
                let name = this.value;
                name = name.replace(/./g, letter => letter.toLowerCase())
                    .replace(/^[а-я]|[\s|-][а-я]/g, letter => letter.toUpperCase());
                this.value = name;
            }
        };

        const fieldValidator = e => {
            const target = e.target;

            if (target.tagName !== 'INPUT' && !target.classList.contains('top-form')) {
                return;
            }

            if (target.name === 'user_name') {
                target.addEventListener('input', nameValidator);
            }

            if (target.name === 'user_message') {
                target.addEventListener('input', messageValidator);
            }

            if (target.name === 'user_email') {
                target.type = 'text';
                target.addEventListener('input', emailValidator);
            }

            if (target.name === 'user_phone') {
                target.addEventListener('input', phoneValidator);
            }

            target.addEventListener('blur', checkWholeValidation);
        };

        mainForm.addEventListener('click', fieldValidator);
        connect.addEventListener('click', fieldValidator);
        popup.addEventListener('click', fieldValidator);
    };

    validation();

    // calculator

    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcCount = document.querySelector('.calc-count'),
            calcDay = document.querySelector('.calc-day'),
            totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1,
                value = 0,
                startInterval;

            const typeValue = calcType.value,
                squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = Math.trunc(price * typeValue * squareValue * countValue * dayValue);
                total = Math.ceil(total / 10) * 10;
                // value = total;
            }

            function animateValue(obj, start, end, duration) {
                let startTimestamp = null;
                const step = (timestamp) => {
                    if (!startTimestamp) {
                        startTimestamp = timestamp;
                    }
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                    obj.innerHTML = Math.floor(progress * (end - start) + start);
                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    } else {
                        value = total;
                    }
                };
                window.requestAnimationFrame(step);
            }

            animateValue(totalValue, value, total, 100);


        };

        calcBlock.addEventListener('change', e => {
            const target = e.target;

            if (target.matches('select') || target.matches('input')) {
                countSum();
            }
        });
    };

    calc(100);


    //send-ajax-form

    const createLoadingAnimation = () => {
        const styleSheet = document.createElement("style");
        styleSheet.innerText = `
            .loading {
                flex: 1 1 25%;  
            }
            .sk-wandering-cubes {
                width: 4em;
                height: 4em;
                position: relative;
                margin: auto;
            }
            .sk-wandering-cubes .sk-cube {
                background-color: #19b5fe;
                width: 1.5em;
                height: 1.5em;
                position: absolute;
                top: 0;
                left: 0;
                animation: sk-wandering-cubes 1.8s ease-in-out -1.8s infinite both;
            }
            .sk-wandering-cubes .sk-cube-2 {
                animation-delay: -0.9s;
            }
            @keyframes sk-wandering-cubes {
                0% {
                    transform: rotate(0deg);
                }
                25% {
                    transform: translateX(2em) rotate(-90deg) scale(0.5);
                }
                50% {
                    /* Hack to make FF rotate in the right direction */
                    transform: translateX(2em) translateY(2em) rotate(-179deg);
                }
                50.1% {
                    transform: translateX(2em) translateY(2em) rotate(-180deg);
                }
                75% {
                    transform: translateX(0) translateY(2em) rotate(-270deg) scale(0.5);
                }
                100% {
                    transform: rotate(-360deg);
                }
            }
        `;
        document.head.appendChild(styleSheet);

        return `
            <section class="loading">
                <div class="sk-wandering-cubes">
                    <div class="sk-cube sk-cube-1"></div> 
                    <div class="sk-cube sk-cube-2"></div>
                </div>
            </section>
        `;
    };

    const sendForm = () => {
        const errorMessage = 'Что-то пошло не так...',
            successMessage = 'Спасибо! Мы скоро с вами свяжемся!',
            loadMessage = createLoadingAnimation();


        const forms = document.querySelectorAll('form');
        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 2rem; color: #19b5fe;';

        forms.forEach((form) => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                form.append(statusMessage);

                statusMessage.innerHTML = loadMessage;

                const formData = new FormData(form);
                let body = {};
                // for (const val of formData.entries()) {
                //     body[val[0]] = val[1];
                // }
                formData.forEach((val, key) => {
                    body[key] = val;
                });
                postData(form, body,
                    () => {
                        statusMessage.textContent = successMessage;},
                    (error) => {
                        console.error(error);
                        statusMessage.textContent = errorMessage;
                    });
            });
        });


        const postData = (form, obj, successData, errorData) => {
            const request = new XMLHttpRequest();
            request.addEventListener('readystatechange', () => {

                if (request.readyState !== 4) return;
                if (request.status === 200) {
                    successData();
                    clearForm(form);
                } else {
                    errorData(request.status);
                }
            });
            request.open('POST', './server.php');
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify(obj));
        };

        const clearForm = (form) => {
            const inputs = form.querySelectorAll('input');
            inputs.forEach((element) => {
                if (element.type.toLowerCase() === 'button') return;
                element.value = '';
            });

        };
    };

    sendForm();



});
