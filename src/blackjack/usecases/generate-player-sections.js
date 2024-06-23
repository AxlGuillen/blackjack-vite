import { updateReferences } from "./update-references";

/**
 * This function generates player sections in the HTML
 * @param {Number} numJugadores - Number of players
 * @param {HTMLElement} jugadoresDiv - The HTML div element for players
 * @param {Array<HTMLElement>} divCartasJugadores - Array to store player card elements
 * @param {Array<HTMLElement>} puntosHtml - Array to store player points elements
 */
export const generatePlayerSections = (
  numJugadores,
  jugadoresDiv,
  divCartasJugadores,
  puntosHtml
) => {
  jugadoresDiv.innerHTML = ""; // Clear existing sections

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
