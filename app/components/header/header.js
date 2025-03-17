const HEADER = document.getElementById('HEADER');

function headerBUTTONS(ID, SRC) {
  let IMG = document.createElement('img');
  IMG.id = ID;
  IMG.src = SRC;
  HEADER.appendChild(IMG);
}

headerBUTTONS('LOGO', '../assets/logo.png');
headerBUTTONS('SINGOUT', '../assets/out.svg');
