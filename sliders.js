// numero de sliders en la app
const numeroSlidersTotal = 30;

const slidersValorMin = 0;
const slidersValorMax = 127;

// arreglo para contener los sliders
let arregloSliders = [];

// encontrar div de los sliders
let divSliders = document.getElementById("divSliders");

// BORRADOR DE JSON
// arreglo vacio
// arreglo en ingles es array
// buscar array en javascript para entenderlo
let valoresSliders = [];




// FIN DE BORRADOR DE JSON




// iterar para crear los sliders
for (let i = 0; i < numeroSlidersTotal; i++) {

  // crear un nuevo elemento HTML span
  // en este span se agruparán todos los elementos del slider
  let nuevoSpan = document.createElement("span");

  // crear elemento INPUT para el slider
  let nuevoSlider = document.createElement("INPUT");

  // agregar el slider al final del arreglo
  arregloSliders.push(nuevoSlider);

  // configurar atributos del slider
  nuevoSlider.setAttribute("type", "range");
  nuevoSlider.setAttribute("min", slidersValorMin);
  nuevoSlider.setAttribute("max", slidersValorMax);
  nuevoSlider.setAttribute("step", "any");
  // nuevoSlider.setAttribute("step", 0.0001);

  // configurar estilo CSS del slider
  nuevoSlider.style.appearance = "slider-vertical";
  nuevoSlider.style.width = "25px";
  nuevoSlider.style.height = "100px";
  
  // crear elemento HTML input para la caja de valor del slider
  let nuevoValor = document.createElement("INPUT");

  // configurar atributos de la caja de valor
  nuevoValor.setAttribute("type", "text");

  // configurar estilo CSS de la caja de valor
  nuevoValor.size = "4";
  nuevoValor.maxlength = "4";

  // configurar valor inicial
  nuevoSlider.value = 0;
  nuevoValor.value = nuevoSlider.value;

  // agregar el valor al arreglo de valores
  valoresSliders.push(nuevoValor);

  // agregar el span al div de los sliders
  divSliders.appendChild(nuevoSpan);

  // agregar el slider y la caja de valor al span
  nuevoSpan.appendChild(nuevoSlider);
  nuevoSpan.appendChild(nuevoValor);

  // agregar event listener para el slider
  nuevoSlider.addEventListener("input", function() {
    nuevoValor.value = this.value;
    arregloSliders[i].value = this.value;
    console.log(nuevoValor.value);
  });

  // agregar event listener para la caja de valor
  nuevoValor.addEventListener("keydown", function(event) { 
    if (event.key === "Enter") {
      nuevoSlider.value = this.value;
      arregloSliders[i].value = this.value;
    }
  });
 
}