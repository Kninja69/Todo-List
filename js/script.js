const form = document.querySelector('.form-task');
const taskInput = document.querySelector('#new-task');
const taskList = document.querySelector('.task-list .container');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const newTask = taskInput.value.trim();
  if (newTask !== '') {
    taskadd(newTask);
    taskInput.value = '';
  }
});

function taskadd(task) {
  if (task.trim() !== '') {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');

    const taskCheckbox = document.createElement('input');
    taskCheckbox.setAttribute('type', 'checkbox');
    taskCheckbox.setAttribute('name', 'completed');
    taskItem.appendChild(taskCheckbox);

    const taskText = document.createElement('p');
    taskText.textContent = task;
    taskItem.appendChild(taskText);

    const taskEditButton = document.createElement('button');
    taskEditButton.classList.add('button');
    taskEditButton.innerHTML = '<i class="material-symbols-outlined">edit</i>';
    taskEditButton.addEventListener('click', function() {
      editTask(taskItem);
    });
    taskItem.appendChild(taskEditButton);

    const taskDeleteButton = document.createElement('button');
    taskDeleteButton.classList.add('button');
    taskDeleteButton.innerHTML = '<i class="material-symbols-outlined">delete</i>';
    taskDeleteButton.addEventListener('click', function() {
      deleteTask(taskItem);
    });
    taskItem.appendChild(taskDeleteButton);

    taskList.appendChild(taskItem);
  }
}

function editTask(taskItem) {
  const taskText = taskItem.querySelector('p');
  if (taskText) { // adiciona verificação
    const taskEditTextbox = document.createElement('input');
    taskEditTextbox.classList.add('form-task-input');
    taskEditTextbox.setAttribute('type', 'text');
    taskEditTextbox.value = taskText.textContent;
    taskItem.replaceChild(taskEditTextbox, taskText);

    const taskEditButton = taskItem.querySelector('.button:first-of-type');
    taskEditButton.innerHTML = '<i class="material-symbols-outlined">save</i>';
    taskEditButton.removeEventListener('click', function() {
      editTask(taskItem);
    });
    taskEditButton.addEventListener('click', function() {
      saveTask(taskItem, taskEditTextbox.value);
    });
  }
}

function saveTask(taskItem, newTaskText) {
  const taskText = taskItem.querySelector('.form-task-input');
  const newTask = newTaskText.trim();
  if (newTask !== '') {
    const taskP = document.createElement('p');
    taskP.textContent = newTask;
    taskItem.replaceChild(taskP, taskText);
  } else {
    taskItem.removeChild(taskText);
  }

  const taskEditButton = taskItem.querySelector('.button:first-of-type');
  taskEditButton.innerHTML = '<i class="material-symbols-outlined">edit</i>';
  taskEditButton.removeEventListener('click', function() {
    saveTask(taskItem, newTaskText);
  });
  taskEditButton.addEventListener('click', function() {
    editTask(taskItem);
  });
}

function deleteTask(taskItem) {
  taskItem.remove();
}