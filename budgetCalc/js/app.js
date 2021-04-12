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


//Кнопку "Рассчитать" через id
const calculate = document.getElementById('start');

//Кнопки “+” (плюс) через Tag, каждую в своей переменной.
const addIncome = document.getElementsByTagName('button')[0];
const addExpenses = document.getElementsByTagName('button')[1];

//Чекбокс по id через querySelector
const checkDeposit = document.querySelector('#deposit-check');

//Поля для ввода возможных доходов (additional_income-item) при помощи querySelectorAll
const moreIncomes1 = document.querySelectorAll('.additional_income-item')[0];
const moreIncomes2 = document.querySelectorAll('.additional_income-item')[1];

//Каждый элемент в правой части программы через класс(не через querySelector), которые имеют в имени класса "-value",
// начиная с class="budget_day-value" и заканчивая class="target_month-value">
const budgetMonth = document.getElementsByClassName('result-total')[0];
const budgetDay = document.getElementsByClassName('result-total')[1];
const expensesMonth = document.getElementsByClassName('result-total')[2];
const additionalIncome = document.getElementsByClassName('result-total')[3];
const additionalExpensesValue = document.getElementsByClassName('result-total')[4];
const incomePeriod = document.getElementsByClassName('result-total')[5];
const targetMonth = document.getElementsByClassName('result-total')[6];

//Оставшиеся поля через querySelector каждый в отдельную переменную:
const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-title');
const incomeAmount = document.querySelector('.income-amount');
const expensesTitle = document.querySelector('.expenses-title');
const expensesAmount = document.querySelector('.expenses-amount');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
