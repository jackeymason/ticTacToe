/*TicTacToe Goals
V0.1) Play with user, random choices
V0.2) Learn from playing
V0.3) Plays self to learn
*/

/* Add prompt for node via Yarn
Note to self: In this dir run "yarn install" 
and "yarn add prompt-sync" 
*/
import promptSync from "prompt-sync"
const prompt = promptSync();

let gameData = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "]
];

let player1 = "You";
let player2 = "Tic-Tac-Toe";
let winner;

let checkForAndAssignWinner = (str) => {
  if (str === "XXX")
    winner = player2;
  if (str === "OOO")
    winner = player1;
  return !!winner;
}

let isWon = () => {
  let won = false;
  let row = 0;
  //check rows for a win
  gameData.forEach(row => {
    won = !!checkForAndAssignWinner(row.join(""));
  })

  //Create and check columns for a win
  let colData = [[], [], [],];
  if (!won) {
    for (let row = 0; row < 3; row++)
      for (let col = 0; col < 3; col++)
        colData[col][row] = gameData[row][col];
    colData.forEach(col => {
      won = !!checkForAndAssignWinner(col.join(""));
    })

    //Create and check diagnols for a win
    if (!won) { 
      let diagnol = [gameData[0][0], gameData[1][1], gameData[2][2]];
      if (!(won = !!checkForAndAssignWinner(diagnol.join("")))) {
        diagnol = [gameData[2][0], gameData[1][1], gameData[0][2]];
        won = !!checkForAndAssignWinner(diagnol.join(""));
      }
    }
  }
  return won;
}

//Check if that spot is occupied
let isOccupied = (row, col) => {
  if (gameData[row][col] !== " ")
    return true;
  return false;
}

//Update board
let draw = () => {
  console.clear();
  let rowCount = 1;
  gameData.forEach(row => {
    console.log(row.join(" | "));
    if (rowCount++ < 3)
      console.log("___________");
  })
  console.log("Type 'exit' to exit")
}

//For game to choice
let randomChoice = () => {
  let row, col;
  while (
    isOccupied(row = Math.floor(Math.random() * 3),
      col = Math.floor(Math.random() * 3)));
  gameData[row][col] = "X";
  draw();  
}



let gameOver = false;
/******************* GAME LOOP *********************/
while (!gameOver) {
  draw();
  console.log("Enter row, colum choice Eg. 1,3\n");
  let resp = prompt("> ").split(",");
  //console.log(resp.join(", "));
  if (resp[0] === "exit") {
    gameOver = true;
    continue;
  }
  //morph input to array values
  let row = parseInt(resp[0], 10) - 1;
  let col = parseInt(resp[1], 10) - 1;
  
  //Validate input
  if (row === NaN || col === NaN || row < 0 || col < 0 || row > 3 || col > 3) {
    console.log(`${row + 1},${col + 1} is an invalid choice. Try again.`);
  } else if (isOccupied(row, col)) {
    console.log("That space is occupied");
    //Update board
  } else {
    gameData[row][col] = "O";
    draw();
    //check for winner
    if (isWon()) {
      console.log(`${winner} won!`);
      gameOver = !gameOver;
      continue;
    }
    //Game chooses
    randomChoice();
    draw();
    //check for winner
    if (isWon()) {
      console.log(`${winner} won!`);
      gameOver = !gameOver;
      continue;
    }

  }
}

