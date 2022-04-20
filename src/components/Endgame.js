import Modal from "./ModalEndgame";
import classes from "./Endgame.module.css";

const Endgame = (props) => {
    return ( 
    <Modal onClose={props.onClose}>
        <p className={classes.message}>{props.message}</p>
        <div className={classes['button-container']}>
          <button onClick={props.handleButtonPlayAgain} className={classes.button}>Play again</button>
      </div>
    </Modal> );
}
 
export default Endgame;