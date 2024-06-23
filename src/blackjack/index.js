import {
  createDeck,
  drawCard,
  updateReferences,
  accumulatePoints,
  createCard,
  computerTurn,
} from "./usecases/index";

const miModulo = (() => {
  "use strict";

  let deck = [];
  const tipos = ["C", "D", "H", "S"],
    especiales = ["A", "J", "Q", "K"];

  let puntosJugadores = [];
  let turnoActual = 0;

  // Referencias del html
  const btnNuevo = document.querySelector("#btnNuevo"),
    btnPedir = document.querySelector("#btnPedir"),
    btnDetener = document.querySelector("#btnDetener"),
    numJugadoresInput = document.querySelector("#numJugadores"),
    jugadoresDiv = document.querySelector("#jugadores");

  let divCartasJugadores = [];
  let puntosHtml = [];

  const inicializarJuego = () => {
    const numJugadores = parseInt(numJugadoresInput.value);
    generarApartadosJugadores(numJugadores);

    deck = createDeck(tipos, especiales);
    puntosJugadores = Array(numJugadores + 1).fill(0); // Incluye la computadora
    turnoActual = 0;

    puntosHtml.forEach((elem) => (elem.innerText = 0));
    divCartasJugadores.forEach((elem) => (elem.innerHTML = ""));

    btnPedir.disabled = false;
    btnDetener.disabled = false;
  };

  const generarApartadosJugadores = (numJugadores) => {
    jugadoresDiv.innerHTML = ""; // Limpia los apartados existentes

    for (let i = 1; i <= numJugadores; i++) {
      const jugadorDiv = document.createElement("div");
      jugadorDiv.classList.add("col");

      jugadorDiv.innerHTML = `
        <h1>Jugador ${i} - <small>0</small></h1>
        <div id="jugador${i}-cartas" class="divCartas"></div>
      `;
      jugadoresDiv.appendChild(jugadorDiv);
    }

    updateReferences(divCartasJugadores, puntosHtml);
  };

  const siguienteTurno = () => {
    if (turnoActual < puntosJugadores.length - 2) {
      turnoActual++;
      btnPedir.disabled = false;
      btnDetener.disabled = false;
    } else {
      turnoActual++;
      btnPedir.disabled = true;
      btnDetener.disabled = true;

      const puntosMinimos = puntosJugadores.reduce(
        (acc, puntos, index) =>
          index < puntosJugadores.length - 1 && puntos <= 21 && puntos > acc
            ? puntos
            : acc,
        0
      );
      computerTurn(
        puntosMinimos,
        deck,
        puntosJugadores,
        divCartasJugadores,
        puntosHtml,
        btnNuevo
      );
    }
  };

  btnPedir.addEventListener("click", () => {
    const carta = drawCard(deck);
    const puntosJugador = accumulatePoints(
      carta,
      turnoActual,
      puntosJugadores,
      puntosHtml
    );
    createCard(carta, turnoActual, divCartasJugadores);
    if (puntosJugador >= 21) {
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      siguienteTurno();
    }
  });

  btnDetener.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    siguienteTurno();
  });

  btnNuevo.addEventListener("click", () => {
    inicializarJuego();
  });
})();
