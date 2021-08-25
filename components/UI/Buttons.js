import classes from "./Buttons.module.scss";

export const PrimaryButton = ({ children, className, ...rest }) => {
  return (
    <button {...rest} className={`${classes.primary} ${className}`}>
      {children}
    </button>
  );
};

export const SecondaryButton = ({ children, className, ...rest }) => {
  return (
    <button {...rest} className={`${classes.secondary} ${className}`}>
      {children}
    </button>
  );
};

export const TertiaryButton = ({ children, className, ...rest }) => {
  return (
    <button {...rest} className={`${classes.tertiary} ${className}`}>
      {children}
    </button>
  );
};
