function DEPLOY_SCRIPT(SRC) {
  const SCRIPT = document.createElement('script');
  SCRIPT.type = 'module';
  SCRIPT.src = SRC;
  document.body.appendChild(SCRIPT);
}
function DEPLOY_CSS(URL) {
  const CSS = document.createElement('link');
  CSS.rel = 'stylesheet';
  CSS.href = URL;
  document.head.appendChild(CSS);
}

// APP
DEPLOY_SCRIPT('./app.js');

// APPS
//TIME
DEPLOY_SCRIPT('./modules/time/time.js');
DEPLOY_CSS('./modules/time/time.css');
//TASKS
DEPLOY_SCRIPT('./modules/task/task.js');
DEPLOY_CSS('./modules/task/task.css');
//NOTES
DEPLOY_SCRIPT('./modules/notes/notes.js');
DEPLOY_CSS('./modules/notes/notes.css');
//DATABASE
DEPLOY_SCRIPT('./modules/database/database.js');
DEPLOY_CSS('./modules/database/database.css');
//DASHBOARD
DEPLOY_SCRIPT('./modules/dashboard/dashboard.js');
DEPLOY_CSS('./modules/dashboard/dashboard.css');

// COMPONENTS
//  Navbar
DEPLOY_SCRIPT('./components/navbar/navbar.js');
DEPLOY_SCRIPT('./components/navbar/controller.js');
DEPLOY_CSS('./components/navbar/navbar.css');

//  Header
DEPLOY_SCRIPT('./components/header/header.js');
DEPLOY_CSS('./components/header/header.css');
