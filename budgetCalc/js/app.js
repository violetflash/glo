'use strict';

//TODO ОЧИЩАТЬ ПОЛЯ РЕЗУЛЬТАТОВ ПРИ ПОВТОРНОМ НАЖАТИИ КНОПКИ РАССЧИТАТЬ

//Кнопку "Рассчитать" через id
const start = document.getElementById('start');

//Кнопки “+” (плюс) через Tag, каждую в своей переменной.
const incomePlus = document.getElementsByTagName('button')[0];
const expensesPlus = document.getElementsByTagName('button')[1];

//Чекбокс по id через querySelector
const checkDeposit = document.querySelector('#deposit-check');

//Поля для ввода возможных доходов (additional_income-item) при помощи querySelectorAll
let addIncomeItems = document.querySelectorAll('.additional_income-item');

//Каждый элемент в правой части программы через класс(не через querySelector), которые имеют в имени класса "-value",
// начиная с class="budget_day-value" и заканчивая class="target_month-value">
const results = document.querySelectorAll('.result-total');
const budgetMonth = document.getElementsByClassName('result-total')[0];
const budgetDay = document.getElementsByClassName('result-total')[1];
const expensesMonth = document.getElementsByClassName('result-total')[2];
const additionalIncome = document.getElementsByClassName('result-total')[3];
const additionalExpensesValue = document.getElementsByClassName('result-total')[4];
const incomePeriod = document.getElementsByClassName('result-total')[5];
const targetMonth = document.getElementsByClassName('result-total')[6];

//Оставшиеся поля через querySelector каждый в отдельную переменную:
const salaryAmount = document.querySelector('.salary-amount');
let incomeItems = document.querySelectorAll('.income-items');
const expensesTitle = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
const periodAmount = document.querySelector('.period-amount');

const wordInputs = document.querySelectorAll("input[placeholder='Наименование']");
const digitInputs = document.querySelectorAll("input[placeholder='Сумма']");

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};


let appData = {
  budget: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,

  start() {

    appData.budget = +salaryAmount.value;


    appData.getExpenses();
    appData.getAddIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getIncome();
    appData.getBudget();
    appData.getInfoDeposit();

    appData.showResult();
  },

  showResult() {
    budgetMonth.value = appData.budgetMonth;
    budgetDay.value = appData.budgetDay;
    expensesMonth.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncome.value = appData.addIncome.join(', ');
    targetMonth.value = appData.getTargetMonth();
    incomePeriod.value = appData.calcSavedMoney();

    periodSelect.addEventListener('change', () => {
      incomePeriod.value = appData.calcSavedMoney();
    });
  },

  clearData() {
    appData.budget = 0;
    appData.income = {};
    appData.incomeMonth = 0;
    appData.expenses = {};
    appData.budgetMonth = 0;
    appData.expensesMonth = 0;
    appData.addIncome = [];
    appData.addExpenses = [];
  },

  addExpensesBlock() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    let cloneInputs = cloneExpensesItem.querySelectorAll('input');
    cloneInputs.forEach(elem => elem.value = '');
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);

    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  },

  getExpenses() {
    expensesItems.forEach((item) => {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = +cashExpenses;
      }
    });
  },

  addIncomeBlock() {
    let cloneAddIncomeItem = incomeItems[0].cloneNode(true);
    let cloneInputs = cloneAddIncomeItem.querySelectorAll('input');
    cloneInputs.forEach(elem => elem.value = '');
    incomeItems[0].parentNode.insertBefore(cloneAddIncomeItem, incomePlus);

    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  },

  getIncome() {
    incomeItems.forEach((item) => {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = +cashIncome;
      }
    });
    for (const key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },

  getAddExpenses() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },

  getAddIncome() {
    addIncomeItems.forEach((item) => {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },

  getExpensesMonth() {
    for (const key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
  },

  getBudget() {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.round(appData.budgetMonth / 30);
  },

  getTargetMonth() {
    return Math.ceil(+targetAmount.value / appData.budgetMonth);
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
    return appData.budgetMonth * periodSelect.value;
  }
};

window.addEventListener('DOMContentLoaded', () => {
  start.setAttribute('disabled', 'true');
});

salaryAmount.addEventListener('input', () => {
  if (!salaryAmount.value) {
    start.setAttribute('disabled', 'true');
  } else {
    start.removeAttribute('disabled');
    start.addEventListener('click', () => {
      appData.clearData();
      appData.start();
    });

  }
});

//  Поля с placeholder="Наименование" разрешить ввод только русских букв пробелов и знаков препинания
wordInputs.forEach((elem) => {
  elem.addEventListener('input', function(e) {
    elem.value = elem.value.replace(/[^а-яА-Я\s,.]/g, '');
  });
});

// Поля с placeholder="Сумма" разрешить ввод только цифр
digitInputs.forEach((elem) => {
  elem.addEventListener('input', function(e) {
    elem.value = elem.value.replace(/[^\d]/g, '');
  });
});


expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('change', () => {
  periodAmount.innerText = periodSelect.value;
});





// console.log('%cНаша программа включает в себя данные:', 'color:lightgreen');
// for (const key in appData) {
//   if (Object.keys(appData[key]).length) {
//     console.log(`${key}: ${JSON.stringify(appData[key])}`);
//   } else {
//     console.log(`${key}: ${appData[key]}`);
//   }
// }
//
// console.log(appData.addExpenses.map((word) => {
//   return word[0].toUpperCase() + word.slice(1);
// }).join(','));