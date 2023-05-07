const boxes = document.querySelectorAll('.box'); // Get all box elements on the page

let counter = 0; // Counter for keeping track of whose turn it is
const playerOneBoxes = []; // Array for storing the boxes selected by player one
const playerTwoBoxes = []; // Array for storing the boxes selected by player two

const winningCombos = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal from top left
  [2, 4, 6]  // diagonal from top right
];

function checkForWinner(player) {
  const currentPlayerBoxes = player === "X" ? playerOneBoxes : playerTwoBoxes;

  // Check each winning combination to see if the player has selected all the boxes in the combo
  for (let combo of winningCombos) {
    let isWinner = combo.every(index => currentPlayerBoxes.includes(index));

    // If the player has selected all the boxes in the combo, they win
    if (isWinner) {
      console.log(`Player ${player} has won!`);
      return true;
    }
  }

  // If all boxes have been selected and nobody has won, it's a tie
  if (playerOneBoxes.length + playerTwoBoxes.length === 9) {
    console.log("It's a tie!");
    return true;
  }

  return false;
}

function selectBox(box) {
  if (counter % 2 === 0 && box.textContent === "") { // If it's player one's turn and the box has not been selected yet
    box.textContent = "X"; // Set the box's text to "X"
    playerOneBoxes.push(Array.from(boxes).indexOf(box)); // Add the box to player one's selected boxes array
    if (checkForWinner("X")) { // Check if player one has won
      return; // If they have, end the function
    }
    counter++; // Increment the turn counter
  } else if (counter % 2 !== 0 && box.textContent === "") { // If it's player two's turn and the box has not been selected yet
    box.textContent = "O"; // Set the box's text to "O"
    playerTwoBoxes.push(Array.from(boxes).indexOf(box)); // Add the box to player two's selected boxes array
    if (checkForWinner("O")) { // Check if player two has won
      return; // If they have, end the function
    }
    counter++; // Increment the turn counter
  }
}

// Add a click event listener to each box element
boxes.forEach((box) => {
  box.addEventListener("click", (event) => {
    selectBox(event.target); // Call the selectBox function when the box is clicked
  });
});
