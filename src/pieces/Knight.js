import classes from './Piece.module.css'

const Knight = (props) => {
    let pieceUrl = (props.player === 0 ? "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg");
    pieceUrl = "url('" + pieceUrl + "')";
    return ( <div className={classes.piece} style={{backgroundImage : pieceUrl}}></div> );
}
 
export default Knight;