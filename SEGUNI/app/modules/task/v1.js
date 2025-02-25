const FRAMEAPP = document.getElementById('FRAMEAPP');

const TASK = document.createElement('section');
TASK.classList.add('aplication');
TASK.id = 'TASK';
FRAMEAPP.appendChild(TASK);

const TXT_APP = document.createElement('h3');
TXT_APP.textContent = 'TAREAS';
TASK.appendChild(TXT_APP);

const FORM = document.createElement('form');
FORM.id = 'task-form';
TASK.appendChild(FORM);

const INPUT = document.createElement('input');
INPUT.type = 'text';
INPUT.id = 'TASK_INPUT';
INPUT.placeholder = 'Nueva Tarea';
FORM.appendChild(INPUT);

const BUTTON = document.createElement('button');
BUTTON.id = 'TASK_BTN';
BUTTON.type = 'submit';
BUTTON.textContent = 'Agregar';
FORM.appendChild(BUTTON);

//LIST
const LIST = document.createElement('ul');
LIST.id = 'TASK_LIST';
TASK.appendChild(LIST);

// LOGICA
// Variables para manejar las tareas
const taskList = document.getElementById('TASK_LIST');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Función para renderizar las tareas en el DOM
function renderTasks() {
  taskList.innerHTML = ''; // Limpiar lista antes de renderizar
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'task_item';
    li.innerHTML = `
      <p class="txt_item">${task}</p>
      <button class="btn_item" data-index="${index}">Eliminar</button>
    `;
    taskList.appendChild(li);
  });
}

// Función para actualizar localStorage
function updateLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Evento para agregar tareas
FORM.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskText = INPUT.value.trim();
  if (taskText !== '') {
    tasks.push(taskText);
    updateLocalStorage();
    renderTasks();
    INPUT.value = ''; // Limpiar input
  }
});

// Evento para eliminar tareas con delegación
taskList.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const index = e.target.getAttribute('data-index');
    tasks.splice(index, 1);
    updateLocalStorage();
    renderTasks();
  }
});

// Renderizar tareas guardadas al cargar la página
renderTasks();
