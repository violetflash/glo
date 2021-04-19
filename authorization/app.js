'use strict';

const authorizer = {
  titleName: document.querySelector('#username'),
  registerBtn: document.querySelector('#registerUser'),
  loginBtn: document.querySelector('#login'),
  list: document.querySelector('#list'),
  accounts: localStorage.getItem('accounts') ?
    JSON.parse(localStorage.getItem('accounts')) :
    {
      currentUser:'',
      users: [],
    },

  getUserInfo(target, pattern, message, errorMessage) {
    let result = prompt(message);
    if (!result) {
      return alert('Тогда пока!');
    }

    if (!pattern.test(result.trim())) {
      alert(errorMessage);
      this.getUserInfo(target, pattern, message, errorMessage);
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
    this.getUserInfo('fullName', pattern, message, errorMessage);
  },

  getLogin() {
    const pattern = /^[\w-]+$/g;
    const message = 'Введите Ваш Логин:';
    const errorMessage = 'Ошибка! Введите Ваш логин Латиницей без пробелов!';
    this.getUserInfo('login', pattern, message, errorMessage);
  },

  getPassword() {
    const pattern = /.+/g;
    const message = 'Введите Ваш Пароль:';
    const errorMessage = 'Что-то пошло не так';
    this.getUserInfo('password', pattern, message, errorMessage);
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
    this.getName(); //запрашиваем имя, записываем в объект
    if (this.fullName) { //если не была нажата отмена и имя записано
      this.getLogin(); // то запрашиваем логин и записываем в объект
    }
    if (this.login) { // если не была нажата отмена и логин был записан
      this.getPassword(); //спрашиваем пароль и записываем в объект
      if (this.password) { //если не была нажата отмена и пароль был записан в объект
        const fullName = this.fullName.toLowerCase().split(' ');
        const account = {
          firstName: fullName[0][0].toUpperCase() + fullName[0].slice(1),
          lastName: fullName[1][0].toUpperCase() + fullName[1].slice(1),
          login: this.login,
          password: this.password,
          time: this.getTime(),
        };
        this.accounts.users.push(account);
        localStorage.setItem('accounts', JSON.stringify(this.accounts));
        this.render();
      }
    }
  },

  render() {
    this.titleName.innerText = this.accounts.currentUser ? this.accounts.currentUser : 'Аноним';
    const self = this;
    this.list.innerHTML = '';
    this.accounts.users.forEach(function (account, index) {
      const li = document.createElement('li');
      li.className = 'row';
      li.style.cssText = 'width: 100%; padding: 10px 0; border-bottom: 1px solid #ccc;';
      li.innerHTML = `${index + 1}) ${account.firstName} ${account.lastName}, ${account.time}`;
      const delBtn = document.createElement('button');
      delBtn.style.cssText = 'margin: 0 0 0 15px';
      delBtn.innerText = 'Удалить';
      delBtn.addEventListener('click', function(){
        if (self.accounts.currentUser === account.firstName) {
          self.accounts.currentUser = '';
        }
        self.accounts.users.splice(index, 1);
        localStorage.setItem('accounts', JSON.stringify(self.accounts));
        self.render();
      });
      li.append(delBtn);
      self.list.append(li);
    });
    this.resetUserInfo();
  },

  checkLogin() {
    for (const key in this.accounts.users) {
      if (this.login === this.accounts.users[key].login) {
        return true;
      }
    }
  },

  checkPassword() {
    for (const key in this.accounts.users) {
      if (this.login === this.accounts.users[key].login && this.password === this.accounts.users[key].password) {
        return true;
      }
    }
  },

  authorization() { //TODO этой жути требуется рефакторинг, если он возможен в данной концепции
    this.getLogin(); //запрашиваем логин и записываем его в объект для проверки
    if (this.login) { // если при вводе логина не нажата ОТМЕНА
      if (this.checkLogin()) { // если такой логин существует в базе
        this.getPassword(); // запрашиваем пароль
        if (this.password) {
          if (this.checkPassword()) { //если подходит, то приветствуем
            for (const key in this.accounts.users) {
              if (this.login === this.accounts.users[key].login) {
                this.accounts.currentUser = this.accounts.users[key].firstName;
                localStorage.setItem('accounts', JSON.stringify(this.accounts));
                this.render();
                // this.titleName.innerText = this.accounts[key].firstName;
              }
            }
          } else {
            this.resetUserInfo();
            return alert('Неверный пароль');
          }
        }
      } else {
        this.resetUserInfo(); //если логин не существует, удаляем
        return alert('Такой пользователь не зарегистрирован!');
      }
    }
  },

  initialize() {
    this.render();
    this.registerBtn.addEventListener('click', function() {this.setAccount();}.bind(authorizer));
    this.loginBtn.addEventListener('click', function() {this.authorization();}.bind(authorizer));
  },
};

authorizer.initialize();