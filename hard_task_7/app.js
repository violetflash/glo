'use strict';
/*
1) Создать массив week и записать в него дни недели в виде строк
·        Вывести на экран все дни недели
·        Каждый из них с новой строчки
·        Выходные дни - курсивом
·        Текущий день - жирным шрифтом(использовать объект даты)
 */

const week = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];


//В консоль
week.forEach((day, idx) => {
  if (idx === 0 || idx === 6) {
    console.log(`%c${day}`, 'font-style:italic');
  } else if (idx === new Date().getDay()) {
    console.log(`%c${day}`, 'font-weight: 700');
  } else {
    console.log(day);
  }
});

//в браузер
week.forEach((day, idx) => {
  const li = document.createElement('li');
  if (idx === 0 || idx === 6) {
    li.style.fontStyle = 'italic';
  } else if (idx === new Date().getDay()) {
    li.style.fontWeight = 700;
  }
  li.innerText = day;
  document.querySelector('.days').append(li);
});