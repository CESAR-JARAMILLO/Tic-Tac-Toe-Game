const boxes = document.querySelectorAll('.box');

const players = {
  playerOne: {
    name: 'Player One',
    playerOneBoxes: [],
    isWinner: false,
    setWinner: function() {
      this.isWinner = true;
    }
  },
  playerTwo: {
    name: 'Player Two',
    playerTwoBoxes: [],
    isWinner: false,
    setWinner: function() {
      this.isWinner = true;
    }
  }
};

let counter = 0;

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function checkForWinner(player) {
  const currentPlayerBoxes = player === "X" ? players.playerOne.playerOneBoxes : players.playerTwo.playerTwoBoxes;

  for (let combo of winningCombos) {
    let isWinner = combo.every(index => currentPlayerBoxes.includes(index));

    if (isWinner) {
      console.log(`Player ${player} has won!`);
      if (player === "X") {
        players.playerOne.setWinner();
      } else {
        players.playerTwo.setWinner();
      }
      return true;
    }
  }

  if (players.playerOne.playerOneBoxes.length + players.playerTwo.playerTwoBoxes.length === 9) {
    console.log("It's a tie!");
    return true;
  }

  return false;
}

function selectBox(box) {
  if (counter % 2 === 0 && box.textContent === "") {
    box.textContent = "X";
    players.playerOne.playerOneBoxes.push(Array.from(boxes).indexOf(box));
    if (checkForWinner("X")) {
      disableBoxes();
      return;
    }
    counter++;
  } else if (counter % 2 !== 0 && box.textContent === "") {
    box.textContent = "O";
    players.playerTwo.playerTwoBoxes.push(Array.from(boxes).indexOf(box));
    if (checkForWinner("O")) {
      disableBoxes();
      return;
    }
    counter++;
  }
}

function disableBoxes() {
  boxes.forEach(box => {
    box.removeEventListener('click', handleBoxClick);
  });
}

function handleBoxClick(event) {
  selectBox(event.target);
}

boxes.forEach(box => {
  box.addEventListener('click', handleBoxClick);
});
