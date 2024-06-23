import { shuffle } from "underscore";

/**
 * This function creates a new deck
 * @param {Array<String>} cardTypes - Example: ["C", "D", "H", "S"]
 * @param {Array<String>} specialTypes - Example: ["A", "J", "Q", "K"]
 * @returns {Array<String>} A new shuffled deck
 */

export const createDeck = (cardTypes, specialTypes) => {
  if (!cardTypes || cardTypes.length === 0) {
    throw new Error(
      "cardTypes is required and it needs to be an array of strings."
    );
  }
  if (!specialTypes || specialTypes.length === 0) {
    throw new Error(
      "specialTypes is required and it needs to be an array of strings."
    );
  }

  let deck = [];

  for (let i = 2; i <= 10; i++) {
    for (let type of cardTypes) {
      deck.push(i + type);
    }
  }

  for (let type of cardTypes) {
    for (let special of specialTypes) {
      deck.push(special + type);
    }
  }

  return shuffle(deck);
};
