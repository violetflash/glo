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


//Timer
countTimer('12 may 2021 00:10');
//меню
toggleMenu();
//popup
togglePopup();
//scroll
scrollDown();
//TABS
tabs();
//SLIDER
slider();
//OUR TEAM HOVER
commandImagesHandler();
//ВАЛИДАЦИЯ
//Calculator validator
validateCalc();
//FORMS VALIDATION
validation();
// calculator
calc(100);
//send-ajax-form
//remove required attr from inputs
removeRequiredAttr();
sendForm();