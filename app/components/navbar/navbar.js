function navbarBTNS(ID, SRC, TXT) {
  let BUTTON = document.createElement('div');
  BUTTON.id = ID;
  BUTTON.classList.add('nav_button');
  NAVBAR.appendChild(BUTTON);

  let IMG = document.createElement('img');
  IMG.classList.add('img_button');
  IMG.src = SRC;
  BUTTON.appendChild(IMG);

  let TEXT = document.createElement('p');
  TEXT.classList.add('txt');
  TEXT.textContent = TXT;
  BUTTON.appendChild(TEXT);
}

navbarBTNS('HOME_BTN', './assets/home.svg', 'HOME');
navbarBTNS('TASK_BTN', './assets/task.svg', 'TASK');
navbarBTNS('NOTES_BTN', './assets/notes.svg', 'NOTES');
navbarBTNS('DATABASE_BTN', './assets/db.svg', ' DB');