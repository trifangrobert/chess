import classes from './Piece.module.css'

const King = (props) => {
    let pieceUrl = (props.player === 0 ? "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg");
    pieceUrl = "url('" + pieceUrl + "')";
    return ( <div className={classes.piece} style={{backgroundImage : pieceUrl}}></div> );
}
 
export default King;