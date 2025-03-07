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

// Save TastTime
// Evento para guardar el tiempo en Supabase
TIME_FORM.addEventListener('submit', async (e) => {
  e.preventDefault(); // Evita el recargo de la página

  const ITEM_TIMER = TIME_FORM_INPUT.value.trim();
  if (!ITEM_TIMER) {
    alert('Por favor, ingrese un número de ticket.');
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
  }
});