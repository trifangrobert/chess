import classes from './Piece.module.css'

const Rook = (props) => {
    let pieceUrl = (props.player === 0 ? "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg");
    pieceUrl = "url('" + pieceUrl + "')";
    return ( <div className={classes.piece} style={{backgroundImage : pieceUrl}}></div> );
}
 
export default Rook;