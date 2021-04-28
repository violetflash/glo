/*
Попрактикуйтесь на кроссвордах https://regexcrossword.com/
и на задачках https://habr.com/ru/post/167015/
 */

'use strict';
// 1.Написать скрипт, которые заменяет слово "функция" и его однокоренные слова в div с id=task1
// на «<strong>функция</strong>».
const script1 = () => {
    const task1 = document.getElementById('task1');
    task1.innerHTML = task1.innerHTML.replace(/функци[а-я]*/g, (match) => `<strong>${match}</strong>`);
};

script1();

//2. Написать скрипт который в div с id=task2 найдет время. Время имеет формат часы:минуты. И часы, и минуты состоят
// из двух цифр, пример: 09:00. заключить найденное время в тег <b></b>
const script2 = () => {
    const task2 = document.getElementById('task2');
    task2.innerHTML = task2.innerHTML.replace(/\d{2}:\d{2}/g, (match) => `<b>${match}</b>`);
};

script2();

// 3. Создать запрос во всем документе найти текст в кавычках и заключить его в теги <mark></mark>
const script3 = () => { //TODO убрать пробел перед открывающимися кавычками
    document.body.innerHTML = document.body.innerHTML.replace(/\s['"«].*?['"»]/g, (match) => `<mark>${match}</mark>`);
};

script3();

// 4. Замените в документе домены вида http://site.ru на <a href="http://site.ru">site.ru</a>,
const script4 = () => {
    const regexp = /https?:\/\/?(www.)?([a-zA-Z0-9-]+\.[a-zA-Z0-9-]+)([.?a-zA-Z0-9-\/]+)/g;
    document.body.innerHTML = document.body.innerHTML.
    replace(regexp, (match) => {
        const matches = [...match.matchAll(regexp)];
        return `<a href="${match}">${matches[0][2]}</a>`;
    });
};

script4();

// 5. Напишите регулярное выражение для поиска цвета, заданного как #ABCDEF, вывести цвет в консоль
const script5 = () => {
    const regexp = /#[0-9a-fA-F]{6}/g;
    const str = document.body.innerHTML;
    const matches = [...str.matchAll(regexp)];
    for (const match of matches) {
        console.log(`%c${match[0]}`, `color: ${match[0]}`);
    }
};

script5();


// 6. Ссылки такого вида http://site.ru/aaaa/bbbb.html заменить
//     на <a href="http://site.ru/aaaa/bbbb.html">site.ru</a>
