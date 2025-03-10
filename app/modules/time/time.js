// Configuración de Supabase
const { createClient } = supabase;
const supabaseUrl = 'https://dvuqnktmjvotdlnbbnhw.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2dXFua3RtanZvdGRsbmJibmh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1MTMxNzUsImV4cCI6MjA1NjA4OTE3NX0.NBjk0irYgv23oENmlKSLHJWG6fykfsI8X1hUHrVwT2Y';
const supaBaseTIME = createClient(supabaseUrl, supabaseKey);

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

const TIME_INPUT = document.createElement("input");
TIME_INPUT.id = "tareaInput";
TIME_INPUT.placeholder = "Agregar";
TIME_FORM.appendChild(TIME_INPUT);

const TIME_BTN = document.createElement("button");
TIME_BTN.id = "guardarBtn";
TIME_BTN.type = 'submit';
TIME_BTN.textContent = 'Agregar';
TIME_FORM.appendChild(TIME_BTN);

// LISTA
const TIME_LIST = document.createElement('ul');
TIME_LIST.id = 'tareas';
TIME.appendChild(TIME_LIST);

//LOGICA

document.getElementById('TIME_FORM').addEventListener('submit', function (event) {
  event.preventDefault(); // Evita el envío del formulario y el refresco de la página
  agregarTarea();
});


async function agregarTarea() {
  let tareaTexto = document.getElementById('tareaInput').value.trim();
  if (tareaTexto === '') {
    alert('Por favor, ingresa una tarea.');
    return;
  }

  let ahora = new Date();
  let creadaEn = ahora.toISOString(); // Guardar en formato UTC para compatibilidad con Supabase

  // Insertar en Supabase
  let { error } = await supaBaseTIME.from('tareas').insert([
    {
      descripcion: tareaTexto,
      creada_en: creadaEn,
    },
  ]);

  if (error) {
    console.error('Error al guardar en Supabase:', error);
    alert('Hubo un error al guardar la tarea.');
    return;
  }

  document.getElementById('tareaInput').value = '';
  cargarTareas(); // Recargar lista de tareas
}

async function cargarTareas() {
  let { data: tareas, error } = await supaBaseTIME.from('tareas').select('*');
  if (error) {
    console.error('Error al obtener tareas:', error);
    return;
  }

  let contenedor = document.getElementById('tareas');
  contenedor.innerHTML = '';

  tareas.forEach((tarea) => {
    let tareaDiv = document.createElement('div');
    tareaDiv.classList.add('tarea');

    let creadaEnUTC = new Date(tarea.creada_en);
    let creadaEnLocal = new Date(
      creadaEnUTC.getTime() + new Date().getTimezoneOffset() * -60000
    ); // Convertir UTC a local

    let ahora = new Date();
    let tiempoAtraso = Math.floor((ahora - creadaEnLocal) / 1000); // en segundos

    let horas = Math.floor(tiempoAtraso / 3600);
    let minutos = Math.floor((tiempoAtraso % 3600) / 60);

    let tiempoTexto = `${horas}h ${minutos}m`; // Sin los segundos

    tareaDiv.innerHTML = `
      <strong>${tarea.descripcion}</strong><br>
      Guardado a las: ${formatearHora(creadaEnLocal.toISOString())}<br>
      <span class="temporizador" style="color: red;">${tiempoTexto} De: 2h 40m</span><br>
    `;
    let btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.addEventListener('click', () => eliminarTarea(tarea.id));
    tareaDiv.appendChild(btnEliminar);

    contenedor.appendChild(tareaDiv);
  });

  actualizarTiempoTranscurrido();
}

function formatearHora(fechaISO) {
  let fecha = new Date(fechaISO);
  return fecha.toLocaleString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Guatemala',
  });
}

function actualizarTiempoTranscurrido() {
  document.querySelectorAll('.tiempo-transcurrido').forEach((elemento) => {
    let creadaEnTexto = elemento.dataset.creacion;
    if (!creadaEnTexto) return; // Evitar errores si está vacío

    let creadaEn = new Date(creadaEnTexto);
    if (isNaN(creadaEn)) {
      console.error('Fecha inválida:', creadaEnTexto);
      return;
    }

    let ahora = new Date();
    let diferencia = Math.floor((ahora - creadaEn) / 1000); // Diferencia en segundos

    let horas = Math.floor(diferencia / 3600);
    let minutos = Math.floor((diferencia % 3600) / 60);

    elemento.textContent = `Tiempo transcurrido: ${horas}h ${minutos}m`; // Sin segundos
  });
}

async function eliminarTarea(id) {
  let { error } = await supaBaseTIME.from('tareas').delete().match({ id });
  if (error) {
    console.error('Error al eliminar la tarea', error);
  } else {
    cargarTareas();
  }
}

cargarTareas();
setInterval(cargarTareas, 60000);
