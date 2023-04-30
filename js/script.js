const form = document.querySelector('.form-task');
const taskInput = document.querySelector('#new-task');
const taskList = document.querySelector('.task-list .container');
const taskDescriptionInput = document.querySelector('#new-task-description');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  taskadd(taskInput.value, taskDescriptionInput.value);
  taskInput.value = '';
  taskDescriptionInput.value = '';
});

function taskadd(task, description) {
  const taskItem = document.createElement('div');
  taskItem.classList.add('task-item');

  if (!task || !description) {
    return;
  }

  // Verifica se a tarefa já existe na lista, e retorna sem adicionar a tarefa caso já exista
  const existingTasks = document.querySelectorAll('.task-item p');
  for (let i = 0; i < existingTasks.length; i++) {
    if (existingTasks[i].textContent === task) {
      return;
    }
  }

  const taskCheckbox = document.createElement('input');
  taskCheckbox.setAttribute('type', 'checkbox');
  taskCheckbox.setAttribute('name', 'completed');
  taskItem.appendChild(taskCheckbox);

  const taskText = document.createElement('p');
  taskText.textContent = task;
  taskItem.appendChild(taskText);

  const taskDescription = document.createElement('p');
  taskDescription.classList.add('task-description');
  taskDescription.textContent = description;
  taskItem.appendChild(taskDescription);

  const taskEditButton = document.createElement('button');
  taskEditButton.classList.add('button');
  taskEditButton.innerHTML = '<i class="material-symbols-outlined">edit</i>';
  taskEditButton.addEventListener('click', function () {
    editTask(taskItem);
  });
  taskItem.appendChild(taskEditButton);

  const taskDeleteButton = document.createElement('button');
  taskDeleteButton.classList.add('button');
  taskDeleteButton.innerHTML = '<i class="material-symbols-outlined">delete</i>';
  taskDeleteButton.addEventListener('click', function () {
    deleteTask(taskItem);
  });
  taskItem.appendChild(taskDeleteButton);

  taskList.appendChild(taskItem);
}

function clearFields() {
  taskInput.value = '';
  taskDescriptionInput.value = '';
}

function handleAddTaskClick() {
  const task = taskInput.value;
  const description = taskDescriptionInput.value;
  taskadd(task, description);
  clearFields();
}

function editTask(taskItem) {
  if (!taskItem) {
    return;
  }
  const taskText = taskItem.querySelector('p');
  if (!taskText) {
    return;
  }
  const taskDescription = taskItem.querySelector('.task-description');
  if (!taskDescription) {
    return;
  }

  const taskEditTextbox = document.createElement('input');

  taskEditTextbox.classList.add('form-task-input');
  taskEditTextbox.setAttribute('type', 'text');
  taskEditTextbox.value = taskText.textContent;
  taskItem.replaceChild(taskEditTextbox, taskText);

  const descriptionEditTextarea = document.createElement('textarea');
  descriptionEditTextarea.classList.add('form-task-input');
  descriptionEditTextarea.style.height = taskDescription.clientHeight + "px";
  descriptionEditTextarea.value = taskDescription.textContent;
  taskItem.replaceChild(descriptionEditTextarea, taskDescription);

  const taskEditButton = taskItem.querySelector('.button:first-of-type');
  taskEditButton.innerHTML = '<i class="material-symbols-outlined">save</i>';
  taskEditButton.removeEventListener('click', onEditButtonClick);
  function onEditButtonClick() {
    editTask(taskItem);
  }
  taskEditButton.addEventListener('click', function () {
    saveTask(taskItem, taskEditTextbox.value, descriptionEditTextarea.value);
  });
  taskEditButton.addEventListener('click', onEditButtonClick);
}

function saveTask(taskItem, newTaskText, newTaskDescription) {
  if (!newTaskText || !newTaskDescription || !taskItem) {
    return;
  }

  const taskText = document.createElement('p');
  taskText.textContent = newTaskText;
  taskItem.replaceChild(taskText, taskItem.querySelector('.form-task-input'));

  const taskDescriptionElem = taskItem.querySelector('.task-description'); // armazena a referência para o elemento taskDescription
  const taskDescription = document.createElement('p');
  taskDescription.classList.add('task-description');
  taskDescription.innerHTML = newTaskDescription; // Use innerHTML em vez de textContent

  taskItem.replaceChild(taskDescription, taskDescriptionElem); // Substituir textarea por p, usando a referência armazenada acima

  const taskEditButton = taskItem.querySelector('.button:first-of-type');
  taskEditButton.innerHTML = '<i class="material-symbols-outlined">edit</i>';
  taskEditButton.removeEventListener('click', onEditButtonClick);
  taskEditButton.addEventListener('click', onEditButtonClick);

  function onEditButtonClick() {
    editTask(taskItem);
  }
}

function deleteTask(taskItem) {
  taskItem.remove();
}