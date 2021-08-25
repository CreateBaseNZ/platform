import classes from "./Buttons.module.scss";

export const PrimaryButton = ({ children, className, disabled, ...rest }) => {
  return (
    <button
      {...rest}
      className={`${classes.primary} ${
        disabled ? classes.disabled : ""
      } ${className}`}
    >
      {children}
    </button>
  );
};

export const SecondaryButton = ({ children, className, disabled, ...rest }) => {
  return (
    <button
      {...rest}
      className={`${classes.secondary} ${
        disabled ? classes.disabled : ""
      } ${className}`}
    >
      {children}
    </button>
  );
};

export const TertiaryButton = ({ children, className, disabled, ...rest }) => {
  return (
    <button
      {...rest}
      className={`${classes.tertiary} ${
        disabled ? classes.disabled : ""
      } ${className}`}
    >
      {children}
    </button>
  );
};
