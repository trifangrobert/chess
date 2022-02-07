import classes from './Piece.module.css'

const Pawn = (props) => {
    let pieceUrl = (props.player === 0 ?  "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg");
    pieceUrl = "url('" + pieceUrl + "')";
    return ( <div className={classes.piece} style={{backgroundImage : pieceUrl}}></div> );
}
 
export default Pawn;