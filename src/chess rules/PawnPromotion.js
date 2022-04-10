import { getPieceColor, getPos, getPiece } from "../useful functions/PieceFunctions";

const checkPawnPromotion = (board, move) => {
    console.log("check for pawn promotion");
    console.log(getPiece(board[move[1]]));
    if (getPiece(board[move[1]]) !== 6) {
        return false;
    } 
    let player = getPieceColor(board[move[1]]);
    let [x, y] = getPos(move[1]);
    if (player === 0 && x === 0) {
        return true;
    }
    if (player === 1 && x === 7) {
        return true;
    }
    return false;
}
 
export default checkPawnPromotion;