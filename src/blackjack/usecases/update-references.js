/**
 * This function updates the references for player cards and points
 * @param {Array<HTMLElement>} divPlayerCards - Array to store player card elements
 * @param {Array<HTMLElement>} pointsHtml - Array to store player points elements
 */
export const updateReferences = (divPlayerCards, pointsHtml) => {
  divPlayerCards.length = 0; // Clear the array
  pointsHtml.length = 0; // Clear the array

  const divCards = document.querySelectorAll(".divCartas");
  const points = document.querySelectorAll("small");

  divCards.forEach((card) => divPlayerCards.push(card));
  points.forEach((point) => pointsHtml.push(point));
};
