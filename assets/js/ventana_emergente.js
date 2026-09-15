// Seleccionar los elementos del DOM
const botonAbrir = document.querySelectorAll(".add-task-button");
const botonCerrar = document.getElementById("btnCerrar");
const modal = document.getElementById("miModal");

botonAbrir.forEach((boton) => {
  boton.addEventListener("click", () => {
    modal.showModal();
  });
});
// Cerrar la ventana emergente al hacer clic en Cancelar
botonCerrar.addEventListener("click", () => {
  modal.close();
});
