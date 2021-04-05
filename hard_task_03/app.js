'use strict';
/*
Переменная lang может принимать 2 значения: 'ru' 'en'.
Написать условия при котором в зависимости от значения lang будут выводится дни недели на русском или английском языке.
Решите задачу
через if,
через switch-case
через многомерный массив без ифов и switch.
 */

const en = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const ru = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье',];

const lang = confirm(" OК - 'ru'\n Отмена - 'en' ") ? 'ru' : 'en';

if (lang === 'ru') {
  console.log(ru.toString());
} else if (lang === 'en') {
  console.log(en.toString());
}

console.log('=========== SWITCH ============');

switch (lang) {
  case 'ru': {
    console.log(ru.toString());
    break;
  }
  case 'en': {
    console.log(en.toString());
    break;
  }
}

console.log('=========== ARRAY ================');

const days = [ru, en];
lang === 'ru' ? console.log(days[0].toString()) : console.log(days[1].toString());

//or
const days2 =
  {
    ru: ru,
    en: en,
  };
console.log(days2[lang].toString());



console.log('========= PART 2 ==================');
/*
У нас есть переменная namePerson. Если значение этой переменной “Артем” то вывести в консоль “директор”,
если значение “Максим” то вывести в консоль “преподаватель”, с любым другим значением вывести в консоль “студент”
	Решить задачу с помощью нескольких тернарных операторов, без использования if или switch
 */
const namePerson = 'Максимка';

namePerson === 'Артем' ? console.log('директор') :
  namePerson === 'Максим' ? console.log('преподаватель') :
    console.log('студент');


