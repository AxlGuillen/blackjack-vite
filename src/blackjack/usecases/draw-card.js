/**
 * This function take a card of the deck
 * @param {Array<String>} deck is an Array of Strings
 * @returns {String} returns a card
 */

export const drawCard = (deck) => {
  if (!deck || !deck.length === 0) {
    throw new Error("The deck doesnt have cards");
  }
  return deck.pop();
};
