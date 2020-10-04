/////////////////////////////////////////////////////////    theme    //////////////////////////////////////////

let dropdown = document.getElementById('theme');
console.log(dropdown);
let menuOpen = false;

function toggleMenu() {
  menuOpen = !menuOpen;
  dropdown.classList.toggle('mostrar');
}

document.body.onload = () => {
  var estilo = sessionStorage.getItem("estilo");
  if (estilo === null)
    estilo = "css/day.css";
  document.getElementById('estilo').href = estilo;
}

const temaDay = document.querySelector('#day');
const temaDark = document.querySelector('#dark');

temaDay.addEventListener('click', (e) => {
  document.getElementById('estilo').href = 'css/day.css';
  sessionStorage.setItem("estilo", "css/day.css");
});
temaDark.addEventListener('click', (e) => {
  document.getElementById('estilo').href = 'css/dark.css';
  sessionStorage.setItem("estilo", "css/dark.css");
});


////////////////////////////////////////////////////////// end of theme //////////////////////////////////////

///////////////////////////////////////////////////// GIPHYS //////////////////////////////////////////////////////////////

const GIPHY_SEARCH_URL = "https://api.giphy.com/v1/gifs/search?api_key=B9XlYW5scIFzMSBqfDxL1xRPPSjhs3kh&q=";
const completeURL = "&limit=25&offset=" + 4 + "&rating=G&lang=es";
const GIPHY_RANDOM_URL = "https://api.giphy.com/v1/gifs/random?api_key=B9XlYW5scIFzMSBqfDxL1xRPPSjhs3kh&tag=" + "" + "&rating=G";
const GIPHY_TRENDING_URL = "https://api.giphy.com/v1/gifs/trending?api_key=B9XlYW5scIFzMSBqfDxL1xRPPSjhs3kh&limit=25&rating=G";
const GIPHY_UPLOAD_URL = "https://upload.giphy.com/v1/gifs?api_key=B9XlYW5scIFzMSBqfDxL1xRPPSjhs3kh&source_image_url=";
// const API_KEY = "B9XlYW5scIFzMSBqfDxL1xRPPSjhs3kh";
const GIPHY_CATEGORIES = "https://api.giphy.com/v1/trending/searches?&api_key=B9XlYW5scIFzMSBqfDxL1xRPPSjhs3kh";
const GetById = "https://api.giphy.com/v1/gifs/"
const completeGetById = "?api_key=B9XlYW5scIFzMSBqfDxL1xRPPSjhs3kh"
const API_AUTOCOMPLETE = "https://api.giphy.com/v1/gifs/search/tags?&api_key=B9XlYW5scIFzMSBqfDxL1xRPPSjhs3kh&q=";
let clave = undefined;
var ID = localStorage.getItem(clave);
var misGuifosSection = document.getElementById("misGuifosSection");
const keyword = document.getElementById("keyword");

let imgRandom = document.querySelectorAll(".gif-sug");

let thisURL = undefined;

////////////////////////////////////////////////// EVENTOS BOTON SEARCH /////////////////////////////////////////////////////
//Oculta Sugerencias
document.getElementById("btn").addEventListener("click", function () {
  var sugerencias = document.getElementById("sugerencias");
  sugerencias.setAttribute("class", "hidden");
})
//Cambia Placeholder de Tendencias a Keyword
document.getElementById("btn").addEventListener("click", function () {
  var lookup = document.getElementById("lookup");
  lookup.setAttribute("placeholder", keyword.value);
  localStorage.setItem("Keyword", keyword.value);
});

// Borra el espacio de busquedas
document.getElementById("btn").addEventListener("click", function () {
  keyword.setAttribute("placeholder", "");
});


/////////////////////////////////////////////////   Borro lista clickeando en search    /////////////////////////////////////////////
document.getElementById("btn").addEventListener("click", function () {
  var eraseOptions = document.getElementById("box-search");
  eraseOptions.style.display = "none";
});


let newKeyword = localStorage.getItem("Keyword");

/////////////////////////////     Busqueda de gifs  ///////////////////////
//Guarda la palabra de busqueda como keyword

document.getElementById("btn").addEventListener("click", function () {
  const keyword = document.getElementById("keyword").value;
  localStorage.setItem("Keyword", keyword);
  console.log("Keyword now is... " + localStorage.getItem("Keyword"))

  async function buscarGifs() {
    // const consulta = await fetch(GIPHY_SEARCH_URL + keyword + completeURL);
    const consulta = await fetch(GIPHY_SEARCH_URL + keyword + completeURL);
    const consultaJson = await consulta.json();
    console.log("Json de Buscar Gifs es ", consultaJson);
    return consultaJson;
  }
  buscarGifs();

  async function insertSearch() {
    let misSearch = await buscarGifs(newKeyword);
    console.log("mis Nodos para Search son " + imgNodes);

    for (let i = 0; i < imgNodes.length; i++) {
      let unGif = misSearch.data[i].images["480w_still"].url;
      imgNodes[i].setAttribute("src", unGif);
      let nombre = misSearch.data[i].title;
      trendName[i].innerText = "#" + nombre;
      console.log("Las imagenes que voy a usar para Search son " + imgNodes);
    }
  }
  insertSearch();

  document.getElementById("keyword").value = null;
})



///Elige la opcion de la lista ("li") para ponerlo en el input
var options = document.getElementsByClassName("option");
for (let i = 0; i < options.length; i++) {
  options[i].addEventListener("click", function () {
    keyword.value = this.innerHTML;
    localStorage.setItem("Keyword", keyword.value);
    console.log("keyword from list is.. " + localStorage.getItem("Keyword"));
  });
}

// Oculta las opciones al seleccionar una
var options = document.getElementsByTagName("ul");
for (let i = 0; i < options.length; i++) {
  options[i].addEventListener("click", function () {
    box_search.style.display = "none";
  });
}

var box_search = document.getElementById("box-search");

// Cuando empiezo a escribir en la search box
document.getElementById("keyword").addEventListener("keyup", finder);

// Creando filtrado de busqueda
function finder() {
  filter = keyword.value.toUpperCase();
  var li = box_search.getElementsByTagName("li");
  // Recorriendo elementos a filtrar mediante los li
  for (i = 0; i < li.length; i++) {
    var a = li[i].getElementsByTagName("a")[0];
    textValue = a.textContent || a.innerText;

    // QUIERO QUE ME APAREZCAN LAS OPCIONES SI TEXTVALUE.STARTSWITH = FILTER 

    if (textValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "flex";
      box_search.style.display = "flex";
      if (keyword.value === "") {
        box_search.style.display = "none";
      }
    }
    else {
      li[i].style.display = "none";
    }

  }

}

// Muestra los tags despues de la busqueda
var tags = document.getElementById("tags");
document.getElementById("btn").addEventListener("click", function () {
  tags.style.display = "flex";
});

document.getElementById("buttonCrear").addEventListener("click", function () {
  tags.setAttribute("class", "hidden");
});

////////////////////////////////////////////  Quiero que me guarde el contenido de texto de los tags buttons 

var tagBtn = document.getElementById("tags").children;
for (let i = 0; i < tagBtn.length; i++) {
  document.getElementById("tags").children[i].addEventListener("click", function () {
    keyword.value = this.innerText;
    localStorage.setItem("Keyword", this.innerText);
    console.log("Keyword from tags now is: " + localStorage.getItem("Keyword"));
  });
}
for (i = 0; i < tagBtn.length; i++) {
  document.getElementById("tags").children[i].addEventListener("click", function () {
    keyword.setAttribute("placeholder", localStorage.getItem("Keyword"));
  });
}
///////////////////////////////////////////////////   FIN EVENTOS BOTON SEARCH /////////////////////////////////////////////

/////////////////////////////////////////////// GENERO SUGERENCIAS ////////////////////////////////////////////////

for (i = 0; i < 4; i++) {

  var newGif = document.createElement("div");
  newGif.setAttribute("class", "gif");
  newGif.setAttribute("display", "grid");
  document.getElementById("gridarea").appendChild(newGif);

  var parent = document.getElementsByClassName("gif")[0].parentNode;
  parent.appendChild(newGif);

  var elemento = document.createElement("div");
  var contenido = document.createTextNode("#");

  elemento.appendChild(contenido);
  elemento.setAttribute("width", "100%");
  elemento.setAttribute("class", "bar gifbar");
  elemento.setAttribute("id", "title");

  newGif.appendChild(elemento);

  var image = document.createElement("img");
  var img = elemento.appendChild(image);
  img.setAttribute("width", "100%");
  img.setAttribute("id", "img");
  img.setAttribute("class", "gifSug");
  newGif.appendChild(image);

  var button = document.createElement("btn");
  var verMas = document.createTextNode("Ver más...");
  button.setAttribute("class", "btn");
  button.appendChild(verMas);
  newGif.appendChild(button);
}

///////////////////////////////////////////////////   FIN GENERAR SUGERENCIAS  /////////////////////////////////////////////

////////////////////////////////////////////////////////////// SUGERENCIAS  ///////////////////////////////////////////////////////////

async function buscarRandom() {
  const consulta = await fetch(GIPHY_RANDOM_URL);
  const consultaJson = await consulta.json();
  console.log("El Json de mi Random Gifs es ", consultaJson);
  return consultaJson;
}
buscarRandom();

async function sugerir() {
  for (let i = 0; i < 4; i++) {
    let misRandom = await buscarRandom("");
    const pic = document.querySelectorAll("#gridarea .gif .gifSug")[i];
    const hash = document.querySelectorAll("#gridarea .gif .gifbar")[i];
    let miRandom = misRandom.data.image_original_url;
    pic.src = miRandom;
    let name = misRandom.data.title;
    hash.innerText = "# " + name;
  }
}
sugerir();

/////////////////////////////////////////////////////  FIN SUGERENCIAS ///////////////////////////////////////////////

///////////////////////////////////////////////////////     TRENDING      //////////////////////////////////////////////

async function buscarTrends(q) {
  const consulta = await fetch(GIPHY_TRENDING_URL);
  const consultaJson = await consulta.json();
  console.log("El Json de Trending Gifs ", consultaJson);
  return consultaJson;
}
buscarTrends();
let imgNodes = document.querySelectorAll(".gifTrends");
let trendName = document.querySelectorAll(".bar1");
async function insertTrends() {
  let misGifs = await buscarTrends("");
  console.log("mis Nodos para Trends son " + imgNodes);

  for (let position = 0; position < imgNodes.length; position++) {
    let unGif = misGifs.data[position].images.original_still.url;
    imgNodes[position].setAttribute("src", unGif);
    let nombre = "# " + misGifs.data[position].title;
    trendName[position].innerText = nombre;
    console.log("Las imagenes que voy a usar para Trends son " + imgNodes);
  }
}
insertTrends();

///////////////////////////////////////  ME SACA EL DISPLAY NONE PARA QUE SE VEAN LOS NOMBRES de Trends

var trends = document.querySelectorAll(".gifTrends");
for (let i = 0; i < trends.length; i++) {
  trends[i].addEventListener("mouseover", function () {
    let bar = this.parentNode.children[1];
    bar.style.display = "block";
  });
  trends[i].addEventListener("mouseout", function () {
    let bar = this.parentNode.children[1];
    bar.style.display = "none";
  });
}

///////////////////////////////////////////////////////     REQUEST BY ID      //////////////////////////////////////////////
var insertMisGifs = "";
var x = "";

{
  async function getGifs() {
    clave = localStorage.key(x);
    ID = localStorage.getItem(clave);
    console.log(clave);

    const consulta = await fetch(GetById + ID + completeGetById);
    const consultaJson = await consulta.json();
    console.log("Json de Mis Gifs por ID es ", consultaJson);
    return consultaJson;
  }

  getGifs();

  var insertMisGifs = async function insertMisGifs() {
    for (x = 0; x <= localStorage.length - 1; x++) {
      var misGuifos = await getGifs("");
      let miGif = misGuifos.data.images.downsized_medium.url;

      let imgNodes = document.querySelectorAll(".miGif");

      imgNodes[x].setAttribute("src", miGif);
    }
  }
  document.getElementById("buttonCrear").addEventListener("click", insertMisGifs);
  document.getElementById("misGuifos").addEventListener("click", insertMisGifs);
}


document.getElementById("buttonCrear").addEventListener("click", function () {
  trends.setAttribute("class", "hidden");
});

document.getElementById("buttonCrear").addEventListener("click", function () {
  misGuifosSection.style.display = "block";
});


document.getElementById("misGuifos").addEventListener("click", function () {
  trends.setAttribute("class", "hidden");
});
document.getElementById("misGuifos").addEventListener("click", function () {
  tendencias.setAttribute("class", "hidden");
});
document.getElementById("misGuifos").addEventListener("click", function () {
  misGuifosSection.style.display = "block";
});


///////////////////////////////////////////////////////     FIN DE REQUEST BY ID      //////////////////////////////////////////////


////////////////////////////////////////////// eventos para mostrar otras "paginas" ////////////////////////////////
var mainContainer = document.getElementById("main-container");
var arrow = document.getElementById("arrow");
var botones = document.getElementById("botones");
var container = document.getElementById("container");
var buscador = document.getElementById("buscador");
var tags = document.getElementById("tags");
var sugerencias = document.getElementById("sugerencias");
var tendencias = document.getElementById("tendencias");
var cuadro1 = document.getElementById("cuadro1");
var cuadro2 = document.getElementById("cuadro2");
var cuadro3 = document.getElementById("cuadro3");
var cuadro4 = document.getElementById("cuadro4");
var cuadro5 = document.getElementById("cuadro5");
var lookup = document.getElementById("lookup");
var buttonsCuadro2 = document.getElementById("buttonsCuadro2");
var buttonsCuadro3 = document.getElementById("buttonsCuadro3");
var buttonsCuadro4 = document.getElementById("buttonsCuadro4");
var trends = document.getElementById("trends");
var gifTrends = document.getElementsByClassName("gifTrends");

////////////////////////////////////////// eventos para ir a CREAR GUIFOS (cuadro 1) ///////////////////////////////////////////
document.getElementById("buttonCrear").addEventListener("click", function () {
  localStorage.removeItem("Keyword");
});
document.getElementById("buttonCrear").addEventListener("click", function () {
  botones.setAttribute("class", "hidden");
});
document.getElementById("buttonCrear").addEventListener("click", function () {
  arrow.style.display = "block";
});
document.getElementById("buttonCrear").addEventListener("click", function () {
  buscador.setAttribute("class", "hidden");
});
document.getElementById("buttonCrear").addEventListener("click", function () {
  tags.style.display = "none";
});
document.getElementById("buttonCrear").addEventListener("click", function () {
  sugerencias.setAttribute("class", "hidden");
});
document.getElementById("buttonCrear").addEventListener("click", function () {
  cuadro1.setAttribute("class", "cuadro1");
});
document.getElementById("buttonCrear").addEventListener("click", function () {
  lookup.setAttribute("class", "hidden");
});

/////////////////////////////////////// eventos para ir a pagina principal (cancelar) ///////////////////////////////////////////////////////////

document.getElementById("cancelar").addEventListener("click", function () {
  botones.setAttribute("class", "left");
});
document.getElementById("cancelar").addEventListener("click", function () {
  arrow.style.display = "none";
});
document.getElementById("cancelar").addEventListener("click", function () {
  buscador.setAttribute("class", "buscador");
});
document.getElementById("cancelar").addEventListener("click", function () {
  sugerencias.removeAttribute("class", "hidden");
});
document.getElementById("cancelar").addEventListener("click", function () {
  cuadro1.setAttribute("class", "hidden");
});
document.getElementById("cancelar").addEventListener("click", function () {
  lookup.setAttribute("placeholder", "Tendencias");
});


/////////////////////////////////////// eventos para ir a cuadro 2 ///////////////////////////////////////////////////////////

document.getElementById("comenzar").addEventListener("click", function () {
  cuadro1.setAttribute("class", "hidden");
});
document.getElementById("comenzar").addEventListener("click", function () {
  cuadro2.setAttribute("class", "cuadro2");
});
document.getElementById("comenzar").addEventListener("click", function () {
  tendencias.setAttribute("class", "hidden");
});

/////////////////////////////////////// eventos para ir a cuadro 3 ///////////////////////////////////////////////////////////

document.getElementById("capture").addEventListener("click", function () {
  buttonsCuadro2.setAttribute("class", "hidden");
});
document.getElementById("capture").addEventListener("click", function () {
  buttonsCuadro3.setAttribute("class", "buttons");
});

/////////////////////////////////////// eventos para ir a cuadro 4 - Stop recording ///////////////////////////////////////////////////////////

document.getElementById("listo").addEventListener("click", function () {
  buttonsCuadro4.setAttribute("class", "buttons");
});
document.getElementById("listo").addEventListener("click", function () {
  buttonsCuadro3.setAttribute("class", "hidden");
});

/////////////////////////////////////// eventos para ir a cuadro 3 - Repeat ///////////////////////////////////////////////////////////
document.getElementById("repeat").addEventListener("click", function () {
  buttonsCuadro4.setAttribute("class", "hidden");
});
document.getElementById("repeat").addEventListener("click", function () {
  buttonsCuadro2.setAttribute("class", "buttons");
});


/////////////////////////////////////// Recargar pagina Cuando hago click en cancelar2, en arrow y en listo (fin) ///////////////////////////////////////////////////////////

document.getElementById("cancelar2").addEventListener("click", function refresh() {
  location.reload(true);
});

document.getElementById("arrow").addEventListener("click", function refresh() {
  location.reload(true);
});

document.getElementById("fin").addEventListener("click", function refresh() {
  location.reload(true);
});

document.getElementById("cancelar").addEventListener("click", function refresh() {
  location.reload(true);
});

/////////////////////////////////////////////////////////// timer ///////////////////////////////////////////////////////////////////////
document.getElementById("capture").addEventListener("click", function () {
  var minutes1Label = document.getElementById("minutes1");
  var seconds1Label = document.getElementById("seconds1");
  var totalSeconds = 0;
  setInterval(setTime, 1000);
  function setTime() {
    ++totalSeconds;
    seconds1Label.innerHTML = pad(totalSeconds % 60);
    minutes1Label.innerHTML = pad(parseInt(totalSeconds / 60));
  }
  function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }
}
);

document.getElementById("listo").addEventListener("click", function () {
  var minutes2Label = document.getElementById("minutes2");
  var seconds2Label = document.getElementById("seconds2");
  var totalSeconds2 = 0;
  setInterval(setTime2, 1000);
  function setTime2() {
    ++totalSeconds2;
    seconds2Label.innerHTML = pad2(totalSeconds2 % 60);
    minutes2Label.innerHTML = pad2(parseInt(totalSeconds2 / 60));
  }
  function pad2(val) {
    var valString2 = val + "";
    if (valString2.length < 2) {
      return "0" + valString2;
    } else {
      return valString2;
    }
  }
}
);
/////////////////////////////////////////////////////////// progress bar ///////////////////////////////////////////////////////////////////////

document.getElementById("upload").addEventListener("click",
  function move() {
    var i = 0;
    if (i == 0) {
      i = 1;
      var elem = document.getElementById("myBar");
      var width = 10;
      var id = setInterval(frame, 10);
      function frame() {
        if (width >= 100) {
          clearInterval(id);
          i = 0;
        } else {
          width++;
          elem.style.width = width + "%";
        }
      }
    }
  });


document.getElementById("upload").addEventListener("click", function () {
  setTimeout(function move() {
    var i = 0;
    if (i == 0) {
      i = 1;
      var elem = document.getElementById("myBar2");
      var width = 10;
      var id = setInterval(frame, 10);
      function frame() {
        if (width >= 100) {
          clearInterval(id);
          i = 0;
        } else {
          width++;
          elem.style.width = width + "%";
        }
      }
    }
  }, 4000)
});
/////////////////////////////////////// eventos para ir a cuadro 5 - Upload ///////////////////////////////////////////////////////////

document.getElementById("upload").addEventListener("click", function () {
  setTimeout(function () {
    cuadro2.setAttribute("class", "hidden");
  }, 1500)
});

document.getElementById("upload").addEventListener("click", function () {
  setTimeout(function () {
    cuadro5.setAttribute("class", "cuadro2");
  }, 1500)
});



/////////////////////////////////////// eventos para ir a cuadro 6 - estan en record.js ///////////////////////////////////////////////////////////



///////////////////////////////////////////// CLick en Mis GuifOs //////////////////////////////////////

document.getElementById("misGuifos").addEventListener("click", function () {
  buscador.setAttribute("class", "hidden");
});
document.getElementById("misGuifos").addEventListener("click", function () {
  sugerencias.setAttribute("class", "hidden");
});
document.getElementById("misGuifos").addEventListener("click", function () {
  localStorage.removeItem("Keyword");
});
document.getElementById("misGuifos").addEventListener("click", function () {
  tags.style.display = "none";
});

/////////////////////////// para buscar inner text de tags   //////////////////////

let miTag = undefined;
async function buscarCategories() {
  const consulta = await fetch(GIPHY_CATEGORIES);
  const consultaJson = await consulta.json();
  console.log("Mis categorias para los TAGS son: ", consultaJson);
  return consultaJson;
}
buscarCategories();

document.getElementById("btn").addEventListener("click",
  async function tag() {
    for (let i = 0; i < 3; i++) {
      let misCategories = await buscarCategories("");
      const tag = document.getElementsByClassName("tagButton")[i];
      let miTag = misCategories.data[i];
      tag.innerText = miTag;
    }
  });

/////////////////////////// para buscar inner HTML de opciones   //////////////////////

let autocomplete = undefined;
async function buscarComplete() {
  const consulta = await fetch(API_AUTOCOMPLETE + keyword.value);
  const consultaJson = await consulta.json();
  console.log("Mis opciones para autocomplete son: ", consultaJson);
  return consultaJson;
}
buscarComplete();

document.getElementById("keyword").addEventListener("keyup",
  async function fill() {
    for (let i = 0; i < 3; i++) {
      let misCategories = await buscarComplete("");
      const opciones = document.getElementsByClassName("option")[i];
      let complOpt = misCategories.data[i].name;
      opciones.innerHTML = complOpt;
    }
  });



//////////////////////////////////////////////// genero mis guifos  //////////////////////////////////


for (i = 0; i < localStorage.length; i++) {
  var myNewGif = document.createElement("div");
  myNewGif.setAttribute("class", "simple");
  myNewGif.setAttribute("display", "grid");
  document.getElementById("misGifs").appendChild(myNewGif);

  var elementoDiv = document.createElement("div");
  elementoDiv.setAttribute("width", "100%");
  elementoDiv.setAttribute("class", "simple");
  myNewGif.appendChild(elementoDiv);

  var image = document.createElement("img");
  image.setAttribute("width", "100%");
  image.setAttribute("src", "data:,");
  image.setAttribute("alt", "gif");
  image.setAttribute("class", "miGif");
  elementoDiv.appendChild(image);

}
