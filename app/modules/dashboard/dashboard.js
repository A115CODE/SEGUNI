const FRAMEAPP = document.getElementById('FRAMEAPP');

const dashboard = document.createElement('div');
dashboard.classList.add('aplication');
dashboard.id = 'HOME';
dashboard.innerHTML = `
  Hola desde dashboard
  <iframe src="https://supabase.com/" frameborder="0"></iframe>
`;
FRAMEAPP.appendChild(dashboard);
