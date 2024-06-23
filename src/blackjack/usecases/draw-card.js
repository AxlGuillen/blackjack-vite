/**
 * This function takes a card from the deck
 * @param {Array<String>} deck - An array of strings representing the deck of cards
 * @returns {String} The drawn card
 */

export const drawCard = (deck) => {
  if (!deck || deck.length === 0) {
    throw new Error("The deck doesn't  have cards");
  }
  return deck.pop();
};
