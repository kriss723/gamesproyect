//Funcio de generacion aleatoria
let getRandomNumber = size => {
  let a = Math.floor(Math.random() * size)
  console.log(a);
  return Math.floor(Math.random() * size);
}


// Ayudas para el jugador
let getDistanceHint = distancia => {
  if (distancia < 80) {
    return "Ahhhh muy cerca acercate mas!";
  } else if (distancia < 100) {
    return "Muy Caliente!!!";
  } else if (distancia < 120) {
    return "Caliente!!!"
  }else if (distancia < 150) {
      return "tibio!!!"; 
  } else if (distancia < 180) {
    return "Friooooo!!!!";
  } else if (distancia < 360) {
    return "Muy Frioooooo !!!";
  } else {
    return "Era del Hielo!";
  }
}
