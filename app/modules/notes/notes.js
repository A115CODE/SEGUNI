const FRAMEAPP = document.getElementById('FRAMEAPP');

const NOTES = document.createElement('section');
NOTES.classList.add('aplication');
NOTES.id = 'NOTES';
NOTES.innerHTML = `
   
        <h1>Notas Rápidas</h1>
        <textarea id="notaInput" placeholder="Escribe tu nota aquí..."></textarea>
        <button id="save">Guardar Nota</button>
        <div id="notasContainer"></div>
    
`;
FRAMEAPP.appendChild(NOTES);

const NOTES_FORM = document.createElement("form");