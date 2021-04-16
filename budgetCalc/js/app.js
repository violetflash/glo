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

    [periodSelect, expensesPlus, incomePlus, ...document.querySelectorAll('input[type="text"]')].forEach(function(elem) {
      if (elem.type === "text") {
        elem.value = '';
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
  },

  showResult() {
    budgetMonth.value = this.budgetMonth;
    budgetDay.value = this.budgetDay;
    expensesMonth.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncome.value = this.addIncome.join(', ');
    targetMonth.value = this.getTargetMonth();
    incomePeriod.value = this.calcSavedMoney();

    periodSelect.addEventListener('change', function() {
      incomePeriod.value = this.calcSavedMoney();
    }.bind(appData));
  },

  addExpensesBlock() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    let cloneInputs = cloneExpensesItem.querySelectorAll('input');
    cloneInputs.forEach(function(elem) {
      elem.value = '';
    });
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);

    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  },

  getExpenses() {
    expensesItems.forEach(function(item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses] = +cashExpenses;
      }
    }.bind(appData));
  },

  addIncomeBlock() {
    let cloneAddIncomeItem = incomeItems[0].cloneNode(true);
    let cloneInputs = cloneAddIncomeItem.querySelectorAll('input');
    cloneInputs.forEach(function(elem) {
      elem.value = '';
    });
    incomeItems[0].parentNode.insertBefore(cloneAddIncomeItem, incomePlus);

    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  },

  getIncome() {
    let self = this;
    incomeItems.forEach(function(item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        self.income[itemIncome] = +cashIncome;
      }
    });
    for (const key in this.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },

  getAddExpenses() {
    let additionalExpenses = additionalExpensesItem.value.split(',');
    let self = this;
    additionalExpenses.forEach(function(item) {
      item = item.trim();
      if (item !== '') {
        self.addExpenses.push(item[0].toUpperCase() + item.slice(1));
      }
    });
  },

  getAddIncome() {
    addIncomeItems.forEach(function(item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue[0].toUpperCase() + itemValue.slice(1));
      }
    }.bind(appData));
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
  },
};

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