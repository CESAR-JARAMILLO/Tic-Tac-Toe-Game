const boxes = document.querySelectorAll('.box');
const button = document.querySelector('.restart-button');

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
      // console.log(`Player ${player} has won!`);
      if (player === "X") {
        players.playerOne.setWinner();
        console.log(`${players.playerOne.name} has won!`);
      } else {
        players.playerTwo.setWinner();
        console.log(`${players.playerTwo.name} has won!`);
      }
      return true;
    }
  }

  if (players.playerOne.playerOneBoxes.length + players.playerTwo.playerTwoBoxes.length === 9) {
    console.log("It's a tie!");
    button.style.display = 'block';
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
      button.style.display = 'block';
      return;
    }
    counter++;
  } else if (counter % 2 !== 0 && box.textContent === "") {
    box.textContent = "O";
    players.playerTwo.playerTwoBoxes.push(Array.from(boxes).indexOf(box));
    if (checkForWinner("O")) {
      disableBoxes();
      button.style.display = 'block';
      return;
    }
    counter++;
  }
}


const handleGameReset = () => {
  counter = 0;
  players.playerOne.isWinner = false;
  players.playerTwo.isWinner = false;
  players.playerOne.playerOneBoxes = [];
  players.playerTwo.playerTwoBoxes = [];
  button.style.display = 'none';
  boxes.forEach(box => {
    box.innerHTML = '';
    box.addEventListener('click', handleBoxClick); // add event listener back
  });
};




button.addEventListener('click', handleGameReset)

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
