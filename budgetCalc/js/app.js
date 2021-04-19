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
const addIncomeItems = document.querySelectorAll('.additional_income-item');
const addIncomeDiv = document.querySelectorAll('.additional_income');
const addExpensesDiv = document.querySelectorAll('.additional_expenses');

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

const nameInputs = document.querySelectorAll("input[placeholder='Наименование']");
const digitInputs = document.querySelectorAll("input[placeholder='Сумма']");

const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

class AppData {
  constructor() {
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
  }

  start() {
    this.budget = +salaryAmount.value;
    this.getExpInc();
    this.getAddExpInc();
    this.getExpensesMonth();
    this.getBudget();
    this.getInfoDeposit();
    this.showResult();

    start.style.display = 'none';
    cancel.style.display = 'inline-block';
    [checkDeposit, expensesPlus, incomePlus, ...document.querySelectorAll('input[type="text"]')].forEach(function(elem) {
      elem.setAttribute('disabled', 'true');
    });
  }

  reset() {
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
  }

  check() {
    salaryAmount.value ? start.removeAttribute('disabled') :
      start.setAttribute('disabled', 'true');
  }

  showResult() {
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
  }

  initialize() {
    start.setAttribute('disabled', 'true');

    nameInputs.forEach(function(elem) {
      elem.addEventListener('input', function() {
        elem.value = elem.value.replace(/[^а-яА-Я\s,.]/g, '');
      });
    });
    digitInputs.forEach(function(elem) {
      elem.addEventListener('input', function() {
        elem.value = elem.value.replace(/[^\d]/g, '');
      });
    });
  }

  addExpensesBlock() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    const cloneInputs = cloneExpensesItem.querySelectorAll('input');
    cloneInputs.forEach(function(elem) {
      elem.value = '';      //TODO ПОВТОРЯЮЩИЙСЯ КОД
      if (elem.placeholder === 'Наименование') {
        elem.addEventListener('input', function() {
          elem.value = elem.value.replace(/[^а-яА-Я\s,.]/g, '');
        });
      }
      if (elem.placeholder === 'Сумма') {
        elem.addEventListener('input', function() {
          elem.value = elem.value.replace(/[^\d]/g, '');
        });
      }
    });
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);

    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  }

  addIncomeBlock() {
    const cloneAddIncomeItem = incomeItems[0].cloneNode(true);
    const cloneInputs = cloneAddIncomeItem.querySelectorAll('input');
    cloneInputs.forEach(function(elem) {
      elem.value = '';
      if (elem.placeholder === 'Наименование') {
        elem.addEventListener('input', function() {
          elem.value = elem.value.replace(/[^а-яА-Я\s,.]/g, '');
        });
      }
      if (elem.placeholder === 'Сумма') {
        elem.addEventListener('input', function() {
          elem.value = elem.value.replace(/[^\d]/g, '');
        });
      }
    });
    incomeItems[0].parentNode.insertBefore(cloneAddIncomeItem, incomePlus);

    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  }

  getExpInc() {
    // const self = this;
    const count = item => {
      const startStr = item.className.split('-')[0];
      const itemTitle = item.querySelector(`.${startStr}-title`).value;
      const itemAmount = item.querySelector(`.${startStr}-amount`).value;
      if (itemTitle !== '' && itemAmount !== '') {
        this[startStr][itemTitle] = +itemAmount;
      }
    };

    incomeItems.forEach(count);
    expensesItems.forEach(count);

    for (const key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }

  getAddExpInc(){
    // const additionalExpenses = additionalExpensesItem.value.split(',');

    const count = (elem) => {
      const selector = elem.className.split('-')[0];
      //На основе класса общих блоков получаем название нужного массива объекта
      const array = 'add' + selector.split('_')[1][0].toUpperCase() + selector.split('_')[1].slice(1);
      const rows = elem.querySelectorAll(`.${selector}-item`); //находим все инпуты внутри
      rows.forEach((item) => {
        let value = item.value;  //получаем значения инпутов
        if (value !== '') {
          value = value.split(','); //уходим в массив, т.к. поле расходов - через запятую
          value.forEach(item => {
            item = item.trim();
            this[array].push(item[0].toUpperCase() + item.slice(1));
          });
        }
      });
    };

    addIncomeDiv.forEach(count);
    addExpensesDiv.forEach(count);
  }

  getExpensesMonth() {
    for (const key in this.expenses) {
      this.expensesMonth += this.expenses[key];
    }
  }

  getBudget() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.round(this.budgetMonth / 30);
  }

  getTargetMonth() {
    return Math.ceil(+targetAmount.value / this.budgetMonth);
  }

  getStatusIncome() {
    const budgetDay = this.budgetDay;
    if (budgetDay >= 1200) {
      return 'У Вас высокий уровень дохода';
    } else if (budgetDay >= 600 && budgetDay < 1200) {
      return 'У Вас средний уровень дохода';
    } else if (budgetDay >= 0 && budgetDay < 600) {
      return 'К сожалению, у вас уровень дохода ниже среднего';
    } else {
      return 'Что-то пошло не так';
    }
  }

  getInfoDeposit() {
    if (this.deposit) {
      do {
        this.percentDeposit = prompt('Какой годовой процент депозита?', 10);
      } while (!isNumber(this.percentDeposit));
      do {
        this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      } while (!isNumber(this.moneyDeposit));
    }
  }

  calcSavedMoney() {
    return this.budgetMonth * periodSelect.value;
  }

  eventsListeners() {
    start.addEventListener('click', appData.start.bind(appData));
    cancel.addEventListener('click', appData.reset.bind(appData));
    salaryAmount.addEventListener('input', appData.check);
    expensesPlus.addEventListener('click', appData.addExpensesBlock);
    incomePlus.addEventListener('click', appData.addIncomeBlock);

    periodSelect.addEventListener('change', function() {
      periodAmount.innerText = periodSelect.value;
    });
  }
}

const appData = new AppData();

appData.initialize();
appData.eventsListeners();
