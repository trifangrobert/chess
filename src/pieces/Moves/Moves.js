import { getPiece } from "../../useful functions/PieceFunctions";
import BishopMoves from "./BishopMoves";
import KingMoves from "./KingMoves";
import KnightMoves from "./KnightMoves";
import PawnMoves from "./PawnMoves";
import QueenMoves from "./QueenMoves";
import RookMoves from "./RookMoves";

const Moves = (board, index) => {
    let positions = [];
    let piece = getPiece(board[index]);
    if (piece === 1) {
        positions = KingMoves(board, index);
    }
    else if (piece === 2) {
        positions = QueenMoves(board, index);
    }
    else if (piece === 3) {
        positions = BishopMoves(board, index);
    }
    else if (piece === 4) {
        positions = KnightMoves(board, index);
    }
    else if (piece === 5) {
        positions = RookMoves(board, index);
    }
    else if (piece === 6) {
        positions = PawnMoves(board, index);
    }

    return positions;
}

export default Moves;