import classes from "./Buttons.module.scss";

export const PrimaryButton = ({
  className,
  isDisabled,
  isLoading = false,
  loadingLabel = "Loading ...",
  mainLabel = "Button",
  icon,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={`${classes.primary} ${
        isDisabled || isLoading ? classes.disabled : ""
      } ${className}`}
    >
      {isLoading ? <div className={classes.loader} /> : icon}
      {isLoading ? loadingLabel : mainLabel}
    </button>
  );
};

export const SecondaryButton = ({
  className,
  icon,
  mainLabel,
  isDisabled,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={`${classes.secondary} ${
        isDisabled ? classes.disabled : ""
      } ${className}`}
    >
      {icon} {mainLabel}
    </button>
  );
};

export const TertiaryButton = ({
  className,
  isDisabled,
  icon,
  mainLabel,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={`${classes.tertiary} ${
        isDisabled ? classes.disabled : ""
      } ${className}`}
    >
      {icon}
      {mainLabel}
    </button>
  );
};
