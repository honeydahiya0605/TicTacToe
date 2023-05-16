import "./App.css";
import Tile from "./components/Tile";
import { useState, useEffect } from "react";

const winnerCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [grid, setGrid] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [winner, setWinner] = useState("");
  const [showWinnerModal, setShowWinnerModal] = useState(false);

  function checkWinner() {
    for (let i = 0; i < winnerCombination.length; i++) {
      const [a, b, c] = winnerCombination[i];
      if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
        return grid[a];
      }
    }
  }

  useEffect(() => {
    const finalWinner = checkWinner();
    if (finalWinner) {
      setWinner(finalWinner);
      setScore((lastScore) => {
        return { ...lastScore, [finalWinner]: lastScore[finalWinner] + 1 };
      });
      if (score[finalWinner] === 2) {
        setShowWinnerModal(true);
      }
    }
  }, [grid]);

  function resetScore() {
    setScore({ X: 0, O: 0 });
    playAgain();
  }

  function playAgain() {
    setWinner("");
    setCurrentPlayer("X");
    setGrid(Array(9).fill(""));
  }

  function tileClick(event) {
    if (grid[event.target.id] !== "" || winner !== "") {
      return;
    }
    const newGrid = [...grid]; // copy of grid
    newGrid[event.target.id] = currentPlayer; // update the grid
    setGrid(newGrid);

    // Change the player
    setCurrentPlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));
  }

  function closeModal() {
    setShowWinnerModal(false);
    resetScore();
  }

  return (
    <>
      <div className="container">
        <h2 className="title">Tic Tac Toe</h2>
        <div className="result">
          {showWinnerModal && (
            <div className="modal">
              <div className="modal-content">
                <h3>{`Player ${winner} is the final winner!`}</h3>
                <button onClick={closeModal}>Close</button>
              </div>
            </div>
          )}
          {winner !== "" ? "Player " + winner + " won the game" : ""}
        </div>
        <div id="part2">
          <div id="player1" className="player">
            <p>Player X</p>
            <div className="red grid-item">X</div>
          </div>
          <div id="score">
            <p>
              {score.X}
              <span>/</span>
              {score.O}
            </p>
            <p></p>
          </div>
          <div id="player2" className="player">
            <p>Player O</p>
            <div className="green grid-item">O</div>
          </div>
        </div>
        <div id="part3">
          <div className="grid-container">
            <Tile id="0" label={grid[0]} clickEvent={tileClick} />
            <Tile id="1" label={grid[1]} clickEvent={tileClick} />
            <Tile id="2" label={grid[2]} clickEvent={tileClick} />
          </div>
          <div className="grid-container">
            <Tile id="3" label={grid[3]} clickEvent={tileClick} />
            <Tile id="4" label={grid[4]} clickEvent={tileClick} />
            <Tile id="5" label={grid[5]} clickEvent={tileClick} />
          </div>
          <div className="grid-container">
            <Tile id="6" label={grid[6]} clickEvent={tileClick} />
            <Tile id="7" label={grid[7]} clickEvent={tileClick} />
            <Tile id="8" label={grid[8]} clickEvent={tileClick} />
          </div>
        </div>
        <div id="part4">
          <div className="button">
            <button className=" btn-reset" onClick={resetScore}>
              RESET SCORE
            </button>
            <button className=" btn-again" onClick={playAgain}>
              PLAY AGAIN
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
