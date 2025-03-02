// SupaBase
const { createClient } = supabase;

const SUPABASE_URL = 'https://dvuqnktmjvotdlnbbnhw.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2dXFua3RtanZvdGRsbmJibmh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1MTMxNzUsImV4cCI6MjA1NjA4OTE3NX0.NBjk0irYgv23oENmlKSLHJWG6fykfsI8X1hUHrVwT2Y';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Estructura HTML
const FRAMEAPP = document.getElementById('FRAMEAPP');

const DATA = document.createElement('section');
DATA.classList.add('aplication');
DATA.id = 'DATABASE';
FRAMEAPP.appendChild(DATA);

const DATA_TXT = document.createElement("h3");
DATA_TXT.id = "DATA_TXT";
DATA_TXT.textContent = "BASE DE CONOCIMIENTOS";
DATA.appendChild(DATA_TXT);

const DATA_FORM = document.createElement("form");
DATA_FORM.id = "DATA_FORM";
DATA.appendChild(DATA_FORM);

const REPORT = document.createElement("input");
REPORT.id = "REPORT";
REPORT.placeholder = "Reporte";
DATA_FORM.appendChild(REPORT);

const LOCATION = document.createElement("input");
LOCATION.id = "LOCATION";
LOCATION.placeholder = "Area de soporte";
DATA_FORM.appendChild(LOCATION);

const CATEGORY = document.createElement("input");
CATEGORY.id = "CATEGORY";
CATEGORY.placeholder = "Categoria";
DATA_FORM.appendChild(CATEGORY);

const SOLUTION = document.createElement("input");
SOLUTION.id = "SOLUTION";
SOLUTION.placeholder = "Solucion";
DATA_FORM.appendChild(SOLUTION);

const DATA_BTN = document.createElement("button");
DATA_BTN.type = "submit";
DATA_BTN.id = "DATA_BTN";
DATA_BTN.textContent = "Guardar";
DATA_FORM.appendChild(DATA_BTN);

// DB SupaBase
// Captura el formulario
const DB_FORM = document.getElementById("DATA_FORM");

// Evento para guardar datos en Supabase
DB_FORM.addEventListener("submit", async (event) => {
  event.preventDefault();

  const report = document.getElementById("REPORT").value;
  const location = document.getElementById("LOCATION").value;
  const category = document.getElementById("CATEGORY").value;
  const solution = document.getElementById("SOLUTION").value;

  const { data, error } = await supabaseClient
    .from("base_conocimientos") // Nombre de la tabla
    .insert([{ report, location, category, solution }]);

  if (error) {
    console.error("Error al guardar:", error.message);
    alert("Error al guardar los datos.");
  } else {
    console.log("Datos guardados correctamente:", data);
    alert("Datos guardados exitosamente.");
    DB_FORM.reset();
  }
});