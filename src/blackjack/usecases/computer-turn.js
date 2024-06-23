import { drawCard } from "./draw-card";
import { accumulatePoints } from "./accumulate-points";
import { createCard } from "./create-card";
import { determineWinner } from "./determine-winner";

/**
 * This function manages the computer's turn
 * @param {Number} minimumPoints - The minimum points the computer needs to achieve
 * @param {Array<String>} deck - The deck of cards
 * @param {Array<Number>} playerPoints - The array of player points
 * @param {Array<HTMLElement>} divPlayerCards - The array of HTML elements for player cards
 * @param {Array<HTMLElement>} pointsHtml - The array of HTML elements for player points display
 * @param {HTMLElement} btnNuevo - The HTML element for the new game button
 */
export const computerTurn = (
  minimumPoints,
  deck,
  playerPoints,
  divPlayerCards,
  pointsHtml,
  btnNuevo
) => {
  let computerPoints = 0;
  do {
    const card = drawCard(deck);
    computerPoints = accumulatePoints(
      card,
      playerPoints.length - 1,
      playerPoints,
      pointsHtml
    );
    createCard(card, playerPoints.length - 1, divPlayerCards);
  } while (computerPoints < minimumPoints && minimumPoints <= 21);
  determineWinner(playerPoints, btnNuevo);
};
