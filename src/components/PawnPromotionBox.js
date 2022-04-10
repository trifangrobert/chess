import classes from "./PawnPromotionBox.module.css";
import Square from "./Square";

const PawnPromotionBox = (props) => {
    let squares = [];
    for (let i = 2;i <= 5;++i) {
        squares.push(<Square key={i} handleClick={props.handleClickProm} index={i + 6 * props.player}  piece={i + 6 * props.player}/>);
    }
    return (  
        <div className={classes.container} style={props.pawnPromotionStyle}>
            {squares}
        </div>

    );
}
 
export default PawnPromotionBox;