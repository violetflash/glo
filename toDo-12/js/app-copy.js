'use strict';

class TodoList {
  constructor(controls) {
    if (controls) {
      this.todoData = controls.todoData;
      this.form = controls.form;
      this.input = controls.input;
      this.todoList = controls.todoList;
      this.todoCompleted = controls.todoCompleted;
      this.render = this.render.bind(this);
      this.timeoutRender = this.timeoutRender.bind(this);
    }
  }

  saveDataToLocalStorage() {
    localStorage.setItem('todoData', JSON.stringify(this.todoData));
  }

  clearLists() {
    this.todoList.innerHTML = '';
    this.todoCompleted.innerHTML = '';
  }

  timeoutRender() {
    setTimeout(this.render, 300);
  }

  render() {
    this.clearLists();
    this.todoData.forEach((item, index) => {
      const li = document.createElement('li');
      li.classList.add('todo-item');
      li.setAttribute('data-counter', `${index + 1})`);
      li.innerHTML = `
                  <span class="text-todo">${item.value}</span>
                  <div class="todo-buttons">
                    <button class="todo-remove"></button>
                    <button class="todo-complete"></button>
                    <button class="todo-edit"></button>
                  </div>`;

      if (item.completed) {
        this.todoCompleted.append(li);
      } else {
        this.todoList.append(li);
      }

      const todoComplete = li.querySelector('.todo-complete');
      this.completedItem(todoComplete, li, item);

      const todoRemove = li.querySelector('.todo-remove');
      this.deleteItem(todoRemove, li, index);

      const todoEdit = li.querySelector('.todo-edit');
      this.editItem(todoEdit, li, item);
    });
  }

  handler() {

  }

  editItem(editButton, li, currentItem) {
    editButton.addEventListener('click', (e) => {
      if (li.hasAttribute('contentEditable')) {
        li.removeAttribute('contentEditable');
        currentItem.value = li.innerText;
        localStorage.setItem('todoData', JSON.stringify(this.todoData));
        this.render();
      } else {
        li.setAttribute("contentEditable", true);
        li.focus();
        li.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            currentItem.value = li.innerText;
            this.saveDataToLocalStorage();
            this.render();
          }
        });
      }
    });

    document.addEventListener('click', e => {
      if (!li.contains(e.target)) {
        li.removeAttribute('contentEditable');
      }
    });
  }

  deleteItem(deleteButton, li, index) {
    deleteButton.addEventListener('click', () => {
        this.todoData.splice(index, 1);
        this.saveDataToLocalStorage();
        li.classList.add('delete');
        this.timeoutRender();
    });
  }

  completedItem(completeButton, li, currentItem) {
    completeButton.addEventListener('click', () => {
      currentItem.completed = !currentItem.completed;
      this.saveDataToLocalStorage();
      // if (li.classList.contains('done')) {
      //   li.classList.remove('done');
      //   li.classList.add('undone');
      // } else {
      //   li.classList.add('done');
      //   li.classList.remove('undone');
      // }
      // li.classList.contains('done') ? li.classList.add('undone') : li.classList.add('done');
      // render();
      this.timeoutRender();
    });
  }

  eventListeners() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();

      const newTodo = {
        value: this.input.value.trim(),
        completed: false,
      };
      if (newTodo.value) {
        newTodo.value = newTodo.value[0].toUpperCase() + newTodo.value.slice(1);
        this.todoData.push(newTodo);
      }
      this.saveDataToLocalStorage();
      this.input.value = '';
      this.render();
    });

  }

  initialize() {
    this.render();
    this.eventListeners();
  }
}

const todo1 = new TodoList(
    {
      todoData: localStorage.getItem('todoData') ?
          JSON.parse(localStorage.getItem('todoData')) :
          [],
      form: document.querySelector('.todo-control'),
      input: document.querySelector('.header-input'),
      todoList: document.querySelector('.todo-list'),
      todoCompleted: document.querySelector('.todo-completed'),
    }
);

todo1.initialize();
