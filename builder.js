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
DEPLOY_SCRIPT('./app/app.js');

// APPS
//TASKS
DEPLOY_SCRIPT('./app/modules/task/task.js');
DEPLOY_CSS('./app/modules/task/task.css');
//NOTES
DEPLOY_SCRIPT('./app/modules/notes/notes.js');
DEPLOY_CSS('./app/modules/notes/notes.css');
//DASHBOARD
DEPLOY_SCRIPT('./app/modules/dashboard/dashboard.js');
DEPLOY_CSS('./app/modules/dashboard/dashboard.css');

// COMPONENTS
//  Navbar
DEPLOY_SCRIPT('./app/components/navbar/navbar.js');
DEPLOY_SCRIPT('./app/components/navbar/controller.js');
DEPLOY_CSS('./app/components/navbar/navbar.css');

//  Header
DEPLOY_SCRIPT('./app/components/header/header.js');
DEPLOY_CSS('./app/components/header/header.css');
