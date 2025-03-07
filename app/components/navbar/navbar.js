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

navbarBTNS('HOME_BTN', './assets/home.svg', 'Home');
navbarBTNS('TIME_BTN', './assets/time.svg', ' Time');
navbarBTNS('DATABASE_BTN', './assets/db.svg', 'DataBase');
navbarBTNS('TASK_BTN', './assets/task.svg', 'Task');
navbarBTNS('NOTES_BTN', './assets/notes.svg', 'Notes');
