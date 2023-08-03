import classes from "./Modal.module.css";

const Modal = (props) => {
  const backdropClicked = () => {
    props.setYouWon(false);
  };
  return (
    <div className={classes.backdrop} onClick={backdropClicked}>
      <div className={classes.modal}>
        <h1>Congratulations!</h1>
        <h2>You Won!!</h2>
      </div>
    </div>
  );
};

export default Modal;
