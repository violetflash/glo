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

};

const appData = new AppData();

console.log(appData);

window.addEventListener('DOMContentLoaded', function() {
  start.setAttribute('disabled', 'true');
});

salaryAmount.addEventListener('input', function() {
  salaryAmount.value ? start.removeAttribute('disabled') :
    start.setAttribute('disabled', 'true');
});



start.addEventListener('click', function() {
  appData.start.call(appData);
  start.style.display = 'none';
  cancel.style.display = 'inline-block';
  [periodSelect, expensesPlus, incomePlus, ...document.querySelectorAll('input[type="text"]')].forEach(function(elem) {
    elem.setAttribute('disabled', 'true');
  });
});


cancel.addEventListener('click', function() {
  appData.reset.call(appData);
  cancel.style.display = 'none';
  start.style.display = 'inline-block';
  start.setAttribute('disabled', 'true');
});



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

validateInputs(nameInputs, digitInputs);

expensesPlus.addEventListener('click', function() {
  appData.addExpensesBlock();
  nameInputs = document.querySelectorAll("input[placeholder='Наименование']");
  digitInputs = document.querySelectorAll("input[placeholder='Сумма']");
  validateInputs(nameInputs, digitInputs);
});


incomePlus.addEventListener('click', function() {
  appData.addIncomeBlock();
  nameInputs = document.querySelectorAll("input[placeholder='Наименование']");
  digitInputs = document.querySelectorAll("input[placeholder='Сумма']");
  validateInputs(nameInputs, digitInputs);
});

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