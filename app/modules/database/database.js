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
