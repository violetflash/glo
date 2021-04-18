'use strict';

const authorizer = {
  titleName: document.querySelector('#username'),
  registerBtn: document.querySelector('#registerUser'),
  loginBtn: document.querySelector('#login'),
  list: document.querySelector('#list'),
  accounts: localStorage.getItem('accounts') ?
    JSON.parse(localStorage.getItem('accounts')) :
    [
      {currentUser:''},
      {users: []},
    ],
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
    this.user = '';
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
    console.log(this);
  },

  getPassword() {
    const pattern = /.+/g;
    const message = 'Введите Ваш Пароль:';
    const errorMessage = 'Что-то пошло не так';
    authorizer.getUserInfo('password', pattern, message, errorMessage);
    console.log(this);
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
        lastName: this.fullName.split(' ')[1][0].toUpperCase() + this.fullName.split(' ')[1].slice(1),
        login: this.login,
        password: this.password,
        time: this.getTime(),
      };
      this.accounts.push(account);
      localStorage.setItem('accounts', JSON.stringify(this.accounts));
      this.render();
    }
  },

  render() {
    const self = this;
    this.list.innerHTML = '';
    this.accounts.forEach(function (account, index) {
      const li = document.createElement('li');
      li.className = 'row';
      li.style.cssText = 'width: 100%; padding: 10px 0; border-bottom: 1px solid #ccc;';
      li.innerHTML = `${index + 1}) ${account.firstName} ${account.lastName}, ${account.time}`;
      const delBtn = document.createElement('button');
      delBtn.className = 'delete';
      delBtn.style.cssText = 'margin: 0 0 0 15px';
      delBtn.innerText = 'Удалить';
      delBtn.addEventListener('click', function(){
        self.accounts.splice(index, 1);
        localStorage.setItem('accounts', JSON.stringify(self.accounts));
        self.render();
      });
      li.append(delBtn);
      self.list.append(li);
    });
    this.titleName.innerText = self.user ? self.user : 'Аноним';
  },

  checkLogin() {
    for (const key in this.accounts) {
      if (this.login === this.accounts[key].login) {
        return true;
      }
      console.log(this.accounts[key]);
    }
  },

  checkPassword() {
    for (const key in this.accounts) {
      if (this.password === this.accounts[key].password) {
        return true;
      }
    }
  },

  authorization() { //TODO этой жути требуется рефакторинг
    this.getLogin(); //запрашиваем логин и записываем его в объект для проверки
    console.log(this);
    if (this.login) { // если при вводе логина не нажата ОТМЕНА
      if (this.checkLogin()) { // если такой логин существует в базе
        this.getPassword(); // запрашиваем пароль
        if (this.password) {
          if (this.checkPassword()) { //если подходит, то приветствуем
            for (const key in this.accounts) {
              if (this.login === this.accounts[key].login) {
                this.user = this.accounts[key].firstName;
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
    this.registerBtn.addEventListener('click', function(e) {
      this.setAccount();
      this.resetUserInfo();
      console.log(this.accounts);
    }.bind(authorizer));
    this.loginBtn.addEventListener('click', function(e) {
      this.authorization();
      // this.resetUserInfo();
      console.log(this.accounts);
      console.log(this);
    }.bind(authorizer));
    this.render();
  },
};

authorizer.initialize();
