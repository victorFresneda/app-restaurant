let cliente = {
  mesa: "",
  hora: "",
  pedido: [],
};

const categorias = {
  1: 'Comida',
  2: 'Bebidas',
  3: 'Postres'
}

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
      .catch( error => alert(error))

      
}

function mostrarPlatillos(platillos){
  const contenido = document.querySelector('#platillos .contenido');

  platillos.forEach( platillo => {
    const row = document.createElement('DIV');
    row.classList.add('row', 'py-3', 'border-top');

    const nombre = document.createElement('DIV');
    nombre.classList.add('col-md-4');
    nombre.textContent = platillo.nombre;

    const precio = document.createElement('DIV');
    precio.classList.add('col-md-3', 'fw-bold');
    precio.textContent = `$${platillo.precio}`

    const categoria = document.createElement('DIV');
    categoria.classList.add('col-md-3', '.text-primary');
    categoria.textContent = categorias[platillo.categoria];

    const inputCantidad = document.createElement('INPUT');
    inputCantidad.type = 'Number';
    inputCantidad.min = 0;
    inputCantidad.value = 0;
    inputCantidad.id = `producto-${platillo.id}`;
    inputCantidad.classList.add('form-control');

    // Funcion que detecta la cantidad y el platillo que se esta agregando 

    inputCantidad.onchange = function(){
      const cantidad = parseInt (inputCantidad.value);
      agregarPlatillo({...platillo, cantidad});
    };

    const agregar = document.createElement('DIV');
    agregar.classList.add('col-md-2');
    agregar.appendChild(inputCantidad);




    row.appendChild(nombre);
    row.appendChild(precio);
    row.appendChild(categoria);
    row.appendChild(agregar);




    contenido.appendChild(row);
  })
}

function agregarPlatillo(producto){
  // Extraer el pedido actual
  let { pedido } = cliente; 

  // Revisar que la cantidad sea mayor a cero 
  if(producto.cantidad > 0){
    
      if(pedido.some(articulo => articulo.id === producto.id)){
          // El articulo ya existe, actualizar la cantidad
          const pedidoActalizado = pedido.map(articulo => {
            if( articulo.id === producto.id){
              articulo.cantidad = producto.cantidad;
            }
            return articulo;

          });
          // Se asigna el nuevo array a cliente.pedido
          cliente.pedido = [...pedidoActalizado]
      }else{
        // El articulo no existe, lo agregamos al array de pedidos
        cliente.pedido = [...pedido, producto];
      }
  }else{
    // Eliminar elementos cuando la cantidad es 0
    // const resultado = pedido.filter( articulo => articulo.id !== producto.id);
  console.log("Es menor a cero")
    
  }

  console.log(cliente.pedido)
  console.log(producto)



}
