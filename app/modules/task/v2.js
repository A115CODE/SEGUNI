// Inicializar Supabase
const { createClient } = supabase;

const SUPABASE_URL = 'https://dvuqnktmjvotdlnbbnhw.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2dXFua3RtanZvdGRsbmJibmh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1MTMxNzUsImV4cCI6MjA1NjA4OTE3NX0.NBjk0irYgv23oENmlKSLHJWG6fykfsI8X1hUHrVwT2Y';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const FRAMEAPP = document.getElementById('FRAMEAPP');

const TASK = document.createElement('section');
TASK.classList.add('aplication');
TASK.id = 'TASK';
FRAMEAPP.appendChild(TASK);

const TXT_APP = document.createElement('h3');
TXT_APP.id = 'TASK_TXT';
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

// LISTA
const LIST = document.createElement('ul');
LIST.id = 'TASK_LIST';
TASK.appendChild(LIST);

const OPEN_FORM_TASK = document.createElement("button");
OPEN_FORM_TASK.textContent = "+";
OPEN_FORM_TASK.id = "OPEN_FORM_TASK";
TASK.appendChild(OPEN_FORM_TASK);

//Logica para abrir y cerrar los forms de las apps
// Al principio, ocultamos el formulario usando la clase "hidden"
FORM.style.display = "none";
// Evento para abrir/cerrar el formulario al hacer clic en el botón
OPEN_FORM_TASK.addEventListener("click", function () {
  // Alternar la visibilidad del formulario
  if (FORM.style.display === "none") {
    FORM.style.display = "block"; // Mostrar el formulario
    OPEN_FORM_TASK.textContent = "X"; // Cambiar texto del botón
  } else {
    FORM.style.display = "none"; // Ocultar el formulario
    OPEN_FORM_TASK.textContent = "+"; // Cambiar texto del botón
  }

  console.log("Formulario visible:", FORM.style.display === "block");
});

// Función para obtener tareas desde Supabase
// Función para obtener y filtrar tareas por email
async function fetchTasks() {
  // Obtener el usuario autenticado
  const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
  
  if (authError || !user) {
    console.error('Error obteniendo usuario:', authError);
    return;
  }

  // Obtener tareas filtradas por email del usuario
  const { data, error } = await supabaseClient
    .from('tasks')
    .select('*')
    .eq('email', user.email); // Filtrar por email

  if (error) {
    console.error('Error obteniendo tareas:', error);
    return;
  }

  renderTasks(data); // Renderizar tareas en el DOM
}


// Función para renderizar tareas en el DOM
function renderTasks(tasks) {
  LIST.innerHTML = ''; // Limpiar lista antes de renderizar
  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = 'task_item';
    li.innerHTML = `
      <p class="txt_item">${task.text}</p>
      <button class="btn_item" data-id="${task.id}">Eliminar</button>
    `;
    LIST.appendChild(li);
  });
}

// Evento para agregar tarea
FORM.addEventListener('submit', async (e) => {
  e.preventDefault();
  const taskText = INPUT.value.trim();
  
  if (taskText !== '') {
    // Obtener el usuario autenticado
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    
    if (authError || !user) {
      console.error('Error obteniendo usuario:', authError);
      return;
    }
    
    const { data, error } = await supabaseClient
      .from('tasks')
      .insert([{ text: taskText, email: user.email }]); // Guardar email del usuario
    
    if (error) {
      console.error('Error agregando tarea:', error);
      return;
    }
    
    fetchTasks(); // Recargar tareas desde Supabase
    INPUT.value = ''; // Limpiar input
  }
});


// Evento para eliminar tareas
LIST.addEventListener('click', async (e) => {
  if (e.target.tagName === 'BUTTON') {
    const taskId = e.target.getAttribute('data-id');

    // Obtener el usuario autenticado
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    
    if (authError || !user) {
      console.error('Error obteniendo usuario:', authError);
      return;
    }

    // Eliminar solo si el email del usuario coincide con el de la tarea
    const { error } = await supabaseClient
      .from('tasks')
      .delete()
      .eq('id', taskId)
      .eq('email', user.email); // Asegurar que el usuario solo borre sus propias tareas

    if (error) {
      console.error('Error eliminando tarea:', error);
      return;
    }

    fetchTasks(); // Recargar lista después de eliminar
  }
});


// Cargar tareas al inicio
fetchTasks();
