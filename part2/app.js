class First {
  constructor() {
  }

  hello() {
    console.log('Привет! Я метод родителя!');
  }

}

class Second extends First {
  constructor() {
    super();
  }

  hello() {
    super.hello();
    console.log('А я наследуемый метод!');
  }
}

const secondInstance = new Second();
secondInstance.hello();