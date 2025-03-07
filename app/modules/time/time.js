// Inicializar Supabase
const { createClient } = supabase;

const SUPABASE_URL = 'https://dvuqnktmjvotdlnbbnhw.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2dXFua3RtanZvdGRsbmJibmh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1MTMxNzUsImV4cCI6MjA1NjA4OTE3NX0.NBjk0irYgv23oENmlKSLHJWG6fykfsI8X1hUHrVwT2Y';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const FRAMEAPP = document.getElementById('FRAMEAPP');

const TIME = document.createElement('section');
TIME.classList.add('aplication');
TIME.id = 'TIME';
FRAMEAPP.appendChild(TIME);

const TIME_TXT = document.createElement('h3');
TIME_TXT.id = 'TIME_TXT';
TIME_TXT.textContent = 'Tiempos de Soporte';
TIME.appendChild(TIME_TXT);

const TIME_FORM = document.createElement('form');
TIME_FORM.id = 'TIME_FORM';
TIME.appendChild(TIME_FORM);