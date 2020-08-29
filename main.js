
const root = document.querySelector('.todoapp');
const itemsList = root.querySelector('.todo__lists');
const clearCompleted = root.querySelector('.feature__item-clear');
const newTodoField = root.querySelector('.new__todo');
const all = root.querySelector('.feature__item-all');
const active = root.querySelector('.feature__item-active');
const completed = root.querySelector('.feature__item-completed');
const selectedAll = root.querySelector('.todos__select-all');
const filter = root.querySelector('.feature__filters');

filter.addEventListener('click', (event) => {
  if (!event.target.dataset.filter) {
    return;
  }

  const togglers = root.querySelectorAll('.toggle');

  for (const toggler of togglers) {
    const item = toggler.closest('.todo__list-item');

    switch(event.target.dataset.filter) {
      case 'all': {
        item.classList.remove('hidden');
        break;
      }

      case 'active': {
        if (toggler.checked) {
          item.classList.add('hidden');
        }
        break;
      }
       
      case 'completed': {
        if (!toggler.checked) {
          item.classList.add('hidden');
        }
        break;
      }
    }
  }
});

function updateInfo() {
  const counter = root.querySelector('.feature__item-left');
  const notCompletedTogglers = root.querySelectorAll('input:not(:checked)');
  const completedTogglers = root.querySelectorAll('input:checked');
  const inputs = root.querySelectorAll('.toggle');

  counter.innerHTML = `${notCompletedTogglers.length - 1} items left`
  clearCompleted.hidden = completedTogglers.length === 0;

  selectedAll.addEventListener('click', (event) => {

    if ((notCompletedTogglers.length) !== 0) {
      for (const input of inputs) {
        const item = input.closest('.todo__task');

        item.classList.add('finished');
        input.checked = true;
        counter.innerHTML = `0 items left`;
      }
    }

    updateInfo();
  });
}

clearCompleted.addEventListener('click', () => {
  const completedTogglers = root.querySelectorAll('input:checked');

  for (const toggle of completedTogglers) {
    if (toggle.checked) {
      toggle.closest('.todo__list-item').remove();
    }
  }

  updateInfo();
});

newTodoField.addEventListener('keydown', (event) => {
  const id = +new Date();

  if (event.key !== 'Enter') {
    return;
  }

  if (!newTodoField.value) {
    return;
  }

  itemsList.insertAdjacentHTML('beforeend', `
    <li class="todo__list-item">
      <div class="todo__task">
        <input id="todo-${id}" type="checkbox" class="toggle">
        <label for="todo-${id}">${newTodoField.value}</label>
      </div>
      <button class="destroy">&#10060;</button>
    </li>
  `);

  newTodoField.value = '';
  updateInfo();
});

itemsList.addEventListener('click', (event) => {
  if (!event.target.matches('.destroy')) {
    return;
  }

  event.target.closest('.todo__list-item').remove();
  updateInfo();
});

itemsList.addEventListener('change', (event) => {
  if (!event.target.matches('.toggle')) {
    return;
  }

  event.target.closest('.todo__task').classList
    .toggle('finished', event.target.checked);

  updateInfo();
});
