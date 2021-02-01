window.addEventListener('load',function(event){


// variables
let mensajedistancia = document.querySelector('#distance');
let animalito = document.querySelector('#animal');
let objetivo = null;
let time = 13;
var index;
var objanimales;

// variables para los popup //

var nivel = false;
var overlay = document.getElementById('overlay'),
    popup = document.getElementById('popup'),
    btnCerrarPopup = document.getElementById('btn-cerrar-popup'), 
    popup1 = document.getElementById('popup1'),
    btnCerrarPopup1 = document.getElementById('btn-cerrar-popup1');
    
// variables para los sonidos //
    var llama = document.getElementById('time'),
        winSound = document.getElementById('ganasteSound'),
        trySound = document.getElementById('intentaSound'),
        cerrarPopup = document.getElementById('cerrarPopUp');

// clase de los objetos

class animal {
  constructor(xpunto, ypunto, w, h, name, url){
    this.xpunto = xpunto;
    this.ypunto = ypunto;
    this.w = w;
    this.h = h;
    this.name = name;

    return name;
  }

  clickAnimal (xraton, yraton){

    const distancia = Math.sqrt(
      ((xraton - this.xpunto) * (xraton - this.xpunto))
      +
      ((yraton - this.ypunto) * (yraton - this.ypunto))
    );

    console.log(distancia)

    let distanceHint = getDistanceHint(distancia);
    mensajedistancia.innerHTML = `<h2>${distanceHint}</h2>`;
    
    if (distancia < 40) {
      
      cerrarPopup.play();

      $('#formC').slideUp(100)

      mensajedistancia.innerHTML = `<h2> Sigue asi te faltan `+(animales.length - 1)+`</h2>`;

      animales.splice(index,1);
      reloadAnimal(); 
      console.log('el segundo nivel es: '+nivel);
      
        if (nivel == true) {
          time += 5;
        } 
    }

  }
}

//---seccion del canvas----------------------------//

var canvasB = document.getElementById('busqueda').getContext('2d');
var canvasC = document.getElementById('visor').getContext('2d');

var fondo = new Image();
var muestra = new Image();

var cW = canvasB.canvas.width;
var cH = canvasB.canvas.height;
var cW1 = canvasC.canvas.width;
var cH1 = canvasC.canvas.height;
fondo.src = "images/game2/treasuremap.jpg";
muestra.src = "images/game2/treasuremap.jpg";

let ballena = new animal(134,431,5,5);

let animales = [
  new animal(47,423,7,7,'CAMALEÓN'),
  new animal(394,444,8,8, 'PANTERA'),
  new animal(57,200,5,5, 'lORO'),
  new animal(396,329,5,5, 'GORILA'),
  new animal(528,344,10,10, 'PEREZOSO'),
  new animal(522,394,5,5, 'OSO'),
  new animal(526,451,7,7, 'CAPIBARA'),
  new animal(482,244,5,5, 'COLIBRI'),
  new animal(230,60,5,5, 'GUACAMAYA'),
  new animal(456,125,7,7, 'MONO GIBON'),
  new animal(183,123,7,7, 'JAGUAR'),
  new animal(182,393,5,5, 'NUTRIA'),
  new animal(76,536,7,7, 'GECKO'),
  new animal(564,564,10,10, 'RANA'),
  new animal(458,508,7,7, 'ESCARABAJO'),
  new animal(502,516,4,4, 'MOSCA'),
  new animal(292,508,5,5, 'LAGARTIJA')

  
]

let animales2 = [
  new animal(210,129,5,5,'PELICANO'),
  new animal(322,360,5,5,'HIPOPOTAMO'),
  new animal(542,507,5,5,'KOALA'),
  new animal(132,72,5,5,'PAVO REAL'),
  new animal(254,355,5,5,'PINGUINO'),
  new animal(313,280,5,5,'OSO POLAR'),
  new animal(166,458,5,5,'PEZ DORADO'),
  new animal(80,530,5,5,'LEON'),
  new animal(568,286,5,5,'CASTOR'),
  new animal(204,252,5,5,'ARMADILLO'),
  new animal(93,341,5,5,'CEBRA'),
  new animal(137,406,5,5,'PUMA'),
  new animal(380,491,5,5,'ZORILLO'),
  new animal(526,464,5,5,'PAVO'),
  new animal(482,139,5,5,'FLAMENCO'),
  new animal(242,71,5,5,'PANDA'),
  new animal(421,239,5,5,'MANDRIL'),
  new animal(478,181,5,5,'PEZ GLOBO'),
  new animal(528,259,5,5,'ROBOT'),
  new animal(607,146,5,5,'JIRAFA')
]

reloadAnimal();

function launcher(){

  this.render = function(){

      canvasB.fillStyle = this.bg;
      canvasC.fillStyle = this.bg;
      canvasB.drawImage(fondo,10,10);
      canvasC.drawImage(muestra,(-1*(objetivo.xpunto - 50)), (-1*(objetivo.ypunto - 50)));
  
  }
  
}

var launcher = new launcher();

function animalesAzar(){
  
  index = getRandomNumber((animales.length - 1))
  objanimales = animales[index];

  return objanimales;

}

function animate(){
  canvasB.clearRect(0, 0, cW, cH);
  canvasC.clearRect(0,0, cW1, cH1);
  launcher.render();
  
}

var animateInterval = setInterval(animate,6);

canvasB.canvas.addEventListener('click' , (event) => {
  const rect = canvasB.canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  console.log('este es x: '+ x);
  console.log('este es y: '+ y);
  console.log(animales);

  objetivo.clickAnimal(x,y);


})

function reloadAnimal(){

  if (animales.length == 0) {
    winSound.play();
    overlay.classList.add('active');
    popup.classList.add('active');
    nivel = true;
  }else{
    objetivo = animalesAzar();
    //muestra.src = objetivo.url;
    canvasC.drawImage(muestra,(-1*(objetivo.xpunto - 30)), (-1*(objetivo.ypunto - 30)));
    $('#formC').slideDown('slow');
    animalito.innerHTML = `<h1>${objetivo.name}</h1>`
  }
  
}

btnCerrarPopup.addEventListener('click', function(e){
  e.preventDefault();
  cerrarPopup.play();
  overlay.classList.remove('active');
  popup.classList.remove('active');

  /*Modificaciones realizadas tiempo y visor del animal*/

  fondo.src = "images/game2/treasuremap2.jpg";
  muestra.src = "images/game2/treasuremap2.jpg";

  var contador = countdown();

  canvasB.drawImage(fondo,10,10);

  mensajedistancia.innerHTML = `<h2>Nuevo tablero</h2>`

  for (let index = 0; index < animales2.length; index++) {
     
    animales.push(animales2[index]);
    
  }

  reloadAnimal();
});


function countdown () {
  
  var id = setInterval(function(){
      
    llama.play();

      mensajedistancia.innerHTML = `<h2> Tiempo: `+time+`</h2>`
      if(time == 0){
         
        mensajedistancia.innerHTML = `<h2> Se termino </h2>`

          clearInterval(id);
          trySound.play();
          overlay1.classList.add('active');
          popup1.classList.add('active');

      }
      time--;
  },1000);
}


btnCerrarPopup1.addEventListener('click', function(e){
  e.preventDefault();
  cerrarPopup.play();
  overlay1.classList.remove('active');
  popup1.classList.remove('active');

  setTimeout(() => {
    location.reload();
  }, 800);
});

});
