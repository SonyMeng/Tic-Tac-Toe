document.addEventListener("DOMContentLoaded", function () {
  const board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let gameActive = true;
  const currentTurnLabel = document.getElementById("turn");
  // currentTurnLabel.textContent = `Player ${currentPlayer}'s Turn`;
  const cellNodeList = document.querySelectorAll(".cell");
  document.getElementById("btnReset").onclick = resetGame;
  cellNodeList.forEach((cell) => {
    cell.onclick = () => gameLogic(cell);
  });

  function updateCurrentTurnLabel(turnLabel, player) {
    turnLabel.textContent = `Player ${player}'s Turn`;
  }

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
      return true;
    } else {
      return false;
    }
  }

  function checkTie(array) {
    if (array.every((cell) => cell !== "")) {
      return true;
    } else {
      return false;
    }
  }

  function resetGame() {
    currentPlayer = "X";
    gameActive = true;
    board.fill("");
    cellNodeList.forEach((cell) => {
      cell.textContent = "";
    });
    updateCurrentTurnLabel(currentTurnLabel, currentPlayer);
  }

  function gameLogic(cellArg) {
    const index = Array.from(cellNodeList).indexOf(cellArg);
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
        currentTurnLabel.textContent = `Player ${currentPlayer} Won!`;
        return;
      }
      if (checkTie(board)) {
        gameActive = false;
        currentTurnLabel.textContent = `Its a tie!`;
        return;
      }
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      updateCurrentTurnLabel(currentTurnLabel, currentPlayer);
    }
  }
});
