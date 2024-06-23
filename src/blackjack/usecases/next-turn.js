import { computerTurn } from "./computer-turn";

/**
 * This function manages the next turn in the game
 * @param {Number} turnoActual - The current turn
 * @param {Array<Number>} puntosJugadores - Array of player points
 * @param {Array<String>} deck - The deck of cards
 * @param {Array<HTMLElement>} divCartasJugadores - Array to store player card elements
 * @param {Array<HTMLElement>} puntosHtml - Array to store player points elements
 * @param {HTMLElement} btnNuevo - The HTML button element for new game
 * @param {Function} computerTurn - Function to manage the computer's turn
 */
export const nextTurn = (
  turnoActual,
  puntosJugadores,
  deck,
  divCartasJugadores,
  puntosHtml,
  btnNuevo
) => {
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
  return turnoActual;
};
