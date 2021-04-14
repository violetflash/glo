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
    li.innerHTML = `
      <span class="text-todo">${item.value}</span>
      <div class="todo-buttons">
        <button class="todo-remove"></button>
        <button class="todo-complete"></button>
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
      render();
    });

    const todoRemove = li.querySelector('.todo-remove');
    todoRemove.addEventListener('click', () => {
      todoData.splice(index,  1);
      localStorage.setItem('todoData', JSON.stringify(todoData));
      render();
    });

  });
};

todoControl.addEventListener('submit', (e) => {
  e.preventDefault();

  const newTodo = {
    value: headerInput.value.trim(),
    completed: false,
  };
  if (newTodo.value) todoData.push(newTodo);
  localStorage.setItem('todoData', JSON.stringify(todoData));
  headerInput.value = '';
  render();
});

render();