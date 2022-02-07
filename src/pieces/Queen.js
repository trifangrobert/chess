import classes from './Piece.module.css'

const Queen = (props) => {
    let pieceUrl = (props.player === 0 ? "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg");
    pieceUrl = "url('" + pieceUrl + "')";
    return ( <svg width={200} height={200} viewBox='10 10 200 200' className={classes.piece} style={{backgroundImage : pieceUrl}}></svg> );
}
 
export default Queen;