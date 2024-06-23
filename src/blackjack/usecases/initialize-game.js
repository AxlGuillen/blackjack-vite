import { createDeck } from "./create-deck";
import { generatePlayerSections } from "./generate-player-sections";

/**
 * This function initializes the game
 * @param {Array<HTMLElement>} divCartasJugadores - Array to store player card elements
 * @param {Array<HTMLElement>} puntosHtml - Array to store player points elements
 * @param {HTMLElement} numJugadoresInput - The HTML input element for number of players
 * @param {HTMLElement} jugadoresDiv - The HTML div element for players
 * @param {Function} generatePlayerSections - Function to generate player sections
 * @param {Array<String>} tipos - Array of card types
 * @param {Array<String>} especiales - Array of special card types
 */
export const initializeGame = (
  divCartasJugadores,
  puntosHtml,
  numJugadoresInput,
  jugadoresDiv,
  generatePlayerSections,
  tipos,
  especiales
) => {
  const numJugadores = parseInt(numJugadoresInput.value);
  generatePlayerSections(
    numJugadores,
    jugadoresDiv,
    divCartasJugadores,
    puntosHtml
  );

  const deck = createDeck(tipos, especiales);
  const puntosJugadores = Array(numJugadores + 1).fill(0); // Include computer
  let turnoActual = 0;

  puntosHtml.forEach((elem) => (elem.innerText = 0));
  divCartasJugadores.forEach((elem) => (elem.innerHTML = ""));

  return {
    deck,
    puntosJugadores,
    turnoActual,
  };
};
