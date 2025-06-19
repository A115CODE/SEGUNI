// Inicializar Supabase
const { createClient } = supabase;

const Dash_URL = 'https://dvuqnktmjvotdlnbbnhw.supabase.co';
const Dash_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2dXFua3RtanZvdGRsbmJibmh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1MTMxNzUsImV4cCI6MjA1NjA4OTE3NX0.NBjk0irYgv23oENmlKSLHJWG6fykfsI8X1hUHrVwT2Y';
const supabaseClientDashboard = createClient(Dash_URL, Dash_ANON_KEY);

const FRAMEAPP = document.getElementById('FRAMEAPP');
console.log('FRAMEAPP:', FRAMEAPP); // <– Verifica si es null o válido

const GRAPHS = document.createElement('section');
GRAPHS.classList.add('aplication');
GRAPHS.id = 'HOME';
FRAMEAPP.appendChild(GRAPHS);

const SUPABASE_STATUS = document.createElement('iframe');
SUPABASE_STATUS.src = 'https://status.supabase.com/';
SUPABASE_STATUS.style.width = '100%';
SUPABASE_STATUS.style.height = '40vh';
SUPABASE_STATUS.style.border = 'none';
GRAPHS.appendChild(SUPABASE_STATUS);

const GRAPHS = document.getElementById('GRAPHS');

// Crear botón
const BTN_DRAW = document.createElement('button');
BTN_DRAW.textContent = 'Crear Diagrama';
GRAPHS.appendChild(BTN_DRAW);

// Crear iframe
const DRAWIO = document.createElement('iframe');
DRAWIO.id = 'DRAWIO';
DRAWIO.src = 'https://embed.diagrams.net/?embed=1&proto=json';
DRAWIO.style.width = '100%';
DRAWIO.style.height = '60vh';
DRAWIO.style.border = '1px solid #ccc';
GRAPHS.appendChild(DRAWIO);

// Evento click: recarga draw.io (si quieres abrir uno nuevo cada vez)
BTN_DRAW.addEventListener('click', () => {
  // Por ejemplo, cargar XML vacío o uno predeterminado
  const diagramXml = '<mxfile><diagram name="Página-1" id="abc123">...</diagram></mxfile>';
  DRAWIO.contentWindow.postMessage(JSON.stringify({
    action: 'load',
    xml: diagramXml
  }), '*');
});

// Escuchar eventos desde draw.io
window.addEventListener('message', function (event) {
  const msg = JSON.parse(event.data);

  if (msg.event === 'init') {
    // El editor está listo: puedes cargar un diagrama aquí si quieres
    console.log('Editor listo');
  }

  if (msg.event === 'save') {
    // Aquí recibes el XML del diagrama cuando el usuario guarda
    console.log('Diagrama guardado:', msg.xml);
    // Puedes guardarlo en tu base de datos, localStorage, etc.
  }

  if (msg.event === 'exit') {
    console.log('Editor cerrado');
  }
});


const CONTAINER_GRAPHS = document.getElementById('CONTAINER_GRAPHS');
GRAPHS.appendChild(CONTAINER_GRAPHS); 

const ctx = document.getElementById('TIMES_APP');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 3],
      borderWidth: 1,
      backgroundColor: '#00457d'
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});