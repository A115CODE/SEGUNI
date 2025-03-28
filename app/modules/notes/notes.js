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
NOTES_FORM.classList.add("hidden")
NOTES.appendChild(NOTES_FORM);

const NOTES_INTITLE = document.createElement("input");
NOTES_INTITLE.id = "NOTES_INTITLE";
NOTES_INTITLE.placeholder = "Título de la nota";
NOTES_FORM.appendChild(NOTES_INTITLE);

const NOTES_TXTAREA = document.createElement("textarea");
NOTES_TXTAREA.id = "NOTES_TXTAREA";
NOTES_TXTAREA.placeholder = "Nota rápida...";
NOTES_FORM.appendChild(NOTES_TXTAREA);

const NOTES_BUTTON = document.createElement("button");
NOTES_BUTTON.id = "NOTES_BUTTON";
NOTES_BUTTON.type = "submit";
NOTES_BUTTON.textContent = "Agregar";
NOTES_FORM.appendChild(NOTES_BUTTON);

const OPEN_FORM = document.createElement("button");
OPEN_FORM.textContent = "+";
OPEN_FORM.id = "OPEN_FORM";
NOTES.appendChild(OPEN_FORM);

//Logica para abrir y cerrar los forms de las apps
// Al principio, ocultamos el formulario usando la clase "hidden"
NOTES_FORM.style.display = "none";
// Evento para abrir/cerrar el formulario al hacer clic en el botón
OPEN_FORM.addEventListener("click", function () {
  if (NOTES_FORM.style.display === "none") {
    NOTES_FORM.style.display = "flex"; // Mostrar el formulario
    OPEN_FORM.textContent = "X"; // Cambiar texto del botón
  } else {
    NOTES_FORM.style.display = "none"; // Ocultar el formulario
    OPEN_FORM.textContent = "+"; // Cambiar texto del botón
  }

  console.log("Formulario visible:", NOTES_FORM.style.display === "block");
});

const NOTES_LIST = document.createElement("ul");
NOTES_LIST.id = "NOTES_LIST";
NOTES.appendChild(NOTES_LIST);


let editingNoteId = null; // Para saber si estamos editando una nota existente

async function loadNotes() {
  // Obtener el usuario autenticado
  const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
  
  if (authError) {
    console.error("Error al obtener el usuario:", authError.message);
    return;
  }

  if (!user) {
    console.error("No hay usuario autenticado");
    return;
  }

  const email = user.email; // Email del usuario actual

  // Obtener solo las notas del usuario autenticado
  const { data, error } = await supabaseClient
    .from("notes")
    .select("id, title, content, created_at") // Ya no necesitamos el email en la selección
    .eq("email", email) // Filtrar por email del usuario actual
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error al obtener notas:", error.message);
    return;
  }

  NOTES_LIST.innerHTML = "";

  data.forEach((note) => {
    const li = document.createElement("li");
    li.classList.add("note_item");

    const title = document.createElement("h4");
    title.classList.add("note_title");
    title.textContent = note.title || "Sin título";
    li.appendChild(title);

    const content = document.createElement("p");
    content.classList.add("note_content");
    content.textContent = note.content;
    li.appendChild(content);

    const buttons = document.createElement("div");
    buttons.classList.add("buttons_li");
    li.appendChild(buttons);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn_li");
    deleteButton.addEventListener("click", async () => {
      await deleteNote(note.id);
    });
    buttons.appendChild(deleteButton);
    const imgDelete = document.createElement("img");
    imgDelete.src = "../../../assets/delete.svg";
    imgDelete.alt = "Delete";
    deleteButton.appendChild(imgDelete);

    const editButton = document.createElement("button");
    editButton.classList.add("btn_li");
    editButton.addEventListener("click", () => {
      NOTES_INTITLE.value = note.title;
      NOTES_TXTAREA.value = note.content;
      NOTES_BUTTON.textContent = "Actualizar"; 
      editingNoteId = note.id;
    });
    buttons.appendChild(editButton);
    const imgEdit = document.createElement("img");
    imgEdit.src = "../../assets/edit.svg";
    imgEdit.alt = "Edit";
    editButton.appendChild(imgEdit);

    NOTES_LIST.appendChild(li);

    // Evento para abrir/cerrar la nota
    li.addEventListener("click", function () {
      this.classList.toggle("note_item_open");
      console.log("Clase agregada dinámicamente a:", this);
    });
  });
}



async function deleteNote(noteId) {
  const { error } = await supabaseClient.from("notes").delete().eq("id", noteId);
  if (error) {
    console.error("Error al eliminar la nota:", error.message);
    return;
  }
  loadNotes();
}

NOTES_FORM.addEventListener("submit", async (event) => {
  event.preventDefault();
  const title = NOTES_INTITLE.value.trim();
  const content = NOTES_TXTAREA.value.trim();
  if (!content) return;

  // Obtener el usuario autenticado
  const { data: { user }, error: authError } = await supabaseClient.auth.getUser();

  if (authError) {
    console.error("Error al obtener el usuario:", authError.message);
    return;
  }

  if (!user) {
    console.error("No hay usuario autenticado");
    return;
  }

  const email = user.email; // Obtener el email del usuario

  if (editingNoteId) {
    const { error } = await supabaseClient
      .from("notes")
      .update({ title, content, email }) // Agregar el email en la actualización
      .eq("id", editingNoteId);

    if (error) {
      console.error("Error al actualizar la nota:", error.message);
      return;
    }
    editingNoteId = null;
    NOTES_BUTTON.textContent = "Agregar";
  } else {
    const { error } = await supabaseClient.from("notes").insert([{ title, content, email }]); // Agregar el email en la inserción
    if (error) {
      console.error("Error al guardar la nota:", error.message);
      return;
    }
  }

  NOTES_INTITLE.value = "";
  NOTES_TXTAREA.value = "";
  loadNotes();
});


loadNotes();
