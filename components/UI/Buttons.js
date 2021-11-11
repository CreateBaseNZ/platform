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

export const SecondaryButton = ({ className, isDisabled, isLoading = false, loadingLabel = "Loading ...", mainLabel = "Button", iconLeft, iconRight, ...rest }) => {
	return (
		<button {...rest} className={`${classes.tertiary} ${isDisabled || isLoading ? classes.disabled : ""} ${className}`}>
			{isLoading ? <div className={classes.loader} /> : iconLeft}
			{isLoading ? loadingLabel : mainLabel}
			{!isLoading ? iconRight : null}
		</button>
	);
};

export const TertiaryButton = ({ className, isDisabled, isLoading = false, loadingLabel = "Loading ...", mainLabel = "Button", iconLeft, iconRight, ...rest }) => {
	return (
		<button {...rest} className={`${classes.tertiary} ${isDisabled || isLoading ? classes.disabled : ""} ${className}`}>
			{isLoading ? <div className={classes.loader} /> : iconLeft}
			{isLoading ? loadingLabel : mainLabel}
			{!isLoading ? iconRight : null}
		</button>
	);
};
