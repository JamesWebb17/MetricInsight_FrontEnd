// Fonction à appeler chaque seconde
function maFonction() {
    console.log("Fonction appelée !");
}

// Appeler maFonction toutes les secondes pendant 10 secondes
const intervalId = setInterval(maFonction, 1000);

// Arrêter l'intervalle après 10 secondes
setTimeout(function () {
    clearInterval(intervalId);
    console.log("Fin de l'appel de la fonction.");
}, 10000);
