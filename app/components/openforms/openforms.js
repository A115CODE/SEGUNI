function OPEN_FORMS_APPS() {
    //Logica para abrir y cerrar los forms de las apps
// Al principio, ocultamos el formulario usando la clase "hidden"
NOTES_FORM.style.display = "none";
// Evento para abrir/cerrar el formulario al hacer clic en el botón
OPEN_FORM.addEventListener("click", function () {
  if (NOTES_FORM.style.display === "none") {
    NOTES_FORM.style.display = "flex"; // Mostrar el formulario
    OPEN_FORM.textContent = "X"; // Cambiar texto del botón
  } else {
    NOTES_FORM.style.display = "none"; // Ocultar el formulario
    OPEN_FORM.textContent = "+"; // Cambiar texto del botón
  }

  console.log("Formulario visible:", NOTES_FORM.style.display === "block");
});
}

/*
//Logica para abrir y cerrar los forms de las apps
// Al principio, ocultamos el formulario usando la clase "hidden"
FORM.style.display = "none";
// Evento para abrir/cerrar el formulario al hacer clic en el botón
OPEN_FORM_TASK.addEventListener("click", function () {
  // Alternar la visibilidad del formulario
  if (FORM.style.display === "none") {
    FORM.style.display = "block"; // Mostrar el formulario
    OPEN_FORM_TASK.textContent = "X"; // Cambiar texto del botón
  } else {
    FORM.style.display = "none"; // Ocultar el formulario
    OPEN_FORM_TASK.textContent = "+"; // Cambiar texto del botón
  }
*/