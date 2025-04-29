function controller(ID_BTN, ID_APP) {
  document.getElementById(ID_BTN).addEventListener('click', function () {
    // Oculta todos los elementos con la clase aplication
    document.querySelectorAll('.aplication').forEach((el) => {
      el.style.visibility = 'hidden';
    });

    // Obtiene el elemento específico que se va a mostrar
    let APLICATION = document.getElementById(ID_APP);

    // Si ya estaba visible, lo oculta; si no, lo muestra
    APLICATION.style.visibility =
      APLICATION.style.visibility === 'visible' ? 'hidden' : 'visible';
  });
}

// Llamadas a la función, asignando la misma clase a los elementos controlados
controller('HOME_BTN', 'HOME');
controller('TIME_BTN', 'TIME');
controller('DATABASE_BTN', 'DATABASE');
controller('TASK_BTN', 'SPAX');
controller('NOTES_BTN', 'NOTES');