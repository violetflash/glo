'use strict';

let money = 7500;
let income = 'попрошайничество';
let addExpenses = 'алкоголь,еда,оброк хозяину';
let deposit = false;
let mission = 50000;
let period = 5;

console.log(`money: ${typeof money}`);
console.log(`income: ${typeof income}`);
console.log(`deposit: ${typeof deposit}`);

console.log(addExpenses.length);

console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);

console.log(addExpenses.toLowerCase().split(','));

let budgetDay = money / 30;
console.log(budgetDay);


money = +prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');


const expenses1 = prompt('Введите обязательную статью расходов:');
let amount1 = +prompt('Во сколько это обойдется?');
amount1 = isNaN(amount1) ? 0 : amount1;


const expenses2 = prompt('Введите обязательную статью расходов:');
let amount2 = +prompt('Во сколько это обойдется?');
amount2 = isNaN(amount2) ? 0 : amount2;


const budgetMonth = money - amount1 - amount2;
console.log(`Бюджет на месяц: ${budgetMonth}`);

console.log(`Цель (${mission} рублей) будет достигнута за ${Math.round(mission / budgetMonth)} месяца(-ев)`);

budgetDay = budgetMonth / 30;
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