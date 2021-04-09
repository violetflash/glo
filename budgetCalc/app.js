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

let appData = {
  budget: +money,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 50000,
  period: 5,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,

  asking() {
    let askToAddExpenses;

    if (confirm('Есть ли у вас дополнительный заработок?')) {
      let itemIncome;
      let cashIncome;

      do {
        itemIncome = prompt('Какой у вас дополнительный заработок?', 'Такси');
      } while (!itemIncome.trim() || !isNaN(parseFloat(itemIncome)));

      do {
        cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
      } while (!isNumber(cashIncome));

      appData.income[itemIncome] = +cashIncome;
    }

    do {
      askToAddExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'еда, вода,' +
        ' огненная вода');
    } while (!askToAddExpenses.trim() || !isNaN(parseFloat(askToAddExpenses)));

    appData.addExpenses = askToAddExpenses.toLowerCase().split(',');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');

    for (let i = 0; i < 2; i++) {
      let expense = prompt('Введите обязательную статью расходов:', 'штраф');
      let amount;

      do {    //проверка на число
        amount = prompt('Во сколько это обойдется?');
      } while (!isNumber(amount));

      appData.expenses[expense] = +amount;   //Запись расхода в объект
    }
  },

  getExpensesMonth() {
    for (const key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
  },

  getBudget() {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30;
  },

  getTargetMonth() {
    return Math.ceil(appData.mission / appData.budgetMonth);
  },

  getStatusIncome() {
    let budgetDay = appData.budgetDay;
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

  getInfoDeposit() {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt('Какой годовой процент депозита?', 10);
      } while (!isNumber(appData.percentDeposit));
      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      } while (!isNumber(appData.moneyDeposit));
    }
  },

  calcSavedMoney() {
    return appData.budgetMonth * appData.period;
  }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getInfoDeposit();

console.log(`Расходы за месяц: ${appData.expensesMonth}`);
console.log(`Срок достижения цели, месяцев: ${appData.getTargetMonth()}`);
console.log(appData.getStatusIncome());

console.log('%cНаша программа включает в себя данные:', 'color:lightgreen');
for (const key in appData) {
  if (Object.keys(appData[key]).length) {
    console.log(`${key}: ${JSON.stringify(appData[key])}`);
  } else {
    console.log(`${key}: ${appData[key]}`);
  }
}

console.log(appData.addExpenses.map((word) => {
  return word[0].toUpperCase() + word.slice(1);
}).join(','));