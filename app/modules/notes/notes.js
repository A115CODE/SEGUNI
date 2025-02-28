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
NOTES_TXT.textContent = "MIS NOTAS";
NOTES.appendChild(NOTES_TXT);

const NOTES_FORM = document.createElement("form");
NOTES_FORM.id = "NOTES_FORM";
NOTES.appendChild(NOTES_FORM);

const NOTES_INTITLE = document.createElement("input");
NOTES_INTITLE.id = "NOTES_INTITLE";
NOTES_INTITLE.placeholder = "Título de la nota";
NOTES_FORM.appendChild(NOTES_INTITLE);

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
    .select("id, title, content, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error al obtener notas:", error.message);
    return;
  }

  NOTES_LIST.innerHTML = ""; // Limpiar lista antes de actualizar

  data.forEach((note) => {
    const li = document.createElement("li");
    li.classList.add("note_item");

    const title = document.createElement("h4");
    title.classList.add("note_title");
    title.textContent = note.title || "Sin título";
    li.appendChild(title);

    const content = document.createElement("p");
    content.classList.add("note_content");
    content.textContent = note.content;
    li.appendChild(content);

    // Botón para eliminar la nota
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.classList.add("delete_button");
    deleteButton.addEventListener("click", async () => {
      await deleteNote(note.id);
    });
    li.appendChild(deleteButton);

    // Botón para editar la nota
    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.classList.add("edit_button");
    editButton.addEventListener("click", () => {
      editNote(note);
    });
    li.appendChild(editButton);

    NOTES_LIST.appendChild(li);

        // Evento para abrir/cerrar la nota
        li.addEventListener("click", function () {
          this.classList.toggle("note_item_open");
          console.log("Clase agregada dinámicamente a:", this);
        });
    
  });
}

// Función para eliminar una nota
async function deleteNote(noteId) {
  const { error } = await supabaseClient
    .from("notes")
    .delete()
    .eq("id", noteId);

  if (error) {
    console.error("Error al eliminar la nota:", error.message);
    return;
  }

  loadNotes(); // Recargar notas después de eliminar
}

// Función para editar una nota
async function editNote(note) {
  const newTitle = prompt("Nuevo título:", note.title);
  const newContent = prompt("Nuevo contenido:", note.content);

  if (newTitle !== null && newContent !== null) {
    const { error } = await supabaseClient
      .from("notes")
      .update({ title: newTitle, content: newContent })
      .eq("id", note.id);

    if (error) {
      console.error("Error al actualizar la nota:", error.message);
      return;
    }

    loadNotes(); // Recargar notas después de editar
  }
}

// Evento para guardar la nota en Supabase
NOTES_FORM.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = NOTES_INTITLE.value.trim();
  const content = NOTES_TXTAREA.value.trim();
  if (!content) return;

  const { data, error } = await supabaseClient
    .from("notes")
    .insert([{ title, content }]);

  if (error) {
    console.error("Error al guardar la nota:", error.message);
    return;
  }

  NOTES_INTITLE.value = ""; // Limpiar input título
  NOTES_TXTAREA.value = ""; // Limpiar textarea
  loadNotes(); // Actualizar la lista
});

// Cargar notas al iniciar
loadNotes();