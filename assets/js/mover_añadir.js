// 1. Seleccionamos los elementos del DOM

const columnas = document.querySelectorAll(".kanban-column");

// 3. Eventos para las Columnas (Las que reciben las tareas)
columnas.forEach((columna) => {
  // Permite soltar elementos dentro de la columna
  columna.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  // Evento cuando se suelta la tarea
  columna.addEventListener("drop", (e) => {
    e.preventDefault();

    // Recuperamos el ID de la tarea guardado en dragstart
    const idTarea = e.dataTransfer.getData("text/plain");
    const tareaArrastrada = document.getElementById(idTarea);

    // Movemos la tarea al final de la nueva columna
    if (tareaArrastrada) {
      columna.children[1].appendChild(tareaArrastrada);
    }
  });
});

let contadorTareas = 0;

// 1. Seleccionamos el contenedor donde se van a meter las tarjetas

const template = document.getElementById("template-task-card");

function agregarNuevaTarea(
  id,
  titulo,
  prioridad,
  descripcion,
  fecha,
  usuario,
  columna,
) {
  // 1. Clonar el contenido del template (true asegura que clone también los hijos)
  const contenedor = document.getElementById(columna);
  const clon = template.content.cloneNode(true);

  // 2. Modificar los datos del clon buscando por sus clases
  const tarjeta = clon.querySelector(".task-card");
  tarjeta.setAttribute("id", id); // Asignamos el ID dinámico

  clon.querySelector(".task-card__number").textContent = `Tarea-${id}`;
  clon.querySelector(".task-card__priority").textContent = prioridad;
  clon.querySelector(".task-card__texto").textContent = descripcion;
  clon.querySelector(".tast-card__title").textContent = titulo;
  clon.querySelector(".task-card__date").textContent = fecha;
  clon.querySelector(".task-card__assigned").textContent = usuario;
  // 3. Inyectar el clon ya rellenado en el contenedor real del HTML
  contenedor.appendChild(clon);

  let tarea = document.getElementById(id);

  tarea.addEventListener("dragstart", (e) => {
    // Guardamos el ID de la tarea que se está arrastrando
    e.dataTransfer.setData("text/plain", e.target.id);
  });
}

/*==================================
Boton enviar del formulario
===================================*/

// Escuchar el evento cuando se envía el formulario del modal
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault(); // Evita que la página se recargue
  contadorTareas++;
  // Capturar los valores que el usuario escribió en los inputs
  let titulo = document.getElementById("title-input").value;
  let descripcion = document.getElementById("description-input").value;
  let prioridad = document.getElementById("priority-input").value;
  let fecha = document.getElementById("date-input").value;
  let columna_entrada = document.getElementById("columns-input").value;
  let usuario = document.getElementById("users-input").value;

  const nuevaTarea = {
    id: contadorTareas,
    title: titulo,
    description: descripcion,
    priority: prioridad,
    dueDate: fecha,
    user: usuario,
    status: columna_entrada,
  };

  fetch("http://localhost:3000/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },

    body: JSON.stringify(nuevaTarea), //db.json
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Tarea guardada:", data);

      //funcion agregarNuevaTarea
      agregarNuevaTarea(
        contadorTareas,
        titulo,
        prioridad,
        descripcion,
        fecha,
        usuario,
        columna_entrada,
      );

      // Cerrar el modal y limpiar el formulario
      miModal.close();
      e.target.reset();
    });
});
/*==================================
CARGAR TAREAS
 ===================================*/
function cargarTareas() {
  fetch("http://localhost:3000/tasks")
    .then((response) => response.json())
    .then((tasks) => {
      tasks.forEach((tarea) => {
        agregarNuevaTarea(
          tarea.id,
          tarea.title,
          tarea.priority,
          tarea.description,
          tarea.dueDate,
          tarea.user, // usuario
          tarea.status,
        );
      });
    })
    .catch((error) => {
      console.error("Error al cargar las tareas:", error);
    });
}

cargarTareas();

const tareas = document.querySelectorAll("div");

tareas.forEach((tarea) => {
  tarea.addEventListener("click", (e) => {
    const idTarea = e.currentTarget.id;

    console.log("Has hecho click en:", idTarea);
  });
});
