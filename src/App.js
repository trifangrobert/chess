import { useState } from "react";
import Board from "./components/Board.js";

const emptySquares = () => {
  return new Array(64).fill(null);
};

const App = () => {
  const [chessSquares, setChessSquares] = useState(emptySquares());
  console.log(chessSquares);
  return (
    <Board squares={chessSquares}/>
  );
};

export default App;
