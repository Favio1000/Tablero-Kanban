// Seleccionar los elementos del DOM
const botonAbrir = document.querySelectorAll(".add-task-button");
const botonCerrar = document.getElementById("btnCerrar");
const modal = document.getElementById("miModal");
/*
// Abrir la ventana emergente al hacer clic
botonAbrir.addEventListener("click", () => {
  modal.showModal(); // Bloquea el fondo automáticamente
});
*/
botonAbrir.forEach((boton) => {
  boton.addEventListener("click", () => {
    modal.showModal(); // Bloquea el fondo automáticamente
  });
});
// Cerrar la ventana emergente al hacer clic en Cancelar
botonCerrar.addEventListener("click", () => {
  modal.close();
});
