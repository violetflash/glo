'use strict';
/*
Написать функцию которая принимает 2 целых числа x и y
Функция должна вычислять сумму цифр результата x в степени y.
  Например вызов
getResult(4, 8) -->> 25
48 = 65536, а сумма его цифр составляет 6 + 5 + 5 + 3 + 6 = 25.
 */

function getResult(x, y) {
  let power = String(x ** y);
  return power.split('').reduce((accum, curr) => accum + Number(curr), 0);
}

console.log(getResult(3, 12));