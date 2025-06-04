// Inicializar Supabase
const { createClient } = supabase;

const Dash_URL = 'https://dvuqnktmjvotdlnbbnhw.supabase.co';
const Dash_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2dXFua3RtanZvdGRsbmJibmh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1MTMxNzUsImV4cCI6MjA1NjA4OTE3NX0.NBjk0irYgv23oENmlKSLHJWG6fykfsI8X1hUHrVwT2Y';
const supabaseClientDashboard = createClient(Dash_URL, Dash_ANON_KEY);

const FRAMEAPP = document.getElementById('FRAMEAPP');

const dashboard = document.createElement('div');
dashboard.classList.add('aplication');
dashboard.id = 'HOME';
FRAMEAPP.appendChild(dashboard);

const SUPABASE_STATUS = document.createElement('iframe');
SUPABASE_STATUS.src = 'https://status.supabase.com/'
dashboard.appendChild(SUPABASE_STATUS)

function DEPLOY_CANVAS(ID) {
  const CANVAS = document.createElement('canvas');
  CANVAS.id = ID;
  dashboard.appendChild(CANVAS);
}

DEPLOY_CANVAS('TIMES_APP');
DEPLOY_CANVAS('4DX_APP');
DEPLOY_CANVAS('NOTES_APP')
DEPLOY_CANVAS('DB_APP')

    // —— Función para obtener conteo y pintar gráfico ——
    async function dibujarGraficoTareas() {
      // 1) Obtener sólo el count de la tabla “tareas”
      const { count, error } = await supabaseClientDashboard
        .from('tareas')
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.error('Error al traer el conteo de tareas:', error);
        return;
      }

      // 2) Tomar el contexto del canvas y crear el chart
      const ctx = document.getElementById('TIMES_APP').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Tareas'],
          datasets: [{
            label: 'Total de registros en “tareas”',
            data: [count],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: { precision: 0 }
            }
          },
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: `Total de filas en “tareas”: ${count}`
            }
          }
        }
      });
    }

    // —— Ejecutar cuando el DOM esté listo ——
    window.addEventListener('DOMContentLoaded', dibujarGraficoTareas);