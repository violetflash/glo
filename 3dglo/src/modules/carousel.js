'use strict';

class Carousel {
    constructor({ main, wrapper, next, prev, infinite = false, slidesToShow = 2, position = 0 }) {
        this.main = document.querySelector(main);
        this.wrapper = document.querySelector(wrapper);
        this.slides = document.querySelector(wrapper).children;
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.slidesToShow = slidesToShow;
        this.infinite = infinite;
        this.options = {
            position,
            slideWidth: Math.floor(100 / this.slidesToShow),
        };
    }

    addSliderClasses() {
        this.main.classList.add('max-slider');
        this.wrapper.classList.add('max-slider__wrapper');
        for (const elem of this.slides) {
            elem.classList.add('max-slider__item');
        }
    }

    addStyle() {
        const style = document.createElement('style');
        style.id = 'max-slider__styles';
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
                flex: 0 0 ${this.options.slideWidth}% !important;
                margin: auto 0 !important;
            }
        `;
        document.head.appendChild(style);
    }

    addSliderArrows() {
        this.main.insertAdjacentHTML('beforeend', `
            <button id="max-slider__prev-arrow"> < </button>
            <button id="max-slider__next-arrow"> > </button>
        `);
    }

    nextSlider() {
        if  (this.infinite || this.slides.length - this.slidesToShow > Math.abs(this.options.position)) {
            if (Math.abs(this.options.position) === this.slides.length - this.slidesToShow) {
                this.options.position = 1;
            }
            --this.options.position;
            this.wrapper.style.transform = `translateX(${this.options.position * this.options.slideWidth}%)`;
        }
    }

    prevSlider() {
        if (this.infinite || this.options.position) {
            if (this.options.position === 0) {
                this.options.position = -(this.slides.length +1 - this.slidesToShow);
            }
            ++this.options.position;

            this.wrapper.style.transform = `translateX(${this.options.position * this.options.slideWidth}%)`;
        }
    }

    controlSlider() {
        this.prev.addEventListener('click', this.prevSlider.bind(this));
        this.next.addEventListener('click', this.nextSlider.bind(this));
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
    }
}


export default Carousel;
