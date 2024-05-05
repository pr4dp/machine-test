import { useState, useReducer, useEffect } from "react";
import { reduce, map, filter } from "../../utils";

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const result = reduce(arr);
console.log("reduce result ", result);

const newReduceResult = arr._reduce((acc, curr) => {
  return acc + curr;
});

console.log("newReduceResult ", newReduceResult);

const mapResult = map(arr);
console.log("mapResult ", mapResult);

const newMapResult = arr._map((item, i, arr) => item * 2);
console.log("newMapResult ", newMapResult);

const filterResult = filter(arr);
console.log("filterResult ", filterResult);

const newFilterResult = arr._filter((item) => item > 5);
console.log("newFilterResult ", newFilterResult);

const initBoard_ = () => Array(9).fill({ value: null, isCellWinner: false });

/*TODO: Add time travel/history */
/*TODO: Undo/Redu
/*TOD: Add Draw Animation - Bug exists */

const WINNING_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const TicTacToe = () => {
  const [board, setBoard] = useState(initBoard_());
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [tie, setTie] = useState(false);
  const [winner, setWinner] = useState(null);
  const [winnerIndices, setWinnerIndices] = useState([]);

  const calculateWinner = (currentBoard) => {
    for (let i = 0; i < WINNING_PATTERNS.length; i++) {
      const [a, b, c] = WINNING_PATTERNS[i];
      if (currentBoard[a].value && currentBoard[a].value === currentBoard[b].value && currentBoard[a].value === currentBoard[c].value) {
        setWinner(currentBoard[a].value);
        setWinnerIndices([a, b, c]);
      }
    }
    return null;
  };

  const handleClick = (i, b) => {
    if (b !== null) return;

    if (gameOver || board[i].value) return;
    const newBoard_ = board.map((b, _i) => {
      if (_i === i) {
        return { ...b, value: currentPlayer === "X" ? "X" : "O" };
      } else {
        return { ...b };
      }
    });

    setBoard(newBoard_);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const start = () => {
    setBoard(initBoard_());
    setWinner(null);
    setWin(false);
    setTie(false);
    setGameOver(false);
  };

  const reset = () => {
    setBoard(initBoard_());
    setWinner(null);
    setWin(false);
    setTie(false);
    setGameOver(false);
  };

  useEffect(() => {
    const [a, b, c] = winnerIndices;
    const newBoard = board.map((_b, _i) => {
      if (_i === a || _i === b || _i === c) {
        return { ..._b, isCellWinner: true };
      } else {
        return { ..._b, isCellWinner: false };
      }
    });
    setBoard(newBoard);
  }, [winner]);
  useEffect(() => {
    if (winner) {
      setWinner(winner);
      setWin(true);
      setTie(false);
      setGameOver(true);
      return;
    }
    if (board.every((b) => b.value !== null)) {
      setTie(true);
    }
  }, [winner, board]);

  useEffect(() => {
    if (!winner) {
      calculateWinner(board);
    }
  }, [board]);

  const boardClasses = ["top left", "top", "top right", "left", "", "right", "bottom left", "bottom", "bottom right"];

  return (
    <div className="gameContainer">
      <div className="game_">
        <div className={`board_ ${win ? "win" : ""}`}>
          {board.map((b, i) => {
            return (
              <div className={`square ${b.isCellWinner ? "win" : ""} ${boardClasses[i]}`} key={i} onClick={() => handleClick(i, b.value)}>
                <div className={b.value?.toLowerCase()}></div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between text-3xl mt-24">
          <p className="">
            {tie ? "Game Tie" : ""} {win ? `Player ${winner} wins` : ""}
          </p>
          {(gameOver || tie) && (
            <button className="justify-end" onClick={start}>
              Start
            </button>
          )}
          {!(win || tie) && (
            <button className="justify-end" onClick={reset}>
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
