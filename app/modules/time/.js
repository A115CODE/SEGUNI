// Inicializar Supabase
const { createClient } = supabase;

const SUPABASE_URL = 'https://dvuqnktmjvotdlnbbnhw.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2dXFua3RtanZvdGRsbmJibmh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1MTMxNzUsImV4cCI6MjA1NjA4OTE3NX0.NBjk0irYgv23oENmlKSLHJWG6fykfsI8X1hUHrVwT2Y';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const FRAMEAPP = document.getElementById('FRAMEAPP');

const TIME = document.createElement('section');
TIME.classList.add('aplication');
TIME.id = 'TIME';
FRAMEAPP.appendChild(TIME);

const TIME_TXT = document.createElement('h3');
TIME_TXT.id = 'TIME_TXT';
TIME_TXT.textContent = 'Tiempos de Soporte';
TIME.appendChild(TIME_TXT);

const TIME_FORM = document.createElement('form');
TIME_FORM.id = 'TIME_FORM';
TIME.appendChild(TIME_FORM);

const FECHA_ACTUAL = new Date();
const HORA_ACTUAL = FECHA_ACTUAL.toLocaleTimeString(); // Solo la hora en formato local

const TIME_FORM_INPUT = document.createElement('input');
TIME_FORM_INPUT.type = 'text';
TIME_FORM_INPUT.id = 'TIME_FORM_INPUT';
TIME_FORM_INPUT.placeholder = 'TICKET...';
TIME_FORM.appendChild(TIME_FORM_INPUT);

const TIME_FORM_BTN = document.createElement('button');
TIME_FORM_BTN.id = 'TIME_FORM_BTN';
TIME_FORM_BTN.type = 'submit';
TIME_FORM_BTN.textContent = 'Agregar';
TIME_FORM.appendChild(TIME_FORM_BTN);

// LISTA
const TIME_LIST = document.createElement('ul');
TIME_LIST.id = 'TIME_LIST';
TIME.appendChild(TIME_LIST);

// Save TastTime
// Evento para guardar el tiempo en Supabase
TIME_FORM.addEventListener('submit', async (e) => {
  e.preventDefault(); // Evita el recargo de la página

  const ITEM_TIMER = TIME_FORM_INPUT.value.trim();
  if (!ITEM_TIMER) {
    alert('Por favor, ingrese un ticket.');
    return;
  }

  const FECHA_ACTUAL = new Date();
  const HORA_ACTUAL = FECHA_ACTUAL.toLocaleTimeString(); // Hora actual en formato local

  // Insertar en Supabase
  const { data, error } = await supabaseClient
    .from('support_time')
    .insert([{ ticket: ITEM_TIMER, time: HORA_ACTUAL }]);

  if (error) {
    console.error('Error al guardar:', error.message);
    alert('Hubo un error al guardar los datos.');
  } else {
    console.log('Guardado correctamente:', data);
    TIME_FORM_INPUT.value = ''; // Limpiar el input
    obtenerTiempos();
  }
});

//mostrar datos de la db
async function obtenerTiempos() {
  TIME_LIST.innerHTML = '';

  const { data, error } = await supabaseClient
    .from('support_time')
    .select('*');

  if (error) {
    console.error('Error al obtener datos:', error.message);
    return;
  }

  console.log('Datos obtenidos:', data);

  const FECHA_LOCAL = new Date();

  data.forEach((item) => {
    const listItem = document.createElement('li');

    // Convertir la hora guardada en texto a un objeto Date
    const horaGuardada = new Date();
    const partesHora = item.time.split(':');

    if (partesHora.length === 3) {
      const [hora, minutos, segundos] = partesHora.map(Number);
      horaGuardada.setHours(hora, minutos, segundos);

      // Calcular la diferencia de tiempo en minutos
      const diferenciaMs = FECHA_LOCAL - horaGuardada;
      const diferenciaMinutos = Math.floor(diferenciaMs / 60000);

      listItem.textContent = `Ticket: ${item.ticket} | Hora: ${item.time} | Hace ${diferenciaMinutos} min`;
    } else {
      listItem.textContent = `Ticket: ${item.ticket} | Hora: ${item.time} (Error de formato)`;
      console.error('Formato de hora incorrecto en la base de datos:', item.time);
    }

    TIME_LIST.appendChild(listItem);
  });
}

//Hora actual de update del tiempo
const FECHA_LOCAL = new Date();
const HORA_LOCAL = FECHA_LOCAL.toLocaleTimeString(); // Solo la hora en formato local


// Cargar datos al iniciar la página
obtenerTiempos();



// Cargar datos al iniciar la página
obtenerTiempos();