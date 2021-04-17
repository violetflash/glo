'use strict';

const authorizer = {
  titleName: document.querySelector('#username'),
  registerBtn: document.querySelector('#registerUser'),
  loginBtn: document.querySelector('#login'),
  list: document.querySelector('.list'),
  accounts: localStorage.getItem('accounts') ?
    JSON.parse(localStorage.getItem('accounts')) :
    [],
  fullName: '',
  login: '',
  password: '',


  getUserInfo(target, pattern, message, errorMessage) {
    let result = prompt(message);
    if (!result) {
      return alert('Тогда пока!');
    }

    if (!pattern.test(result.trim())) {
      alert(errorMessage);
      authorizer.getUserInfo(target, pattern, message, errorMessage);
    } else {
      this[target] = result.trim();
    }
  },

  resetUserInfo() {
    this.fullName = '';
    this.login = '';
    this.password = '';
  },

  getName() {
    const pattern = /^[a-zA-Zа-яА-я]{2,} [a-zA-Zа-яА-я]{2,}$/g;
    const message = 'Введите Ваше Имя и Фамилию через пробел:';
    const errorMessage = 'Ошибка! Введите Ваше Имя и Фамилию через пробел';
    authorizer.getUserInfo('fullName', pattern, message, errorMessage);
  },

  getLogin() {
    const pattern = /^[\w-]+$/g;
    const message = 'Введите Ваш Логин:';
    const errorMessage = 'Ошибка! Введите Ваш логин Латиницей без пробелов!';
    authorizer.getUserInfo('login', pattern, message, errorMessage);
  },

  getPassword() {
    const pattern = /.+/g;
    const message = 'Введите Ваш Пароль:';
    const errorMessage = 'Что-то пошло не так';
    authorizer.getUserInfo('password', pattern, message, errorMessage);
  },

  getTime() {
    let today = new Date();
    let month = today.getMonth();
    let monthWord = '';
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();

    function checkZero(num) {
      return ( num < 10 ) ? `0${num}` : num;
    }

    switch (month) {
      case 0: {
        monthWord = 'Января';
        break;
      }
      case 1: {
        monthWord = 'Февраля';
        break;
      }
      case 2: {
        monthWord = 'Марта';
        break;
      }
      case 3: {
        monthWord = 'Апреля';
        break;
      }
      case 4: {
        monthWord = 'Мая';
        break;
      }
      case 5: {
        monthWord = 'Июня';
        break;
      }
      case 6: {
        monthWord = 'Июля';
        break;
      }
      case 7: {
        monthWord = 'Августа';
        break;
      }
      case 8: {
        monthWord = 'Сентября';
        break;
      }
      case 9: {
        monthWord = 'Октября';
        break;
      }
      case 10: {
        monthWord = 'Ноября';
        break;
      }
      case 11: {
        monthWord = 'Декабря';
        break;
      }
    }

    return `${today.getDate()} ${monthWord} ${today.getFullYear()} г., ${checkZero(hours)}:${checkZero(minutes)}:${checkZero(seconds)}`;
  },

  setAccount() {
    this.getName();
    if (this.fullName) {
      this.getLogin();
    }
    if (this.login) {
      this.getPassword();
      const account = {
        firstName: this.fullName.split(' ')[0][0].toUpperCase() + this.fullName.split(' ')[0].slice(1),
        lastName: this.fullName.split(' ')[1][0].toUpperCase() + this.fullName.split(' ')[0].slice(1),
        login: this.login,
        time: this.getTime(),
      };
      this.accounts.push(account);
      localStorage.setItem('accounts', JSON.stringify(this.accounts));
      this.resetUserInfo();
    }
  },

  initialize() {
    console.log(this.accounts);
    this.registerBtn.addEventListener('click', function(e) {
      this.setAccount();
      console.log(this.accounts);
    }.bind(authorizer));
  },
};

authorizer.initialize();
