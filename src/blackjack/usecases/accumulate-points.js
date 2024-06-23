import { getCardValue } from "./get-card-value";

/**
 * This function accumulates points for a player
 * @param {String} card - The card to accumulate points from
 * @param {Number} turn - The current turn of the player
 * @param {Array<Number>} playerPoints - The array of player points
 * @param {Array<HTMLElement>} pointsHtml - The array of HTML elements to update the points display
 * @returns {Number} The accumulated points for the player
 */
export const accumulatePoints = (card, turn, playerPoints, pointsHtml) => {
  playerPoints[turn] = playerPoints[turn] + getCardValue(card);
  pointsHtml[turn].innerText = playerPoints[turn];
  return playerPoints[turn];
};
