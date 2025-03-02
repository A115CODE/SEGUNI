// Crear estructura HTML
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