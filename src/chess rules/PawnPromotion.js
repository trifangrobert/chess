import { getPieceColor, getPos } from "../useful functions/PieceFunctions";

const checkPawnPromotion = (board, move) => {
    let player = getPieceColor(board[move[0]]);
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