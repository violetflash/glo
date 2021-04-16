'use strict';

//Кнопку "Рассчитать" через id
let start = document.getElementById('start');
let cancel = document.querySelector('#cancel');

//Кнопки “+” (плюс) через Tag, каждую в своей переменной.
let incomePlus = document.getElementsByTagName('button')[0];
let expensesPlus = document.getElementsByTagName('button')[1];

//Чекбокс по id через querySelector
let checkDeposit = document.querySelector('#deposit-check');

//Поля для ввода возможных доходов (additional_income-item) при помощи querySelectorAll
let addIncomeItems = document.querySelectorAll('.additional_income-item');

//Каждый элемент в правой части программы через класс(не через querySelector), которые имеют в имени класса "-value",
// начиная с class="budget_day-value" и заканчивая class="target_month-value">
let results = document.querySelectorAll('.result-total');
let budgetMonth = document.getElementsByClassName('result-total')[0];
let budgetDay = document.getElementsByClassName('result-total')[1];
let expensesMonth = document.getElementsByClassName('result-total')[2];
let additionalIncome = document.getElementsByClassName('result-total')[3];
let additionalExpensesValue = document.getElementsByClassName('result-total')[4];
let incomePeriod = document.getElementsByClassName('result-total')[5];
let targetMonth = document.getElementsByClassName('result-total')[6];

//Оставшиеся поля через querySelector каждый в отдельную переменную:
let salaryAmount = document.querySelector('.salary-amount');
let incomeItems = document.querySelectorAll('.income-items');
let expensesTitle = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let depositAmount = document.querySelector('.deposit-amount');
let depositPercent = document.querySelector('.deposit-percent');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');
let periodAmount = document.querySelector('.period-amount');

let nameInputs = document.querySelectorAll("input[placeholder='Наименование']");
let digitInputs = document.querySelectorAll("input[placeholder='Сумма']");



let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};


const AppData = function() {
  this.budget = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
};

AppData.prototype.check = function() {
  salaryAmount.value ? start.removeAttribute('disabled') :
    start.setAttribute('disabled', 'true');
};

AppData.prototype.start = function() {
  this.budget = +salaryAmount.value;
  this.getExpenses();
  this.getAddIncome();
  this.getExpensesMonth();
  this.getAddExpenses();
  this.getIncome();
  this.getBudget();
  this.getInfoDeposit();
  this.showResult();

  start.style.display = 'none';
  cancel.style.display = 'inline-block';
  [checkDeposit, expensesPlus, incomePlus, ...document.querySelectorAll('input[type="text"]')].forEach(function(elem) {
    elem.setAttribute('disabled', 'true');
  });
};

AppData.prototype.reset = function() {
  this.budget = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.expenses = {};
  this.budgetMonth = 0;
  this.expensesMonth = 0;
  this.addIncome = [];
  this.addExpenses = [];

  [checkDeposit, expensesPlus, incomePlus, ...document.querySelectorAll('input[type="text"]')].forEach(function(elem) {
    if (elem.type === "text") {
      elem.value = '';
    }
    if (elem.type === 'checkbox') {
      elem.checked = false;
    }
    elem.removeAttribute('disabled');
  });

  [incomeItems, expensesItems].forEach(function(list) {
    list.forEach(function(elem, index) {
      if (index > 0) elem.remove();
    });
  });
  incomePlus.style.display = 'block';
  expensesPlus.style.display = 'block';
  periodSelect.value = 1;
  periodAmount.textContent = periodSelect.value;

  cancel.style.display = 'none';
  start.style.display = 'inline-block';
  start.setAttribute('disabled', 'true');
};

AppData.prototype.check = function() {
  salaryAmount.value ? start.removeAttribute('disabled') :
    start.setAttribute('disabled', 'true');
};

AppData.prototype.showResult = function() {
  const self = this;
  budgetMonth.value = this.budgetMonth;
  budgetDay.value = this.budgetDay;
  expensesMonth.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncome.value = this.addIncome.join(', ');
  targetMonth.value = this.getTargetMonth();
  incomePeriod.value = this.calcSavedMoney();

  periodSelect.addEventListener('change', function() {
    incomePeriod.value = self.calcSavedMoney();
  });
};

AppData.prototype.initialize = function() {
  start.setAttribute('disabled', 'true');

  nameInputs.forEach(function(elem) {
    elem.addEventListener('input', function(e) {
      elem.value = elem.value.replace(/[^а-яА-Я\s,.]/g, '');
    });
  });
  digitInputs.forEach(function(elem) {
    elem.addEventListener('input', function(e) {
      elem.value = elem.value.replace(/[^\d]/g, '');
    });
  });
};

AppData.prototype.addExpensesBlock = function() {
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  let cloneInputs = cloneExpensesItem.querySelectorAll('input');
  cloneInputs.forEach(function(elem) {
    elem.value = '';
    elem.value = '';
    if (elem.placeholder === 'Наименование') {
      elem.addEventListener('input', function(e) {
        elem.value = elem.value.replace(/[^а-яА-Я\s,.]/g, '');
      });
    }
    if (elem.placeholder === 'Сумма') {
      elem.addEventListener('input', function(e) {
        elem.value = elem.value.replace(/[^\d]/g, '');
      });
    }
  });
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);

  expensesItems = document.querySelectorAll('.expenses-items');
  if (expensesItems.length === 3) {
    expensesPlus.style.display = 'none';
  }
};

AppData.prototype.getExpenses = function() {
  const self = this;
  expensesItems.forEach(function(item) {
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;
    if (itemExpenses !== '' && cashExpenses !== '') {
      self.expenses[itemExpenses] = +cashExpenses;
    }
  });
};

AppData.prototype.addIncomeBlock = function() {
  let cloneAddIncomeItem = incomeItems[0].cloneNode(true);
  let cloneInputs = cloneAddIncomeItem.querySelectorAll('input');
  cloneInputs.forEach(function(elem) {
    elem.value = '';
    if (elem.placeholder === 'Наименование') {
      elem.addEventListener('input', function(e) {
        elem.value = elem.value.replace(/[^а-яА-Я\s,.]/g, '');
      });
    }
    if (elem.placeholder === 'Сумма') {
      elem.addEventListener('input', function(e) {
        elem.value = elem.value.replace(/[^\d]/g, '');
      });
    }
  });
  incomeItems[0].parentNode.insertBefore(cloneAddIncomeItem, incomePlus);

  incomeItems = document.querySelectorAll('.income-items');
  if (incomeItems.length === 3) {
    incomePlus.style.display = 'none';
  }
};

AppData.prototype.getIncome = function() {
  let self = this;
  incomeItems.forEach(function(item) {
    let itemIncome = item.querySelector('.income-title').value;
    let cashIncome = item.querySelector('.income-amount').value;
    if (itemIncome !== '' && cashIncome !== '') {
      self.income[itemIncome] = +cashIncome;
    }
  });
  for (const key in this.income) {
    self.incomeMonth += +self.income[key];
  }
};

AppData.prototype.getAddExpenses = function() {
  let additionalExpenses = additionalExpensesItem.value.split(',');
  let self = this;
  additionalExpenses.forEach(function(item) {
    item = item.trim();
    if (item !== '') {
      self.addExpenses.push(item[0].toUpperCase() + item.slice(1));
    }
  });
};

AppData.prototype.getAddIncome = function() {
  addIncomeItems.forEach(function(item) {
    let itemValue = item.value.trim();
    if (itemValue !== '') {
      this.addIncome.push(itemValue[0].toUpperCase() + itemValue.slice(1));
    }
  }.bind(appData));
};

AppData.prototype.getExpensesMonth = function() {
  for (const key in this.expenses) {
    this.expensesMonth += this.expenses[key];
  }
};

AppData.prototype.getBudget = function() {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.round(this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function() {
  return Math.ceil(+targetAmount.value / this.budgetMonth);
};

AppData.prototype.getStatusIncome = function() {
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
};

AppData.prototype.getInfoDeposit = function() {
  if (this.deposit) {
    do {
      this.percentDeposit = prompt('Какой годовой процент депозита?', 10);
    } while (!isNumber(this.percentDeposit));
    do {
      this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
    } while (!isNumber(this.moneyDeposit));
  }
};

AppData.prototype.calcSavedMoney = function() {
  return this.budgetMonth * periodSelect.value;
};

AppData.prototype.eventsListeners = function() {
  start.addEventListener('click', appData.start.bind(appData));
  cancel.addEventListener('click', appData.reset.bind(appData));
  salaryAmount.addEventListener('input', appData.check);
  expensesPlus.addEventListener('click', appData.addExpensesBlock);
  incomePlus.addEventListener('click', appData.addIncomeBlock);

  periodSelect.addEventListener('change', function() {
    periodAmount.innerText = periodSelect.value;
  });
};

const appData = new AppData();

appData.initialize();
appData.eventsListeners();



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