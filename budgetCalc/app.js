'use strict';

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let start = function () {
  let money;
  do {
    money = prompt('Ваш месячный доход?');
  } while (!isNumber(money));
  return money;
};

let money = start();
let income = 'попрошайничество';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'еда, вода,' +
  ' огненная вода');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 50000;
let period = 5;
let expenses = {};

let showTypeOf = function (data) {
  console.log(data, typeof data);
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(addExpenses.toLowerCase().split(','));


//Суммирует расходы
function getExpensesMonth(obj) {
  for (let i = 0; i < 2; i++) {
    let expense = prompt('Введите обязательную статью расходов:', 'штраф');
    let amount;

    do {    //проверка на число
      amount = prompt('Во сколько это обойдется?');
    } while (!isNumber(amount));
    obj[expense] = +amount;   //Запись расхода в объект
  }
}

getExpensesMonth(expenses);

let expensesAmount = Object.values(expenses).reduce((accum, curr) => accum + curr);
console.log(`сумма расходов, руб : ${expensesAmount}`);

//Остаток на месяц (приход - расходы)
function getAccumulatedMonth(salary, expenses) {
  return +salary - expenses;
}

let accumulatedMonth = getAccumulatedMonth(money, expensesAmount);

//Подсчет времени достижения цели
function getTargetMonth(target, balance) {
  return Math.ceil(target / balance);
}

getTargetMonth(mission, accumulatedMonth) > 0 ?
  console.log(`Срок достижения цели, месяцев: ${getTargetMonth(mission, accumulatedMonth)}`) :
  console.log('Цель не будет достигнута');


//Дневной бюджет
let budgetDay = accumulatedMonth / 30;
console.log(`Дневной бюджет, руб. : ${accumulatedMonth} / 30 = ${Math.floor(budgetDay)}`);

let getStatusIncome = function (balance) {
  if (balance >= 1200) {
    return 'У Вас высокий уровень дохода';
  } else if (balance >= 600 && balance < 1200) {
    return 'У Вас средний уровень дохода';
  } else if (balance >= 0 && balance < 600) {
    return 'К сожалению, у вас уровень дохода ниже среднего';
  } else {
    return 'Что-то пошло не так';
  }
};

console.log(getStatusIncome(budgetDay));