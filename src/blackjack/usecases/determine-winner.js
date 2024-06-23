/**
 * This function determines the winner of the game
 * @param {Array<Number>} playerPoints - The array of player points
 * @param {HTMLElement} btnNuevo - The HTML element for the new game button
 */
export const determineWinner = (playerPoints, btnNuevo) => {
  setTimeout(() => {
    let winningPoints = 0;
    let winningIndices = [];
    const numPlayers = playerPoints.length - 1;
    const computerPoints = playerPoints[numPlayers];

    for (let i = 0; i < playerPoints.length; i++) {
      if (playerPoints[i] <= 21 && playerPoints[i] > winningPoints) {
        winningPoints = playerPoints[i];
      }
    }

    winningIndices = playerPoints.reduce((acc, playerPoints, index) => {
      if (playerPoints === winningPoints) {
        acc.push(index);
      }
      return acc;
    }, []);

    if (winningIndices.length === 1) {
      if (winningIndices[0] === numPlayers) {
        alert("The computer won with a score of: " + winningPoints);
      } else {
        alert(
          "Player " +
            (winningIndices[0] + 1) +
            " won with a score of: " +
            winningPoints
        );
      }
    } else {
      let winners = winningIndices.map((index) => {
        return index === numPlayers ? "Computer" : "Player " + (index + 1);
      });
      alert(
        "Tie between: " +
          winners.join(", ") +
          " with a score of: " +
          winningPoints
      );
    }

    btnNuevo.disabled = false;
  }, 500);
};
