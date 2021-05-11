'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import scrollDown from './modules/scrollDown';
import tabs from './modules/tabs';
import slider from './modules/slider';
import commandImagesHandler from './modules/commandImagesHandler';
import validateCalc from './modules/validateCalc';
import validation from './modules/validation';
import calc from './modules/calc';
import removeRequiredAttr from './modules/removeRequiredAttr';
import sendForm from './modules/sendForm';
import Carousel from './modules/carousel';

countTimer('12 may 2021 00:10');
toggleMenu();
togglePopup();
scrollDown();
tabs();
slider();
commandImagesHandler();
validateCalc();
validation();
calc(100);
removeRequiredAttr();
sendForm();

const sliderCarousel = new Carousel({
    main: '.companies-wrapper',
    wrapper: '.companies-hor',
    slidesToShow: 4,
    infinite: true,

    responsive: [
        {
            breakpoint: 1024,
            slidesToShow: 3
        },
        {
            breakpoint: 768,
            slidesToShow: 2
        },
        {
            breakpoint: 576,
            slidesToShow: 2
        }
    ],
});
sliderCarousel.init();
