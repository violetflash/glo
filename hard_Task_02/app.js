/*
1) Создать переменную num со значением 266219 (тип данных число)
2) Вывести в консоль произведение (умножение) цифр этого числа
Например: число 123, при помощи javaScript получить каждое цифру ( 1, 2, 3 )
и перемножить их.
Правильно использовать цикл или методы перебора.
3) Полученный результат возвести в степень 3, используя только 1 оператор
(Math.pow не подходит)
4) Вывести в консоль первые 2 цифры полученного числа
5) В отдельном репозитории для усложненных уроков, добавить папку или ветку со
вторым уроком в свой репозиторий на GitHub
 */

const num = 266219;
const nums = Array.from(String(num), Number);

const result = nums.reduce((accum, current) => accum * current);

/*
//or
let result = 1;
nums.forEach(elem => result *= elem)

//or
for (let i = 0; i < nums.length; i++) {
  result *= nums[i];
}
 */

console.log(result);
console.log( (result ** 3).toString().slice(0,2) );