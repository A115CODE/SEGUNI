// Inicializar Supabase
const { createClient } = supabase;

const Dash_URL = 'https://dvuqnktmjvotdlnbbnhw.supabase.co';
const Dash_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2dXFua3RtanZvdGRsbmJibmh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1MTMxNzUsImV4cCI6MjA1NjA4OTE3NX0.NBjk0irYgv23oENmlKSLHJWG6fykfsI8X1hUHrVwT2Y';
const supabaseClientDashboard = createClient(Dash_URL, Dash_ANON_KEY);

const FRAMEAPP = document.getElementById('FRAMEAPP');
console.log('FRAMEAPP:', FRAMEAPP); // <– Verifica si es null o válido


const dashboard = document.createElement('div');
dashboard.classList.add('aplication');
dashboard.id = 'HOME';
FRAMEAPP.appendChild(dashboard);

const SUPABASE_STATUS = document.createElement('iframe');
SUPABASE_STATUS.src = 'https://status.supabase.com/'
dashboard.appendChild(SUPABASE_STATUS)

const ctx = document.getElementById('TIMES_APP');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 3],
      borderWidth: 1,
      backgroundColor: '#00457d'
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});