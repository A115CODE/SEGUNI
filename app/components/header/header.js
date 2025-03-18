
  console.log("Documento cargado"); // Verifica que el evento se ejecuta

  const HEADER = document.getElementById("HEADER");

  function headerBUTTONS(ID, SRC, isButton = false) {
    if (isButton) {
      let BTN = document.createElement("button");
      BTN.id = ID;
      BTN.style.border = "none";
      BTN.style.background = "none";
      BTN.style.cursor = "pointer";

      let IMG = document.createElement("img");
      IMG.src = SRC;
      IMG.alt = ID;

      BTN.appendChild(IMG);
      HEADER.appendChild(BTN);
    } else {
      let IMG = document.createElement("img");
      IMG.id = ID;
      IMG.src = SRC;
      HEADER.appendChild(IMG);
    }
  }

  // Crear los botones
  headerBUTTONS("LOGO", "../assets/logo.png");
  headerBUTTONS("LOG_OUT", "../assets/out.svg", true); // Esto lo convierte en botón

  // Inicializar Supabase
  const hola = supabase.createClient(
    "https://dvuqnktmjvotdlnbbnhw.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2dXFua3RtanZvdGRsbmJibmh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1MTMxNzUsImV4cCI6MjA1NjA4OTE3NX0.NBjk0irYgv23oENmlKSLHJWG6fykfsI8X1hUHrVwT2Y"
  );

  // Verificar que el botón de logout existe
  const LOG_OUT = document.getElementById("LOG_OUT");

  console.log("LOG_OUT encontrado:", LOG_OUT); // Verifica si se encuentra el botón

  if (LOG_OUT) {
    LOG_OUT.addEventListener("click", async () => {
      console.log("Clic en LOG_OUT");
      const { error } = await hola.auth.signOut();
      if (!error) {
        console.log("Sesión cerrada con éxito");
        window.location.href = "../../../login/login.html";
      } else {
        console.error("Error al cerrar sesión:", error);
      }
    });
  } else {
    console.error("No se encontró el botón de logout.");
  }