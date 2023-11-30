// Constructores
function Seguro(marca, anio, tipo) {
  this.marca = marca;
  this.anio = anio;
  this.tipo = tipo;
}

function InterfazUsuario() {}

//LINK Creación de prototype, llenar opciones de año
InterfazUsuario.prototype.llenarOpciones = function () {
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

// instanciar
const UI = new InterfazUsuario();

// Eventos
document.addEventListener('DOMContentLoaded', () => {
  UI.llenarOpciones();
});

eventListener();
function eventListener() {
  const formulario = document.querySelector('#cotizar-seguro');

  // si ocurre un evento en la referencia de formulario
  formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e) {
  e.preventDefault();
  // Leer la marcar seleccionada
  const marca = document.querySelector('#marca').value;

  // Leer el año seleccionado
  const year = document.querySelector('#year').value;
  console.log(year);

  // Leer el tipo de seguro
  const tipo = document.querySelector("input[name='tipo']:checked").value;
  console.log(tipo);

  // validando

  if (marca === '' || year === '' || tipo === '') {
    console.log(`No paso la validación`);
  } else {
    console.log(`Si paso la validación`);
  }
}
