'use strict';

class Carousel {
    constructor(
        {
            main,
            wrapper,
            next,
            prev,
            infinite = false,
            slidesToShow = 2,
            position = 0,
            responsive = [],
        }) {
        this.main = document.querySelector(main);
        this.wrapper = document.querySelector(wrapper);
        this.slides = document.querySelector(wrapper).children;
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.slidesToShow = slidesToShow;
        this.infinite = infinite;
        this.options = {
            position,
            maxPosition: this.slides.length - this.slidesToShow,
            slideWidth: Math.floor(100 / this.slidesToShow),
        };
        this.responsive = responsive;
    }

    addSliderClasses() {
        this.main.classList.add('max-slider');
        this.wrapper.classList.add('max-slider__wrapper');
        for (const elem of this.slides) {
            elem.classList.add('max-slider__item');
        }
    }

    addStyle() {
        let style = document.getElementById('max-slider__styles');
        if (!style) {
            style = document.createElement('style');
            style.id = 'max-slider__styles';
        }

        style.textContent = `
            .max-slider {
                overflow: hidden !important;
            }
            .max-slider__wrapper {
                display: flex !important;
                transition: transform 0.5s !important;
                will-change: transform !important;
            }
            .max-slider__item {
                display: flex !important;
                align-items: center;
                justify-content: center;
                flex: 0 0 ${this.options.slideWidth}% !important;
                margin: auto 0 !important;
            }
        `;
        document.head.appendChild(style);
    }

    addSliderArrows() {
        this.main.insertAdjacentHTML('beforeend', `
            <button id="max-slider__prev-arrow"></button>
            <button id="max-slider__next-arrow"></button>
        `);
        const style = document.createElement('style');
        style.textContent = `
            #max-slider__prev-arrow,
            #max-slider__next-arrow {
                margin: 0 10px;
                border: 20px solid transparent;
                background: transparent;
                outline: transparent;
            }
            #max-slider__next-arrow {
                border-left-color: #19b5fe;
            }
            #max-slider__prev-arrow {
                border-right-color: #19b5fe;
                
            }      
        `;
        document.head.appendChild(style);
    }

    nextSlider() {
        if  (this.infinite || this.options.maxPosition > Math.abs(this.options.position)) {
            if (Math.abs(this.options.position) === this.options.maxPosition) {
                this.options.position = 1;
            }
            --this.options.position;
            this.wrapper.style.transform = `translateX(${this.options.position * this.options.slideWidth}%)`;
        }
    }

    prevSlider() {
        if (this.infinite || this.options.position) {
            if (this.options.position === 0) {
                this.options.position = -this.options.maxPosition - 1;
            }
            ++this.options.position;

            this.wrapper.style.transform = `translateX(${this.options.position * this.options.slideWidth}%)`;
        }
    }

    controlSlider() {
        this.prev.addEventListener('click', this.prevSlider.bind(this));
        this.next.addEventListener('click', this.nextSlider.bind(this));
    }

    initResponsive() {
        const slidesToShowDefault = this.slidesToShow;
        const breakpoints = this.responsive.map(item => item.breakpoint);
        const maxBreakpoint = Math.max(...breakpoints);

        const checkScreenWidth = () => {
            const windowWidth = document.documentElement.clientWidth;
            if (windowWidth < maxBreakpoint) {
                for (let i = 0; i < breakpoints.length; i++) {
                    if (windowWidth < breakpoints[i]) {
                        this.slidesToShow = this.responsive[i].slidesToShow;
                        //обновление ширины слайда
                        this.options.slideWidth = Math.floor(100 / this.slidesToShow);
                        this.addStyle();
                    }

                }
            } else {
                this.slidesToShow = slidesToShowDefault;
                //обновление ширины слайда
                this.options.slideWidth = Math.floor(100 / this.slidesToShow);
                this.addStyle();
            }
        };

        checkScreenWidth();

        window.addEventListener('resize', checkScreenWidth);
    }

    init() {
        this.addSliderClasses();
        this.addStyle();

        if (!this.prev && !this.next) {
            this.addSliderArrows();
            this.next = document.getElementById('max-slider__next-arrow');
            this.prev = document.getElementById('max-slider__prev-arrow');
        }

        this.controlSlider();

        if (this.responsive) {
            this.initResponsive();
        }
    }
}


export default Carousel;
