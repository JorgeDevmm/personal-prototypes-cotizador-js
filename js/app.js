//SECTION Funciones Constructoras
function Seguro(marca, anio, tipo) {
  this.marca = marca;
  this.anio = anio;
  this.tipo = tipo;
}

function InterfazUsuario() {}

// SECTION métodos de funciones constructoras
// Creación de prototype, llenar opciones de año
InterfazUsuario.prototype.llenarOpciones = () => {
  const max = new Date().getFullYear();
  const min = max - 20;

  // referencias
  const year = document.querySelector('#year');

  // iteramos del rango max a min y vamos creando option con los años iterados
  for (let i = max; i > min; i--) {
    let anios = document.createElement('option');
    anios.textContent = i;
    anios.value = i;
    year.appendChild(anios);
  }
};

// creación mensaje de alerta que valida sea de error o correcto
InterfazUsuario.prototype.mensajeAlerta = function (mensaje, tipo) {
  // Insertar en el Html, con insertBefore elemento, referencia
  // const formulario = document.querySelector('#cotizar-seguro');
  const referencia = document.querySelector('#resultado');

  // Limpiar alertas
  this.limpiarHtml(referencia);

  // Creamos el alerta de mensaje
  const div = document.createElement('P');

  // validacion por tipo
  if (tipo === 'error') {
    div.classList.add('error');
  } else {
    div.classList.add('correcto');
  }

  div.textContent = mensaje;

  // Insertar en el Html, con insertBefore elemento, referencia
  // formulario.insertBefore(div, document.querySelector('#resultado'));
  referencia.appendChild(div);

  // Remover en el html
  setTimeout(() => {
    div.remove();
  }, 3000);
};

// Eliminar los cursos de la listaPublicaciones
InterfazUsuario.prototype.limpiarHtml = (referencia) => {
  // si contenedor tiene al menos un elemento
  while (referencia.firstChild) {
    // eliminar un hijo por el primero
    referencia.removeChild(referencia.firstChild);
  }

  console.log(referencia);
};

// instanciar
const UI = new InterfazUsuario();

//SECTION Eventos
document.addEventListener('DOMContentLoaded', () => {
  UI.llenarOpciones();
});

//SECTION funciones
eventListener();

// TODO función eventListener
function eventListener() {
  const formulario = document.querySelector('#cotizar-seguro');

  // si ocurre un evento en la referencia de formulario
  formulario.addEventListener('submit', cotizarSeguro);
}

// TODO función Cotizar
function cotizarSeguro(e) {
  e.preventDefault();
  // Leer la marcar seleccionada
  const marca = document.querySelector('#marca').value;

  // Leer el año seleccionado
  const year = document.querySelector('#year').value;

  // Leer el tipo de seguro
  const tipo = document.querySelector("input[name='tipo']:checked").value;

  // validando que los valores de los imput estan vacios o no
  if (marca === '' || year === '' || tipo === '') {
    UI.mensajeAlerta(
      `Faltan datos, revisar el formulario y prueba de nuevo`,
      'error'
    );
    return;
  }
  UI.mensajeAlerta(`Si paso la validación`, 'correcto');

  // Instanciar el seguro

  // Utilizar el prototype que va a cotizar
}
