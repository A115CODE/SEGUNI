const DASHBOARD = document.createElement('div');
DASHBOARD.id = 'DASHBOARD';
document.body.appendChild(DASHBOARD);

const NAVBAR = document.createElement('nav');
NAVBAR.id = 'NAVBAR';
DASHBOARD.appendChild(NAVBAR);

const HEADER = document.createElement('header');
HEADER.id = 'HEADER';
DASHBOARD.appendChild(HEADER);

const FRAMEAPP = document.createElement('div');
FRAMEAPP.id = 'FRAMEAPP';
DASHBOARD.appendChild(FRAMEAPP);

// app.js
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(function(registration) {
        console.log('Service Worker registrado:', registration);
      })
      .catch(function(error) {
        console.log('Error al registrar el Service Worker:', error);
      });
  }