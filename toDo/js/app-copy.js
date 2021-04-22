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
      if (li.classList.contains('done')) {
        li.classList.remove('done');
        li.classList.add('undone');
      } else {
        li.classList.add('done');
        li.classList.remove('undone');
      }
      // li.classList.contains('done') ? li.classList.add('undone') : li.classList.add('done');
      // render();
      setTimeout(render, 300);
    });

    const todoRemove = li.querySelector('.todo-remove');
    todoRemove.addEventListener('click', () => {
      todoData.splice(index,  1);
      localStorage.setItem('todoData', JSON.stringify(todoData));
      li.classList.add('delete');
      setTimeout(render, 300);
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
        li.addEventListener('keypress', function(e) {
          if (e.key === 'Enter') {
            item.value = li.innerText;
            localStorage.setItem('todoData', JSON.stringify(todoData));
            render();
          }
        });
      }
    });

    document.addEventListener('click', e => {
      if (!li.contains(e.target)) {
        li.removeAttribute('contentEditable');
      }
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
    newTodo.value = newTodo.value[0].toUpperCase() + newTodo.value.slice(1);
    todoData.push(newTodo);
  }
  localStorage.setItem('todoData', JSON.stringify(todoData));
  headerInput.value = '';
  render();
});

render();