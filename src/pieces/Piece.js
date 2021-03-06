import King from "./King.js";
import Queen from "./Queen.js";
import Bishop from "./Bishop.js";
import Knight from "./Knight.js";
import Rook from "./Rook.js";
import Pawn from "./Pawn.js";
import classes from './Piece.module.css';
import MarkedCells from "./MarkedCells.js";

const Piece = (props) => {
  let piece = props.piece;
  let player = -1;
  if (piece <= 6) {
    player = 0;
  } else {
    player = 1;
  }
  if (piece > 6) {
    piece -= 6;
  }
  return (
    <div className={classes.piece}>
      {<MarkedCells stateType={props.cellState}/>}
      {piece === 1 && <King player={player} />}
      {piece === 2 && <Queen player={player} />}
      {piece === 3 && <Bishop player={player} />}
      {piece === 4 && <Knight player={player} />}
      {piece === 5 && <Rook player={player} />}
      {piece === 6 && <Pawn player={player} />}
    </div>
  );
};

export default Piece;
