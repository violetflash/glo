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

// let money = start();

let appData = {
  budget: start(),
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 50000,
  period: 5,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,

  asking() {
    let {expenses} = this;
    let askToAddExpenses;
    do {
      askToAddExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'еда, вода,' +
        ' огненная вода');
    } while (isNumber(askToAddExpenses) || typeof askToAddExpenses !== 'string');
    this.addExpenses = askToAddExpenses.toLowerCase().split(',');
    this.deposit = confirm('Есть ли у вас депозит в банке?');

    for (let i = 0; i < 2; i++) {
      let expense = prompt('Введите обязательную статью расходов:', 'штраф');
      let amount;

      do {    //проверка на число
        amount = prompt('Во сколько это обойдется?');
      } while (!isNumber(amount));
      expenses[expense] = +amount;   //Запись расхода в объект
    }
  },

  getExpensesMonth() {
    let {expenses} = this;
    this.expensesMonth = Object.values(expenses).reduce((accum, curr) => accum + curr); //сумма всех расходов
  },

  getBudget() {
    let {budget, expensesMonth} = this;
    this.budgetMonth = budget - expensesMonth;
    this.budgetDay = this.budgetMonth / 30;
  },

  getTargetMonth() {
    let {mission, budgetMonth} = this;
    return Math.ceil(mission / budgetMonth);
  },

  getStatusIncome() {
    let {budgetDay} = this;
    if (budgetDay >= 1200) {
      return 'У Вас высокий уровень дохода';
    } else if (budgetDay >= 600 && budgetDay < 1200) {
      return 'У Вас средний уровень дохода';
    } else if (budgetDay >= 0 && budgetDay < 600) {
      return 'К сожалению, у вас уровень дохода ниже среднего';
    } else {
      return 'Что-то пошло не так';
    }
  },
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log(`Расходы за месяц: ${appData.expensesMonth}`);
console.log(`Срок достижения цели, месяцев: ${appData.getTargetMonth()}`);
console.log(appData.getStatusIncome());

console.log('%cНаша программа включает в себя данные:', 'color:lightgreen');
for (const appDataKey in appData) {
  console.log(`${appDataKey}: ${appData[appDataKey]}`);
}