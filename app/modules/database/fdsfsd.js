<!-- Botón y campos para guardar -->
<input type="text" id="nombreMapa" placeholder="Nombre del mapa mental">
<input type="email" id="correoUsuario" placeholder="Correo del usuario">
<button id="btnGuardar">Guardar Mapa Mental</button>




let currentXml = null;

// Captura XML del mensaje de exportación
window.addEventListener('message', function (evt) {
  const msg = JSON.parse(evt.data);

  if (msg.event === 'export') {
    currentXml = msg.data;
    guardarEnSupabase(currentXml);
  }

  if (msg.event === 'save') {
    // También puedes guardar directamente desde aquí
    currentXml = msg.xml;
    guardarEnSupabase(currentXml);
  }
});

async function guardarEnSupabase(xml) {
  const nombre = document.getElementById('nombreMapa').value;
  const correo = document.getElementById('correoUsuario').value;

  if (!nombre || !correo || !xml) {
    alert("Faltan datos para guardar");
    return;
  }

  const { data, error } = await supabaseClient.from('mapas_mentales').insert([
    {
      nombre,
      xml,
      correo_usuario: correo
    }
  ]);

  if (error) {
    console.error("Error guardando:", error);
    alert("Error al guardar el mapa");
  } else {
    console.log("Mapa guardado con éxito:", data);
    alert("¡Mapa mental guardado!");
  }
}

// Acción del botón manual de guardar
document.getElementById('btnGuardar').addEventListener('click', () => {
  iframe.contentWindow.postMessage(
    JSON.stringify({ action: 'export' }),
    '*'
  );
});
