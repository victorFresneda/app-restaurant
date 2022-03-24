let cliente = {
  mesa: "",
  hora: "",
  pedido: [],
};

const btnGuardarCliente = document.querySelector("#guardar-cliente");
btnGuardarCliente.addEventListener("click", guardarCliente);

function guardarCliente() {
  const mesa = document.querySelector("#mesa").value;
  const hora = document.querySelector("#hora").value;

  // Revisar si hay campos vacios

  const camposVacios = [mesa, hora].some((campo) => campo === "");

  if (camposVacios) {
    // Veririficar si exite un alerta

    const existeAlerta = document.querySelector(".invalid-feedback");

    if (!existeAlerta) {
      const alerta = document.createElement("DIV");
      alerta.classList.add("invalid-feedback", "d-block", "text-center");
      alerta.textContent = "Todos los campos son obligatorios";
      document.querySelector(".modal-body form").appendChild(alerta);
      
    //   Elimina mensaje
      setTimeout(() => {
          alerta.remove();
      }, 3000);
    }

    return;

  } 

  cliente = {...cliente, hora, mesa}

    
    // Ocultar modal

    const modalFormulario = document.querySelector('#formulario');
    const modalBootstrap = bootstrap.Modal.getInstance(modalFormulario);
    modalBootstrap.hide();

    // Mostrar las secciones

    mostrarSecciones();

    // Obtener platillos de la API de JSON-Server

    obtenerPlatillos();
  
}

function mostrarSecciones(){
  const seccionesOcultas = document.querySelectorAll('.d-none');
  seccionesOcultas.forEach(seccion => seccion.classList.remove('d-none'));
}

function obtenerPlatillos(){
  const url = 'http://localhost:4000/platillos';

  fetch(url)
      .then(respuesta => respuesta.json())
      .then( resultado => mostrarPlatillos(resultado))
      .catch( error => console.log(error))

      
}

function mostrarPlatillos(platillos){
  const contenido = document.querySelector('#platillos .contenido');

  platillos.forEach( platillo => {
    console.log(platillo);
  })
}
