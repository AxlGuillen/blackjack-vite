/**
 * This function creates and adds a card element to the player's card div
 * @param {String} card - The card to create
 * @param {Number} turn - The current turn of the player
 * @param {Array<HTMLElement>} divPlayerCards - The array of HTML elements for player cards
 */
export const createCard = (card, turn, divPlayerCards) => {
  const imgCard = document.createElement("img");
  imgCard.src = `/blackjack-vite/assets/cartas/${card}.png`;
  imgCard.classList.add("carta");
  divPlayerCards[turn].append(imgCard);
};
