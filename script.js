const board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
document.getElementById("turn").textContent = `Player ${currentPlayer}'s Turn`;
document.getElementById("btnReset").onclick = resetGame;
document.querySelectorAll(".cell").forEach((cell) => {
  cell.onclick = () => gameLogic(cell);
});

function checkWin(array, player) {
  if (
    (array[0] == player && array[1] == player && array[2] == player) ||
    (array[3] == player && array[4] == player && array[5] == player) ||
    (array[6] == player && array[7] == player && array[8] == player) ||
    (array[0] == player && array[4] == player && array[8] == player) ||
    (array[2] == player && array[4] == player && array[6] == player) ||
    (array[0] == player && array[3] == player && array[6] == player) ||
    (array[1] == player && array[4] == player && array[7] == player) ||
    (array[2] == player && array[5] == player && array[8] == player)
  ) {
    gameActive = false;
    return true;
  } else {
    return false;
  }
}

function checkTie(array) {
  if (array.every((cell) => cell !== "")) {
    gameActive = false;
    return true;
  } else {
    return false;
  }
}

function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  board.fill("");
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.textContent = "";
  });
  document.getElementById(
    "turn"
  ).textContent = `Player ${currentPlayer}'s Turn`;
}

function gameLogic(cellArg) {
  const index = Array.from(document.querySelectorAll(".cell")).indexOf(cellArg);
  if (!gameActive) {
    return alert("Reset the game!");
  }
  if (board[index] !== "") {
    return alert("Invalid Move");
  }
  if (cellArg.textContent === "") {
    cellArg.textContent = currentPlayer;
    board[index] = currentPlayer;
    if (checkWin(board, currentPlayer)) {
      gameActive = false;
      document.getElementById(
        "turn"
      ).textContent = `Player ${currentPlayer} Won!`;
      return;
    }
    if (checkTie(board)) {
      gameActive = false;
      document.getElementById("turn").textContent = `Its a tie!`;
      return;
    }
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    document.getElementById(
      "turn"
    ).textContent = `Player ${currentPlayer}'s Turn`;
  }
}
