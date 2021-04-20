'use strict';

//Кнопку "Рассчитать" через id
const start = document.getElementById('start'),
  cancel = document.querySelector('#cancel'),
  incomePlus = document.getElementsByTagName('button')[0],
  expensesPlus = document.getElementsByTagName('button')[1],
  checkDeposit = document.querySelector('#deposit-check'),
  addIncomeItems = document.querySelectorAll('.additional_income-item'),
  addIncomeDiv = document.querySelectorAll('.additional_income'),
  addExpensesDiv = document.querySelectorAll('.additional_expenses'),
  results = document.querySelectorAll('.result-total'),
  budgetMonth = document.getElementsByClassName('result-total')[0],
  budgetDay = document.getElementsByClassName('result-total')[1],
  expensesMonth = document.getElementsByClassName('result-total')[2],
  additionalIncome = document.getElementsByClassName('result-total')[3],
  additionalExpensesValue = document.getElementsByClassName('result-total')[4],
  incomePeriod = document.getElementsByClassName('result-total')[5],
  targetMonth = document.getElementsByClassName('result-total')[6],
  salaryAmount = document.querySelector('.salary-amount'),
  expensesTitle = document.querySelector('.expenses-title'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select'),
  periodAmount = document.querySelector('.period-amount'),
  nameInputs = document.querySelectorAll("input[placeholder='Наименование']"),
  digitInputs = document.querySelectorAll("input[placeholder='Сумма']"),
  depositBank = document.querySelector('.deposit-bank'),
  depositAmount = document.querySelector('.deposit-amount'),
  depositPercent = document.querySelector('.deposit-percent');

let incomeItems = document.querySelectorAll('.income-items');
let expensesItems = document.querySelectorAll('.expenses-items');

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
    this.getAddExpInc();
    this.getExpInc();
    this.getExpensesMonth();
    this.getInfoDeposit();

    this.getBudget();
    this.showResult();

    start.style.display = 'none';
    cancel.style.display = 'inline-block';
    const textInputs = document.querySelectorAll('input[type="text"]');
    [checkDeposit, depositBank, expensesPlus, incomePlus, ...textInputs].forEach(function(elem) {
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

    const textInputs = document.querySelectorAll('input[type="text"]');
    [checkDeposit, depositBank, expensesPlus, incomePlus, ...textInputs].forEach(function(elem) {
      if (elem.type === "text") {
        elem.value = '';
      }
      if (elem.type === 'checkbox') {
        elem.checked = false;
      }
      if (elem.type === 'select-one') {
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
    depositBank.style.display = 'none';
    depositAmount.style.display = 'none';
    depositPercent.style.display = 'none';

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
    this.eventsListeners();
  }

  addExpIncBlock() {
    const selector = this.className.split(' ')[1].split('_')[0];
    let items = document.querySelectorAll(`.${selector}-items`);
    const cloneItem = items[0].cloneNode(true);
    const cloneInputs = cloneItem.querySelectorAll('input');
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

    items[0].parentNode.insertBefore(cloneItem, this);

    items = document.querySelectorAll(`.${selector}-items`);
    if (items.length === 3) {
      this.style.display = 'none';
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
    incomeItems = document.querySelectorAll('.income-items');
    expensesItems = document.querySelectorAll('.expenses-items');
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
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
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

  calcSavedMoney() {
    return this.budgetMonth * periodSelect.value;
  }

  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }

  changePercent() {
    const selectValue = this.value;
    console.log(this.type);
    const validatePercent = function() {
      depositPercent.value = depositPercent.value.replace(/[^\d]/g, '');
    };
    const checkPercent = function() {
      if (depositPercent.value > 100) {
        alert('Введите число от 1 до 100!');
        depositPercent.value = '';
        depositPercent.focus();
      }
    };
    if (selectValue === 'other') {
      depositPercent.style.display = 'inline-block';
      depositPercent.addEventListener('input', validatePercent);
      depositPercent.addEventListener('blur', checkPercent);
      //домашка
    } else {
      depositPercent.style.display = 'none';
      depositPercent.removeEventListener('input', validatePercent);
      depositPercent.removeEventListener('blur', checkPercent);
      depositPercent.value = selectValue;
    }
  }

  depositHandler() {
    if (checkDeposit.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';

      depositBank.value = '';
      depositAmount.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);

    }
  }

  eventsListeners() {
    start.addEventListener('click', this.start.bind(this));
    cancel.addEventListener('click', this.reset.bind(this));
    salaryAmount.addEventListener('input', this.check);
    expensesPlus.addEventListener('click', this.addExpIncBlock);
    incomePlus.addEventListener('click', this.addExpIncBlock);

    periodSelect.addEventListener('change', function() {
      periodAmount.innerText = periodSelect.value;
    });

    checkDeposit.addEventListener('change', this.depositHandler.bind(this));
  }
}

const appData = new AppData();

appData.initialize();