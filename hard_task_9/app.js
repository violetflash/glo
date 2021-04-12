'use strict';
/*
1) Выведите на страницу текущую дату и время в 2-х форматах:
    a) 'Сегодня Вторник, 4 февраля 2020 года, 21 час 5 минут 33 секунды'
    б) '04.02.2020 - 21:05:33'
2) Для вывода в формате (а) напишите функцию, которая будет менять склонение слов в зависимости от числа, "час, часов,
часа"
3) Для вывода в формате (б) напишите функцию, которая будет добавлять 0 перед значениями которые состоят из одной цифры
(из 9:5:3  1.6.2019 сделает 09:05:03 01.06.2019)
4) С помощью функции setInterval, реализуйте обновление даты и времени каждую секунду
 */

function checkZero(num) {
  return ( num < 10 ) ? `0${num}` : num;
}

function hoursPhrase(hours) {
  if (Math.floor(hours / 10) !== 1) {
    if (hours % 10 === 1) return 'час';
    if (hours % 10 > 1 && hours % 10 < 5) return 'часа';
  }
  return 'часов';
}

function minSecPhrase(num, phrase) {
  if (Math.floor(num / 10) !== 1) {
    if (num % 10 === 1) return `${phrase}a`;
    if (num % 10 > 1 && num % 10 < 5) return `${phrase}ы`;
  }
  return phrase;
}

function getDate() {
  let today = new Date();
  let dayOfWeek = today.getDay();
  let dayNum = today.getDate();
  let month = today.getMonth();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();

  switch (dayOfWeek) {
    case 1: {
      dayOfWeek = 'Понедельник';
      break;
    }
    case 2: {
      dayOfWeek = 'Вторник';
      break;
    }
    case 3: {
      dayOfWeek = 'Среда';
      break;
    }
    case 4: {
      dayOfWeek = 'Четверг';
      break;
    }
    case 5: {
      dayOfWeek = 'Пятница';
      break;
    }
    case 6: {
      dayOfWeek = 'Суббота';
      break;
    }
    case 7: {
      dayOfWeek = 'Воскресенье';
      break;
    }
  }

  switch (month) {
    case 0: {
      month = 'Января';
      break;
    }
    case 1: {
      month = 'Февраля';
      break;
    }
    case 2: {
      month = 'Марта';
      break;
    }
    case 3: {
      month = 'Апреля';
      break;
    }
    case 4: {
      month = 'Мая';
      break;
    }
    case 5: {
      month = 'Июня';
      break;
    }
    case 6: {
      month = 'Июля';
      break;
    }
    case 7: {
      month = 'Августа';
      break;
    }
    case 8: {
      month = 'Сентября';
      break;
    }
    case 9: {
      month = 'Октября';
      break;
    }
    case 10: {
      month = 'Ноября';
      break;
    }
    case 11: {
      month = 'Декабря';
      break;
    }
  }

  return `Сегодня ${dayOfWeek}, ${dayNum} ${month} ${today.getFullYear()} года, 
  ${hours} ${hoursPhrase(hours)} ${checkZero(minutes)} ${minSecPhrase(minutes, 'минут')} 
  ${checkZero(seconds)} ${minSecPhrase(seconds, 'секунд')}`.replace(/\n/g, '');
}

document.querySelector('.time1').innerText = getDate();
setInterval(() => {
  document.querySelector('.time1').innerText = getDate();
}, 1000);


// б) '04.02.2020 - 21:05:33'
function getDate2() {
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();

  return `${checkZero(day)}.${checkZero(month)}.${year} - ${checkZero(hours)}:${checkZero(minutes)}:${checkZero(seconds)}`;
}

document.querySelector('.time2').innerText = getDate2();
setInterval(() => {
  document.querySelector('.time2').innerText = getDate2();
}, 1000);




