// SupaBase
const { createClient } = supabase;

const SUPABASE_URL = 'https://dvuqnktmjvotdlnbbnhw.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2dXFua3RtanZvdGRsbmJibmh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1MTMxNzUsImV4cCI6MjA1NjA4OTE3NX0.NBjk0irYgv23oENmlKSLHJWG6fykfsI8X1hUHrVwT2Y';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

//Security Obtener usuario (verifica si ya estás autenticado)
let user = null;
supabaseClient.auth.getUser().then(({ data }) => {
  user = data.user;
  console.log("Usuario autenticado:", user?.email);
});

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
OPEN_DRAW.textContent = "+";
OPEN_DRAW.id = "OPEN_DRAW";
DATA.appendChild(OPEN_DRAW);


DRAWIO.style.display = "none";
OPEN_DRAW.addEventListener("click", function () {
  if (DRAWIO.style.display === "none") {
    DRAWIO.style.display = "flex";
    OPEN_DRAW.textContent = "X";
  } else {
    DRAWIO.style.display = "none";
    OPEN_DRAW.textContent = "+";
  }

  console.log("Formulario visible:", DRAWIO.style.display === "block");
});

const iframe = document.getElementById('drawioFrame');
// Escucha mensajes desde draw.io
window.addEventListener('message', async function (evt) {
  let msg;
  try {
    msg = JSON.parse(evt.data);
  } catch (e) {
    return; // mensaje no válido
  }

  if (msg.event === 'init') {
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
    const xml = msg.xml;

    if (!user) {
      console.error("Usuario no autenticado.");
      alert("Debes iniciar sesión para guardar el diagrama.");
      return;
    }

    const nombre = prompt("¿Qué nombre deseas darle a este diagrama?");
    if (!nombre) return;

    // Guardar en Supabase
    const { error } = await supabaseClient.from('diagramas').insert([
      {
        nombre: nombre,
        contenido: xml,
        correo_usuario: user.email,
      },
    ]);

    if (error) {
      console.error("Error al guardar en Supabase:", error);
      alert("Hubo un error al guardar el diagrama.");
    } else {
      console.log("Diagrama guardado correctamente.");
      alert("¡Diagrama guardado!");
    }
  }

  if (msg.event === 'exit') {
    console.log('Editor cerrado');
  }
});