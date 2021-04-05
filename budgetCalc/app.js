'use strict';

let money = prompt('Ваш месячный доход?');
let income = 'попрошайничество';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 50000;
let period = 5;

console.log(`money: ${typeof money}`);
console.log(`income: ${typeof income}`);
console.log(`deposit: ${typeof deposit}`);

console.log(addExpenses.length);

console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);

console.log(addExpenses.toLowerCase().split(','));


let expenses1 = prompt('Введите обязательную статью расходов:');
let amount1 = prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов:');
let amount2 = prompt('Во сколько это обойдется?');


let budgetMonth = money - (+amount1 + amount2 * 1);
console.log(`Бюджет на месяц: ${budgetMonth}`);

console.log(`Цель (${mission} рублей) будет достигнута за ${Math.round(mission / budgetMonth)} месяца(-ев)`);

let budgetDay = budgetMonth / 30;
console.log(`Дневной бюджет, руб. : ${Math.floor(budgetDay)}`);

if (budgetDay >= 1200) {
  console.log('У Вас высокий уровень дохода');
} else if (budgetDay >= 600 && budgetDay < 1200) {
  console.log('У Вас средний уровень дохода');
} else if (budgetDay >= 0 && budgetDay < 600) {
  console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
  console.log('Что-то пошло не так');
}