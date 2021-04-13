'use strict';

const bookRoot = document.querySelector('.books');
const books = document.querySelectorAll('.book');
const ul2 = books[0].querySelector('ul');
const chapters2 = ul2.querySelectorAll('li');
const ul5 = books[5].querySelector('ul');
const chapters5 = ul5.querySelectorAll('li');
const junk = document.querySelectorAll('.adv');
const ul6 = books[2].querySelector('ul');
const chapters6 = ul6.querySelectorAll('li');




//Восстановить порядок книг.
bookRoot.prepend(books[1], books[0], books[4], books[3], books[5], books[2]);

//Заменить картинку заднего фона на другую из папки image
document.body.style.backgroundImage = 'url("image/you-dont-know-js.jpg")';

//Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")
books[4].querySelector('a').innerText = 'Книга 3. this и Прототипы Объектов';

//Удалить рекламу со страницы
junk.forEach((elem) => elem.remove());

//Восстановить порядок глав во второй и пятой книге
ul2.prepend(chapters2[0], chapters2[1], chapters2[3], chapters2[6], chapters2[8], chapters2[4], chapters2[5],
  chapters2[7], chapters2[9], chapters2[2], chapters2[10]);
ul5.prepend(chapters5[0], chapters5[1], chapters5[9], chapters5[3], chapters5[4], chapters5[2], chapters5[6],
  chapters5[7], chapters5[5], chapters5[8], chapters5[10]);

//в шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место
const book6Chapter8 = document.createElement('li');
book6Chapter8.innerText = 'Глава 8: За пределами ES6';
chapters6[chapters6.length - 1].before(book6Chapter8);