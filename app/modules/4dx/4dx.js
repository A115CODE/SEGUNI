// Inicializar Supabase
const { createClient } = supabase;

const SUPABASE_URL = 'https://dvuqnktmjvotdlnbbnhw.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2dXFua3RtanZvdGRsbmJibmh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1MTMxNzUsImV4cCI6MjA1NjA4OTE3NX0.NBjk0irYgv23oENmlKSLHJWG6fykfsI8X1hUHrVwT2Y';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const FRAMEAPP = document.getElementById('FRAMEAPP');

const SPAX = document.createElement('section');
SPAX.classList.add('aplication');
SPAX.id = 'SPAX';
FRAMEAPP.appendChild(SPAX);

const TXT_APP = document.createElement('h3');
TXT_APP.id = 'TASK_TXT';
TXT_APP.textContent = '4DX';
SPAX.appendChild(TXT_APP);

// Variables globales
let editMode = false;
let editingTaskId = null;

// FORMULARIO
const FORM = document.createElement('form');
FORM.id = 'task-form';
SPAX.appendChild(FORM);

const INPUT = document.createElement('input');
INPUT.type = 'text';
INPUT.id = 'TASK_INPUT';
INPUT.placeholder = 'Ingresa un dato';
FORM.appendChild(INPUT);

const SELECT = document.createElement('select');
SELECT.id = 'SELECT';
SELECT.name = 'hola';
SELECT.innerHTML = `
  <option value="Compromisos">Compromisos</option>
  <option value="Retos">Retos</option>
  <option value="Logros">Logros</option>
`;
FORM.appendChild(SELECT);

const BUTTON = document.createElement('button');
BUTTON.id = 'TASK_BTN';
BUTTON.type = 'submit';
BUTTON.textContent = 'Agregar';
FORM.appendChild(BUTTON);

// LISTAS
const COMPROMISO_LIST = document.createElement('ul');
COMPROMISO_LIST.id = 'COMPROMISO_LIST';
SPAX.appendChild(COMPROMISO_LIST);

const RETOS_LIST = document.createElement('ul');
RETOS_LIST.id = 'RETOS_LIST';
SPAX.appendChild(RETOS_LIST);

const LOGROS_LIST = document.createElement('ul');
LOGROS_LIST.id = 'LOGROS_LIST';
SPAX.appendChild(LOGROS_LIST);

function DEPLOY_HEADERS(root, txt_header) {

  let ROOT = document.getElementById(root);
  ROOT.classList.add("listas");

  let HEADER = document.createElement('div');
  HEADER.classList.add("header");
  HEADER.innerHTML = `
      <h3>${txt_header}</h3>
    `;
    ROOT.appendChild(HEADER);
};
DEPLOY_HEADERS('COMPROMISO_LIST', 'Compromisos');
DEPLOY_HEADERS('RETOS_LIST', 'Retos');
DEPLOY_HEADERS('LOGROS_LIST', 'Logros');

const OPEN_FORM_TASK = document.createElement("button");
OPEN_FORM_TASK.textContent = "+";
OPEN_FORM_TASK.id = "OPEN_FORM_TASK";
SPAX.appendChild(OPEN_FORM_TASK);

//Function for form
FORM.style.display = "none";

OPEN_FORM_TASK.addEventListener("click", function () {
  if (FORM.style.display === "none") {
    FORM.style.display = "block";
    OPEN_FORM_TASK.textContent = "X";
  } else {
    FORM.style.display = "none";
    OPEN_FORM_TASK.textContent = "+";
  }

  console.log("Formulario visible:", FORM.style.display === "block");
});

//inster
FORM.addEventListener('submit', async (e) => {
  e.preventDefault();
  const description = INPUT.value.trim();
  const category = SELECT.value;

  if (!description) return;

  const { data: userData } = await supabaseClient.auth.getUser();
  const email = userData?.user?.email;
  if (!email) return;

  if (editMode && editingTaskId) {
    // Editar tarea
    const { error } = await supabaseClient
      .from('spax')
      .update({ description })
      .eq('id', editingTaskId);

    if (error) {
      console.error('Error al actualizar:', error);
    }
  } else {
    // Agregar nueva tarea
    const { error } = await supabaseClient.from('spax').insert([
      {
        description,
        category,
        user_email: email,
        created_at: new Date().toISOString()
      }
    ]);

    if (error) {
      console.error('Error al insertar:', error);
    }
  }

  // Reset formulario
  FORM.reset();
  BUTTON.textContent = 'Agregar';
  editMode = false;
  editingTaskId = null;
  loadTasks();
});

//select
async function loadTasks() {
  const { data: userData, error: userError } = await supabaseClient.auth.getUser();
  if (userError || !userData?.user) {
    console.error('Usuario no autenticado:', userError);
    return;
  }

  const email = userData.user.email;

  const categories = [
    { name: 'Compromisos', el: COMPROMISO_LIST },
    { name: 'Retos',       el: RETOS_LIST      },
    { name: 'Logros',      el: LOGROS_LIST     }
  ];

  for (const { name, el } of categories) {
    [...el.querySelectorAll('li')].forEach(li => li.remove());

    const { data, error } = await supabaseClient
      .from('spax')
      .select('id, description, created_at')
      .eq('category', name)
      .eq('user_email', email)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error al cargar ${name}:', error);
      continue;
    }

    data.forEach(task => {
      const li = document.createElement('li');

      const span = document.createElement('span');
      span.textContent = task.description;
      li.appendChild(span);

            //container buttons
            const btnsContainer = document.createElement('div');
            li.appendChild(btnsContainer);

      // BtnEditar
      const editBtn = document.createElement('button');
      editBtn.style.marginLeft = '10px';
      editBtn.addEventListener('click', () => {
        INPUT.value = task.description;
        SELECT.value = name;
        BUTTON.textContent = 'Actualizar';
        editMode = true;
        editingTaskId = task.id;
      });
      btnsContainer.appendChild(editBtn);
      const btnEditing = document.createElement('img');
      btnEditing.src = '../assets/edit.svg';
      editBtn.appendChild(btnEditing);

      // BtnEliminar
      const deleteBtn = document.createElement('button');
      deleteBtn.style.marginLeft = '5px';
      deleteBtn.addEventListener('click', async () => {
        const confirmDelete = confirm('¿Estas seguro de eliminar este contenido?');
        if (confirmDelete) {
          const { error } = await supabaseClient
            .from('spax')
            .delete()
            .eq('id', task.id);

          if (error) {
            console.error('Error al eliminar:', error);
          } else {
            loadTasks();
          }
        }
      });
      btnsContainer.appendChild(deleteBtn);
      const btnDelate = document.createElement('img');
      btnDelate.src = '../assets/delete.svg';
      deleteBtn.appendChild(btnDelate);

      el.appendChild(li);
    });
  }
}
loadTasks();

function checkAndDeleteTasks() {
  const now = new Date();
  const isTuesday = now.getDay() === 2; //marte es 2 por que dimingo seria 0
  const isNoon = now.getHours() === 12 && now.getMinutes() === 0;

  if (isTuesday && isNoon) {
    deleteAllTasks();
  }
}

async function deleteAllTasks() {
  const { data: userData } = await supabaseClient.auth.getUser();
  const email = userData?.user?.email;
  if (!email) return;

  const { error } = await supabaseClient
    .from('spax')
    .delete()
    .in('category', ['Compromisos', 'Retos', 'Logros'])
    .eq('user_email', email);

  if (error) {
    console.error('Error al eliminar:', error);
  } else {
    loadTasks(); //Reload en la lista
    console.log('Tareas eliminadas automáticamente.');
  }
}

// Revisa cada minuto si es martes a las 12:00
setInterval(checkAndDeleteTasks, 60 * 1000);