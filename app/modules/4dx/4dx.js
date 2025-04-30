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
SELECT.name = 'hola'
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
  HEADER.innerHTML = `
    <div>
      <p>${txt_header}</p>
    </div>
    `;
    ROOT.appendChild(HEADER);
}
DEPLOY_HEADERS('COMPROMISO_LIST', 'Compromisos');
DEPLOY_HEADERS('RETOS_LIST', 'Retos');
DEPLOY_HEADERS('LOGROS_LIST', 'Logros');

const OPEN_FORM_TASK = document.createElement("button");
OPEN_FORM_TASK.textContent = "+";
OPEN_FORM_TASK.id = "OPEN_FORM_TASK";
SPAX.appendChild(OPEN_FORM_TASK);

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

//inster
FORM.addEventListener('submit', async (e) => {
  e.preventDefault();

  const text  = INPUT.value.trim();
  const cat   = SELECT.value;

  if (!text) return;

  // 1) Insertar en Supabase
  const { data, error } = await supabaseClient
    .from('spax')
    .insert([{ description: text, category: cat }]);

  if (error) {
    console.error('Error al guardar:', error);
    return;
  }

  // 2) Limpiar y recargar listas
  INPUT.value = '';
  await loadTasks(); 
});

//select
async function loadTasks() {
  // Para cada categoría, hacemos un SELECT ... WHERE category = '...'
  const categories = [
    { name: 'Compromisos', el: COMPROMISO_LIST },
    { name: 'Retos',       el: RETOS_LIST      },
    { name: 'Logros',      el: LOGROS_LIST     }
  ];

  for (const { name, el } of categories) {
    const { data, error } = await supabaseClient
      .from('spax')
      .select('id, description, created_at')
      .eq('category', name)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error al cargar ${name}:, error');
      continue;
    }

    data.forEach(task => {
      const li = document.createElement('li');
      li.textContent = task.description;
      el.appendChild(li);
    });
  }
}

// Llamamos una vez al inicio
loadTasks();