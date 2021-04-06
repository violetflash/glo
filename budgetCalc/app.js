'use strict';

let money = prompt('Ваш месячный доход?');
let income = 'попрошайничество';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'еда, вода,' +
  ' огненная вода');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 50000;
let period = 5;

let showTypeOf = function(data) {
  console.log(data, typeof data);
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(addExpenses.toLowerCase().split(','));

let expenses1 = prompt('Введите обязательную статью расходов:', 'штраф');
let amount1 = prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов:', 'стирка');
let amount2 = prompt('Во сколько это обойдется?');

function getExpensesMonth() {
  return +amount1 + amount2 * 1;
}

console.log(getExpensesMonth());

function getAccumulatedMonth() {
  return +money - getExpensesMonth();
}

let accumulatedMonth = getAccumulatedMonth();

function getTargetMonth() {
  return Math.round(mission / accumulatedMonth);
}

console.log(`Срок достижения цели, месяцев: ${getTargetMonth()}`);

let budgetDay = accumulatedMonth / 30;
console.log(`Дневной бюджет, руб. : ${Math.floor(budgetDay)}`);

let getStatusIncome = function(balance) {
  if (balance >= 1200) {
    return 'У Вас высокий уровень дохода';
  } else if (balance >= 600 && balance < 1200) {
    return 'У Вас средний уровень дохода';
  } else if (balance >= 0 && balance < 600) {
    return 'К сожалению, у вас уровень дохода ниже среднего';
  } else {
    return 'Что-то пошло не так';
  }
}

console.log(getStatusIncome(budgetDay));