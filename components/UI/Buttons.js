import classes from "./Buttons.module.scss";

export const PrimaryButton = ({ className, isDisabled, isLoading = false, loadingLabel = "Loading ...", mainLabel = "Button", iconLeft, iconRight, ...rest }) => {
	return (
		<button {...rest} className={`${classes.primary} ${isDisabled || isLoading ? classes.disabled : ""} ${className}`}>
			{isLoading ? <div className={classes.loader} /> : iconLeft}
			{isLoading ? loadingLabel : mainLabel}
			{!isLoading ? iconRight : null}
		</button>
	);
};

export const SecondaryButton = ({ className, iconLeft, iconRight, mainLabel, isDisabled, ...rest }) => {
	return (
		<button {...rest} className={`${classes.secondary} ${isDisabled ? classes.disabled : ""} ${className}`}>
			{iconLeft} {mainLabel} {iconRight}
		</button>
	);
};

export const TertiaryButton = ({ className, isDisabled, iconLeft, iconRight, mainLabel, ...rest }) => {
	return (
		<button {...rest} className={`${classes.tertiary} ${isDisabled ? classes.disabled : ""} ${className}`}>
			{iconLeft}
			{mainLabel}
			{iconRight}
		</button>
	);
};
