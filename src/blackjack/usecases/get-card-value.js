/**
 * This function gets the value of a card
 * @param {String} card - The card to get the value from
 * @returns {Number} The value of the card
 */

export const getCardValue = (card) => {
  const value = card.substring(0, card.length - 1);
  return isNaN(value) ? (value === "A" ? 11 : 10) : parseInt(value);
};
