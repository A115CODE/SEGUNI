// Configuración CORRECTA de Supabase v2
const supabaseUrl = 'https://dvuqnktmjvotdlnbbnhw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2dXFua3RtanZvdGRsbmJibmh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1MTMxNzUsImV4cCI6MjA1NjA4OTE3NX0.NBjk0irYgv23oENmlKSLHJWG6fykfsI8X1hUHrVwT2Y';
const sesion = supabase.createClient(supabaseUrl, supabaseKey);

// Función de login CORREGIDA (usando signInWithPassword)
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Método actualizado para v2
    const { data, error } = await sesion.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        console.error('Error de autenticación:', error.message);
        alert(error.message);
    } else {
        window.location.href = '../app/app.html';
    }
});