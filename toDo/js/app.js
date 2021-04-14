'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

const todoData = localStorage.getItem('todoData') ?
  JSON.parse(localStorage.getItem('todoData')):
  [];


const render = function() {
  todoList.innerHTML = '';
  todoCompleted.innerHTML = '';
  todoData.forEach((item, index) => {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.setAttribute('data-counter', `${index + 1})`);
    li.innerHTML = `
      <span class="text-todo">${item.value}</span>
      <div class="todo-buttons">
        <button class="todo-remove"></button>
        <button class="todo-complete"></button>
        <button class="todo-edit"></button>
      </div>
    `;

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    const todoComplete = li.querySelector('.todo-complete');
    todoComplete.addEventListener('click', () => {
      item.completed = !item.completed;
      localStorage.setItem('todoData', JSON.stringify(todoData));
      render();
    });

    const todoRemove = li.querySelector('.todo-remove');
    todoRemove.addEventListener('click', () => {
      todoData.splice(index,  1);
      localStorage.setItem('todoData', JSON.stringify(todoData));
      render();
    });

    const todoEdit = li.querySelector('.todo-edit');
    todoEdit.addEventListener('click', function(e) {
      if (li.hasAttribute('contentEditable')) {
        li.removeAttribute('contentEditable');
        item.value = li.innerText;
        localStorage.setItem('todoData', JSON.stringify(todoData));
        render();
      } else {
        li.setAttribute("contentEditable", true);
        li.focus();
        li.addEventListener('keyup', function(e) {
          if (e.key === 'Enter') {
            item.value = li.innerText;
            localStorage.setItem('todoData', JSON.stringify(todoData));
            render();
          }
        });
      }

      // const span = li.querySelector('.text-todo');
      // const input = document.createElement('input');
      // input.classList.add('edit-input');
      // input.value = span.textContent;
      //
      // input.focus();
      // span.innerHTML = '';
      // span.insertAdjacentElement('afterbegin', input);
    });
  });
};

todoControl.addEventListener('submit', (e) => {
  e.preventDefault();

  const newTodo = {
    value: headerInput.value.trim(),
    completed: false,
  };
  if (newTodo.value) {
    todoData.push(newTodo);
  }
  localStorage.setItem('todoData', JSON.stringify(todoData));
  headerInput.value = '';
  render();
});

render();