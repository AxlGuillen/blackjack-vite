import {
  createDeck,
  drawCard,
  updateReferences,
  accumulatePoints,
  createCard,
  computerTurn,
  initializeGame,
  generatePlayerSections,
  nextTurn,
} from "./usecases/index";

const miModulo = (() => {
  "use strict";

  let deck = [];
  const tipos = ["C", "D", "H", "S"],
    especiales = ["A", "J", "Q", "K"];

  let puntosJugadores = [];
  let turnoActual = 0;

  // Referencias del HTML
  const btnNuevo = document.querySelector("#btnNuevo"),
    btnPedir = document.querySelector("#btnPedir"),
    btnDetener = document.querySelector("#btnDetener"),
    numJugadoresInput = document.querySelector("#numJugadores"),
    jugadoresDiv = document.querySelector("#jugadores");

  let divCartasJugadores = [];
  let puntosHtml = [];

  const inicializarJuego = () => {
    const {
      deck: newDeck,
      puntosJugadores: newPuntosJugadores,
      turnoActual: newTurnoActual,
    } = initializeGame(
      divCartasJugadores,
      puntosHtml,
      numJugadoresInput,
      jugadoresDiv,
      generatePlayerSections,
      tipos,
      especiales
    );
    deck = newDeck;
    puntosJugadores = newPuntosJugadores;
    turnoActual = newTurnoActual;

    btnPedir.disabled = false;
    btnDetener.disabled = false;
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
      turnoActual = nextTurn(
        turnoActual,
        puntosJugadores,
        deck,
        divCartasJugadores,
        puntosHtml,
        btnNuevo
      );
    }
  });

  btnDetener.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoActual = nextTurn(
      turnoActual,
      puntosJugadores,
      deck,
      divCartasJugadores,
      puntosHtml,
      btnNuevo
    );
  });

  btnNuevo.addEventListener("click", () => {
    inicializarJuego();
  });
})();
