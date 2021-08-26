import classes from "./Input.module.scss";

const Input = ({ className = "", inputProps = {}, label, error, ...rest }) => {
  return (
    <div
      {...rest}
      className={`${classes.inputWrapper} ${className} ${
        error ? classes.hasError : ""
      }`}
    >
      <p className={classes.error}>{error ? error.message : ""}</p>
      <input
        {...inputProps}
        className={`${classes.input} ${inputProps.className}`}
      />
      <label className={classes.label}>{label}</label>
    </div>
  );
};

export default Input;
