const FRAMEAPP = document.getElementById('FRAMEAPP');

const NOTES = document.createElement('section');
NOTES.classList.add('aplication');
NOTES.id = 'NOTES';
FRAMEAPP.appendChild(NOTES);

const NOTES_TXT = document.createElement("h3");
NOTES_TXT.textContent = "Notas Rapidas";
NOTES.appendChild(NOTES_TXT);

const NOTES_FORM = document.createElement("form");
NOTES_FORM.id = "NOTES_FORM";
NOTES.appendChild(NOTES_FORM);

const NOTES_TXTAREA = document.createElement("textarea")
NOTES_TXTAREA.id = "NOTES_TXTAREA";
NOTES_TXTAREA.placeholder = "Nota Rapida..."
NOTES_FORM.appendChild(NOTES_TXTAREA);

const NOTES_BUTTON = document.createElement("button");
NOTES_BUTTON.id = "NOTES_BUTTON";
NOTES_FORM.appendChild(NOTES_BUTTON);