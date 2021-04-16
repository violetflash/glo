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

function validateInputs(names, digits) {
  names.forEach(function(elem) {
    elem.addEventListener('input', function(e) {
      elem.value = elem.value.replace(/[^а-яА-Я\s,.]/g, '');
    });
  });
  digits.forEach(function(elem) {
    elem.addEventListener('input', function(e) {
      elem.value = elem.value.replace(/[^\d]/g, '');
    });
  });
}

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
  [periodSelect, expensesPlus, incomePlus, ...document.querySelectorAll('input[type="text"]')].forEach(function(elem) {
    elem.setAttribute('disabled', 'true');
  });
};

const appData = new AppData();


console.log(appData);

/*
start.setAttribute('disabled', 'true');
validateInputs(nameInputs, digitInputs);

start.addEventListener('click', appData.start.bind(appData));
cancel.addEventListener('click', appData.reset.bind(appData));
salaryAmount.addEventListener('input', appData.check);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('change', function() {
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

 */