'use strict';

//Кнопку "Рассчитать" через id
const start = document.getElementById('start');
const cancel = document.querySelector('#cancel');

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

let nameInputs = document.querySelectorAll("input[placeholder='Наименование']");
let digitInputs = document.querySelectorAll("input[placeholder='Сумма']");


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
    console.log(this);

    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getAddIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getIncome();
    this.getBudget();
    this.getInfoDeposit();

    appData.showResult();
  },

  reset() {
    this.budget = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.expenses = {};
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.addIncome = [];
    this.addExpenses = [];

    document.querySelectorAll('input[type="text"]').forEach(elem => {
      elem.value = '';
      elem.removeAttribute('disabled');
    });

    [incomeItems, expensesItems].forEach((list) => {
      list.forEach((elem, index) => {
        if (index > 0) elem.remove();
      });
    });
    incomePlus.style.display = 'block';
    expensesPlus.style.display = 'block';
    periodSelect.value = 1;
    periodAmount.textContent = periodSelect.value;
  },

  showResult() {
    budgetMonth.value = this.budgetMonth;
    budgetDay.value = this.budgetDay;
    expensesMonth.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncome.value = this.addIncome.join(', ');
    targetMonth.value = this.getTargetMonth();
    incomePeriod.value = this.calcSavedMoney();

    periodSelect.addEventListener('change', () => {
      incomePeriod.value = this.calcSavedMoney();
    });
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
        this.income[itemIncome] = +cashIncome;
      }
    });
    for (const key in this.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },

  getAddExpenses() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item[0].toUpperCase() + item.slice(1));
      }
    });
  },

  getAddIncome() {
    addIncomeItems.forEach((item) => {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue[0].toUpperCase() + itemValue.slice(1));
      }
    });
  },

  getExpensesMonth() {
    for (const key in this.expenses) {
      this.expensesMonth += this.expenses[key];
    }
  },

  getBudget() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.round(this.budgetMonth / 30);
  },

  getTargetMonth() {
    return Math.ceil(+targetAmount.value / this.budgetMonth);
  },

  getStatusIncome() {
    let budgetDay = this.budgetDay;
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
    if (this.deposit) {
      do {
        this.percentDeposit = prompt('Какой годовой процент депозита?', 10);
      } while (!isNumber(this.percentDeposit));
      do {
        this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      } while (!isNumber(this.moneyDeposit));
    }
  },

  calcSavedMoney() {
    return this.budgetMonth * periodSelect.value;
  }
};

window.addEventListener('DOMContentLoaded', () => {
  start.setAttribute('disabled', 'true');
});

salaryAmount.addEventListener('input', () => {
  salaryAmount.value ? start.removeAttribute('disabled') :
    start.setAttribute('disabled', 'true');
});


let startFunc = appData.start.bind(appData);
start.addEventListener('click', () => {
  start.style.display = 'none';
  cancel.style.display = 'inline-block';
  document.querySelectorAll('input[type="text"]').forEach(elem => elem.setAttribute('disabled', 'true'));
  startFunc();
});

let cancelFunc = appData.reset.bind(appData);
cancel.addEventListener('click', () => {
  cancelFunc();
  cancel.style.display = 'none';
  start.style.display = 'inline-block';
  start.setAttribute('disabled', 'true');
});



function validateInputs(names, digits) {
  names.forEach((elem) => {
    elem.addEventListener('input', function(e) {
      elem.value = elem.value.replace(/[^а-яА-Я\s,.]/g, '');
    });
  });
  digits.forEach((elem) => {
    elem.addEventListener('input', function(e) {
      elem.value = elem.value.replace(/[^\d]/g, '');
    });
  });
}

validateInputs(nameInputs, digitInputs);

expensesPlus.addEventListener('click', () => {
  appData.addExpensesBlock();
  nameInputs = document.querySelectorAll("input[placeholder='Наименование']");
  digitInputs = document.querySelectorAll("input[placeholder='Сумма']");
  validateInputs(nameInputs, digitInputs);
});


incomePlus.addEventListener('click', () => {
  appData.addIncomeBlock();
  nameInputs = document.querySelectorAll("input[placeholder='Наименование']");
  digitInputs = document.querySelectorAll("input[placeholder='Сумма']");
  validateInputs(nameInputs, digitInputs);
});

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