// SupaBase
const { createClient } = supabase;

const SUPABASE_URL = 'https://dvuqnktmjvotdlnbbnhw.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2dXFua3RtanZvdGRsbmJibmh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1MTMxNzUsImV4cCI6MjA1NjA4OTE3NX0.NBjk0irYgv23oENmlKSLHJWG6fykfsI8X1hUHrVwT2Y';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Crear estructura HTML
const FRAMEAPP = document.getElementById('FRAMEAPP');

const NOTES = document.createElement('section');
NOTES.classList.add('aplication');
NOTES.id = 'NOTES';
FRAMEAPP.appendChild(NOTES);

const NOTES_TXT = document.createElement("h3");
NOTES_TXT.id = "NOTES_TXT";
NOTES_TXT.textContent = "NOTAS RÁPIDAS";
NOTES.appendChild(NOTES_TXT);

const NOTES_FORM = document.createElement("form");
NOTES_FORM.id = "NOTES_FORM";
NOTES.appendChild(NOTES_FORM);

const NOTES_TXTAREA = document.createElement("textarea");
NOTES_TXTAREA.id = "NOTES_TXTAREA";
NOTES_TXTAREA.placeholder = "Nota rápida...";
NOTES_FORM.appendChild(NOTES_TXTAREA);

const NOTES_BUTTON = document.createElement("button");
NOTES_BUTTON.id = "NOTES_BUTTON";
NOTES_BUTTON.type = "submit";
NOTES_BUTTON.textContent = "Agregar";
NOTES_FORM.appendChild(NOTES_BUTTON);

const NOTES_LIST = document.createElement("ul");
NOTES_LIST.id = "NOTES_LIST";
NOTES.appendChild(NOTES_LIST);

// Función para obtener y mostrar las notas
async function loadNotes() {
  const { data, error } = await supabaseClient
    .from("notes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error al obtener notas:", error.message);
    return;
  }

  // Limpiar la lista antes de actualizar
  NOTES_LIST.innerHTML = "";

  // Agregar cada nota a la lista
  data.forEach((note) => {
    const li = document.createElement("li");
    li.classList.add("note_item")
    li.textContent = note.content;
    NOTES_LIST.appendChild(li);
  });
}

// Evento para guardar la nota en Supabase
NOTES_FORM.addEventListener("submit", async (event) => {
  event.preventDefault();

  const content = NOTES_TXTAREA.value.trim();
  if (!content) return;

  const { data, error } = await supabaseClient
    .from("notes")
    .insert([{ content }]);

  if (error) {
    console.error("Error al guardar la nota:", error.message);
    return;
  }

  NOTES_TXTAREA.value = ""; // Limpiar textarea después de guardar
  loadNotes(); // Actualizar la lista
});

// Cargar notas al iniciar
loadNotes();