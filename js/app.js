//SECTION Funciones Constructoras
function Seguro(marca, anio, tipo) {
  this.marca = marca;
  this.anio = parseInt(anio);
  this.tipo = tipo;
}

// Realiza la cotización con los datos
Seguro.prototype.cotizarSeguro = function () {
  let cantidad;
  const base = 2000;

  switch (this.marca) {
    case '1':
      cantidad = base * 1.15;
      break;
    case '2':
      cantidad = base * 1.05;
      break;
    case '3':
      cantidad = base * 1.35;
      break;
    default:
      break;
  }

  // Leer el año
  const diferencia = new Date().getFullYear() - this.anio;

  // cada año que la diferencia es mayor, el costo va a reducir un 3 %
  cantidad -= (diferencia * 3 * cantidad) / 100;

  /*
  Si el seguro es básico se multiplica por un 30% más
  Si el seguro es completo se multiplica por un 50% más
  */

  if (this.tipo === 'basico') {
    cantidad *= 1.3;
  } else {
    cantidad *= 1.5;
  }

  return cantidad;
};

// SECTION función constructora
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

InterfazUsuario.prototype.mostrarResultado = (seguro, total) => {
  // destructurar el objeto
  const { marca, anio, tipo } = seguro;

  // estableciendo un nombre en texto de lo valores de marca destructurados
  const textoMarca =
    parseInt(seguro.marca) === 1
      ? 'Americano'
      : parseInt(seguro.marca) === 2
      ? 'Asiatico'
      : parseInt(seguro.marca) === 3
      ? 'Europeo'
      : 'no valido';

  // Crear el resultado
  const div = document.createElement('div');
  div.classList.add('mt-10');

  div.innerHTML = `
    <p class="header">Tu Resumen</p>
    <p class = "font-bold">Marca: <span class="font-normal"> ${textoMarca}</span> </p>
    <p class = "font-bold">Año: <span class="font-normal"> ${anio}</span> </p>
    <p class = "font-bold">Tipo: <span class="font-normal capitalize"> ${tipo}</span> </p>
    <p class = "font-bold">Total: <span class="font-normal">$${total}</span> </p>
  `;
  const resultado = document.querySelector('#resultado');
  const cotizarSeguro = document.querySelector('#cotizar-seguro');

  // Mostrar el spinner
  const spinner = document.querySelector('#cargando');
  spinner.style.display = 'block';

  setTimeout(() => {
    spinner.style.display = 'none'; //Se oculta el spinner
    resultado.appendChild(div); //Se muestra el resultado
    cotizarSeguro.reset();
  }, 3000);
};

// Eliminar elementos de la referencia de alertas
InterfazUsuario.prototype.limpiarHtml = (referencia) => {
  // si contenedor tiene al menos un elemento
  while (referencia.firstChild) {
    // eliminar un hijo por el primero
    referencia.removeChild(referencia.firstChild);
  }
};

// instanciar InterfazUsuario
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
  UI.mensajeAlerta(`Cotizando`, 'correcto');

  // Instanciar el seguro
  const seguro1 = new Seguro(marca, year, tipo);
  const total = seguro1.cotizarSeguro();

  // Utilizar el prototype que va a cotizar
  UI.mostrarResultado(seguro1, total);
}
