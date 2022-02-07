import classes from './Piece.module.css'

const Bishop = (props) => {
    let pieceUrl = (props.player === 0 ? "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg");
    pieceUrl = "url('" + pieceUrl + "')";
    return ( <div className={classes.piece} style={{backgroundImage : pieceUrl}}></div> );
}
 
export default Bishop;