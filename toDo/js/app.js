'use strict';

class TodoList {
    constructor(controls) {
        if (controls) {
            this.todoData = controls.todoData;
            this.form = controls.form;
            this.input = controls.input;
            this.todoList = controls.todoList;
            this.todoCompleted = controls.todoCompleted;
            this.todoContainer = controls.todoContainer;
        }
        this.render = this.render.bind(this);
        this.timeoutRender = this.timeoutRender.bind(this);
        this.addElement = this.addElement.bind(this);
        this.elementControllers = this.elementControllers.bind(this);
    }

    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    saveDataToLocalStorage() {
        localStorage.setItem('todoData', JSON.stringify([...this.todoData]));
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
        this.todoData.forEach((item) => {
            const li = document.createElement('li');
            li.classList.add('todo-item');
            li.setAttribute('data-key', `${item.key}`);
            li.innerHTML = `
              <span class="text-todo">${item.value}</span>
              <div class="todo-buttons">
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
                <button class="todo-edit"></button>
              </div>
            `;

            if (item.completed) {
                this.todoCompleted.append(li);
                const completed = document.querySelectorAll('.todo-completed > li');
                li.setAttribute('data-counter', completed.length + ')');
            } else {
                this.todoList.append(li);
                const todoList = document.querySelectorAll('.todo-list > li');
                li.setAttribute('data-counter', todoList.length + ')');
            }
        });

    }

    editItem(target) {
        const li = target.closest('.todo-item');
        const editBtn = target.closest('.todo-edit');
        const key = li.dataset.key;
        const textField = li.querySelector('.text-todo');
        if (textField.hasAttribute('contentEditable')) {
            textField.removeAttribute('contentEditable');
            textField.classList.remove('focused');
            editBtn.classList.remove('js-bordered');
            this.todoData.get(key).value = textField.innerText;
            this.saveDataToLocalStorage();
            this.render();
        } else {
            textField.setAttribute("contentEditable", true);
            textField.focus();
            textField.classList.add('focused');
            editBtn.classList.add('js-bordered');
            document.execCommand('selectAll', false, null);
            document.getSelection().collapseToEnd();
            textField.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.todoData.get(key).value = textField.innerText;
                    this.saveDataToLocalStorage();
                    this.render();
                }
            });
        }

        //Завершение редактирования по клику вне поля
        // document.addEventListener('click', e => {
        //     if (!li.matches(e.target)) {
        //         textField.removeAttribute('contentEditable');
        //     }
        // });
    }

    deleteItem(target) {
        const li = target.closest('.todo-item');
        const key = li.dataset.key;
        this.todoData.delete(key);
        this.saveDataToLocalStorage();
        li.classList.add('delete');
        this.timeoutRender();
    }

    completedItem(target) {
        const li = target.closest('.todo-item');
        const key = li.dataset.key;
        this.todoData.get(key).completed = !this.todoData.get(key).completed;
        this.saveDataToLocalStorage();

        //animation
        if (target.closest('.todo-list')) {
            li.classList.add('done');
        } else if (target.closest('.todo-completed')) {
            li.classList.add('undone');
        }

        this.timeoutRender();
    }

    addElement(e) {
        e.preventDefault();

        const newTodo = {
            value: this.input.value.trim(),
            completed: false,
            key: this.generateKey(),
        };

        if (newTodo.value) {
            newTodo.value = newTodo.value[0].toUpperCase() + newTodo.value.slice(1);
            this.todoData.set(newTodo.key, newTodo);
            this.saveDataToLocalStorage();
            this.input.value = '';
            this.render();
        } else {
            alert('Похоже Вы забыли ввести задачу!');
        }
    }

    elementControllers(e) {
        let target = e.target;

        if (target.closest('.todo-remove')) {
            this.deleteItem(target);
        } else if (target.closest('.todo-complete')) {
            this.completedItem(target);
        } else if (target.closest('.todo-edit')) {
            this.editItem(target);
        }
    }

    handler() {
        this.form.addEventListener('submit', this.addElement);
        this.todoContainer.addEventListener('click', this.elementControllers);
    }

    init() {
        this.handler();
        this.render();
    }
}

const todo = new TodoList(
    {
        todoData: localStorage.getItem('todoData') ?
            new Map(JSON.parse(localStorage.getItem('todoData'))) :
            new Map(),
        form: document.querySelector('.todo-control'),
        input: document.querySelector('.header-input'),
        todoList: document.querySelector('.todo-list'),
        todoCompleted: document.querySelector('.todo-completed'),
        todoContainer: document.querySelector('.todo-container'),
    }
);

todo.init();
