import classes from "./GreenButton.module.scss";

const GreenButton = ({ className, clickHandler, caption }) => {
  return (
    <button className={`${classes.button} ${className}`} onClick={clickHandler}>
      {caption}
    </button>
  );
};

export default GreenButton;
