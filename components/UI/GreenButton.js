import classes from "./GreenButton.module.scss";

const GreenButton = (props) => {
  return (
    <button
      className={`${classes.button} ${props.className}`}
      onClick={props.clickHandler}
    >
      {props.caption}
    </button>
  );
};

export default GreenButton;
