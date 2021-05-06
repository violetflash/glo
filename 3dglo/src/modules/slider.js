import animate from "./animate";

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

export default slider;
