import { type } from "@testing-library/user-event/dist/type";
import { useMemo, useState } from "react";
import Board from "./Board";

function Game() {
  const resetbox: Array<string> = Array(9).fill("");
  const [xIsNext, setxIsNext] = useState<boolean>(true);
  const [box, setBox] = useState<Array<string>>(resetbox);

  const handleClick = (index: number) => {
    if (calculateWinner(box) || box[index]) {
      return;
    }
    box[index] = xIsNext ? "X" : "O";
    setBox(box);
    setxIsNext(!xIsNext);
  };

  const winner = useMemo(() => {
    const turn = calculateWinner(box);
    if (turn) {
      return turn + " is Winner!";
    } else if (!turn && !box.includes("")) {
      return "Drawn!!!";
    } else {
      return (xIsNext ? "X" : "O") + " Play";
    }
  }, [xIsNext]);

  const handleRestart = () => {
    setxIsNext(true);
    setBox(resetbox);
  };

  return (
    <Board
      squares={box}
      winner={winner}
      onClick={handleClick}
      onRestart={handleRestart}
    />
  );
}

function calculateWinner(squares: Array<string>) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i in lines) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
