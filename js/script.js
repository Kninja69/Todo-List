const form = document.querySelector('.form-task');
const taskInput = document.querySelector('#new-task');
const clearButton = document.getElementById("clear-button");
const clenInput = document.getElementById("new-task");
const taskList = document.querySelector('.task-list .container');
const border = document.querySelector('.Secont');
const createTaskButton = document.querySelector('#create-task-button');
const taskItems = taskList.querySelectorAll('.task-item');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const newTask = taskInput.value.trim();
  if (newTask !== '') {
    taskadd(newTask);
    taskInput.value = '';
    updateTaskList();
  }
});

clearButton.addEventListener("click", () => {
  clenInput.value = "";
});

function updateTaskList() {
  const taskItems = taskList.querySelectorAll('.task-item');
  if (taskItems.length > 0) {
    border.classList.add('bordersty');
  } else {
    border.classList.remove('bordersty');
  }
}

function taskadd(task) {
  if (task.trim() !== '') {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');

    border.classList.add('bordersty');

    const taskCheckbox = document.createElement('input');
    taskCheckbox.classList.add('checkboxsty');
    taskCheckbox.setAttribute('type', 'checkbox');
    taskCheckbox.setAttribute('name', 'completed');
    taskItem.appendChild(taskCheckbox);

    const taskText = document.createElement('p');
    taskText.classList.add('psty');
    taskText.textContent = task;
    taskItem.appendChild(taskText);

    const taskEditButton = document.createElement('button');
    taskEditButton.classList.add('button');
    taskEditButton.innerHTML = '<i class="material-symbols-outlined editbtnsty">edit</i>';
    taskEditButton.addEventListener('click', function() {
      editTask(taskItem);
    });
    taskItem.appendChild(taskEditButton);

    const taskDeleteButton = document.createElement('button');
    taskDeleteButton.classList.add('button');
    taskDeleteButton.innerHTML = '<i class="material-symbols-outlined btnsty">delete</i>';
    taskDeleteButton.addEventListener('click', function() {
      deleteTask(taskItem);
    });
    taskItem.appendChild(taskDeleteButton);

    taskList.appendChild(taskItem);
  }
}

function editTask(taskItem) {
  const taskText = taskItem.querySelector('p');
  if (taskText) {
    const taskEditTextbox = document.createElement('input');
    taskEditTextbox.classList.add('form-task-input');
    taskEditTextbox.setAttribute('type', 'text');
    taskEditTextbox.value = taskText.textContent;
    taskItem.replaceChild(taskEditTextbox, taskText);

    const taskEditButton = taskItem.querySelector('.button:first-of-type');
    taskEditButton.innerHTML = '<i class="material-symbols-outlined btnsty">save</i>';
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
  taskEditButton.innerHTML = '<i class="material-symbols-outlined btnsty">edit</i>';
  taskEditButton.removeEventListener('click', function() {
    saveTask(taskItem, newTaskText);
  });
  taskEditButton.addEventListener('click', function() {
    editTask(taskItem);
  });
}

function deleteTask(taskItem) {
  taskItem.remove();
  updateTaskList();
  
  const allTasks = taskList.querySelectorAll('.task-list-item');
  if (taskItems.length === 0) { 
    border.classList.remove('bordersty');
  }  
}