const FRAMEAPP = document.getElementById('FRAMEAPP');

const dashboard = document.createElement('div');
dashboard.classList.add('aplication');
dashboard.id = 'HOME';
dashboard.innerHTML = `
  </$>
  <iframe src="https://supabase.com/" frameborder="0"></iframe>
`;
FRAMEAPP.appendChild(dashboard);
