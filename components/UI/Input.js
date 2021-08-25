import classes from "./Input.module.scss";

const Input = ({ className = "", inputProps = {}, label = "lorem", error }) => {
  console.log(error);
  return (
    <div
      className={`${classes.inputWrapper} ${className} ${
        error ? classes.hasError : ""
      }`}
    >
      <p className={classes.error}>{error ? error.message : ""}</p>
      <input {...inputProps} className={classes.input} />
      <label className={classes.label}>{label}</label>
    </div>
  );
};

export default Input;
