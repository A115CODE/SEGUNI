// SupaBase
const { createClient } = supabase;

const SUPABASE_URL = 'https://dvuqnktmjvotdlnbbnhw.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2dXFua3RtanZvdGRsbmJibmh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1MTMxNzUsImV4cCI6MjA1NjA4OTE3NX0.NBjk0irYgv23oENmlKSLHJWG6fykfsI8X1hUHrVwT2Y';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const FRAMEAPP = document.getElementById('FRAMEAPP');

const DATA = document.createElement('section');
DATA.classList.add('aplication');
DATA.id = 'DATABASE';
FRAMEAPP.appendChild(DATA);

const DATA_TXT = document.createElement("h3");
DATA_TXT.id = "DATA_TXT";
DATA_TXT.textContent = "BASE DE CONOCIMIENTOS";
DATA.appendChild(DATA_TXT);

const DRAWIO = document.createElement('iframe');
DRAWIO.id = 'drawioFrame';
DRAWIO.src = 'https://embed.diagrams.net/?embed=1&proto=json';
DRAWIO.style = 'width: 100%; height: 600px; border: 0';
DATA.appendChild(DRAWIO);

const OPEN_DRAW = document.createElement("button");
OPEN_DRAW.textContent = "+jdcnknjasndlsklaksndlsdanlaksndlkansdslkndsaklndaskdlna";
OPEN_DRAW.id = "";
DATA.appendChild(OPEN_DRAW);

//Logica para abrir y cerrar los forms de las apps
// Al principio, ocultamos el formulario usando la clase "hidden"
DRAWIO.style.display = "none";
// Evento para abrir/cerrar el formulario al hacer clic en el botón
OPEN_DRAW.addEventListener("click", function () {
  if (DRAWIO.style.display === "none") {
    DRAWIO.style.display = "flex"; // Mostrar el formulario
    OPEN_DRAW.textContent = "X"; // Cambiar texto del botón
  } else {
    DRAWIO.style.display = "none"; // Ocultar el formulario
    OPEN_DRAW.textContent = "+"; // Cambiar texto del botón
  }

  console.log("Formulario visible:", DRAWIO.style.display === "block");
});

const iframe = document.getElementById('drawioFrame');
// Escucha mensajes desde draw.io
window.addEventListener('message', function (evt) {
  const msg = JSON.parse(evt.data);

  if (msg.event === 'init') {
    // Se inicializó el iframe, puedes enviar el diagrama
    const exampleXml =
      '<mxfile><diagram name="Página-1" id="abc123">...</diagram></mxfile>';
      DRAWIO.contentWindow.postMessage(
      JSON.stringify({
        action: 'load',
        xml: exampleXml,
      }),
      '*'
    );
  }

  if (msg.event === 'save') {
    // El usuario hizo clic en guardar, aquí recibes el XML
    console.log('Diagrama guardado:', msg.xml);
  }

  if (msg.event === 'exit') {
    console.log('Editor cerrado');
  }
});

      // Puedes enviar mensajes manualmente como guardar
document.getElementById('btnLoad').onclick = function () {
  iframe.contentWindow.postMessage(
    JSON.stringify({ action: 'export' }),
    '*'
  );
};

