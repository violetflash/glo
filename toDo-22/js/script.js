'use strict';
class Todo {
    constructor(form, input, todoList, todoCompleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map();
    }

    addToStorage() {
        localStorage.setItem('todoData', JSON.stringify([...this.todoData]));
    }

    render() {
        console.log(this);
        this.clearLists();
        this.todoData.forEach(this.createElement.bind(this));
    }

    clearLists() {
        this.todoList.innerHTML = '';
        this.todoCompleted.innerHTML = '';
    }

    createElement(todoItem) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = `
          <span class="text-todo">${todoItem.value}</span>
          <div class="todo-buttons">
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
            <button class="todo-edit"></button>
          </div>
        `;

        if (todoItem.complete) {
            this.todoCompleted.append(li);
            //Enumerates completed li's
            const completed = document.querySelectorAll('.todo-completed > li');
            li.setAttribute('data-counter', completed.length + ')');
        } else {
            this.todoList.append(li);
            //Enumerates uncompleted li's
            const todoList = document.querySelectorAll('.todo-list > li');
            li.setAttribute('data-counter', todoList.length + ')');
        }

    }

    addTodo(e) {
        e.preventDefault();
        if (this.input.value.trim()) {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            };
            this.todoData.set(newTodo.key, newTodo);
            this.render();
        }
    }

    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
    }

}

const toDo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

toDo.init();
