import { ButtonHTMLAttributes } from "react";
import classes from "./Buttons.module.scss";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	mainLabel: string;
	className?: string;
	iconLeft?: any; // TODO
	iconRight?: any; // TODO
	isLoading?: boolean;
	loadingLabel?: string;
	isDisabled?: boolean;
}

export const PrimaryButton = ({ className, isDisabled = false, isLoading = false, loadingLabel = "Loading ...", mainLabel, iconLeft, iconRight, ...rest }: IButtonProps): JSX.Element => {
	return (
		<button {...rest} className={`${classes.btn} ${classes.primary} ${isDisabled || isLoading ? classes.disabled : ""} ${className}`} title={mainLabel}>
			{isLoading ? <div className={classes.loader} /> : iconLeft}
			{isLoading ? loadingLabel : mainLabel}
			{!isLoading ? iconRight : null}
		</button>
	);
};

export const SecondaryButton = ({ className, isDisabled = false, isLoading = false, loadingLabel = "Loading ...", mainLabel, iconLeft, iconRight, ...rest }: IButtonProps): JSX.Element => {
	return (
		<button {...rest} className={`${classes.btn} ${classes.secondary} ${isDisabled || isLoading ? classes.disabled : ""} ${className}`} title={mainLabel}>
			{isLoading ? <div className={classes.loader} /> : iconLeft}
			{isLoading ? loadingLabel : mainLabel}
			{!isLoading ? iconRight : null}
		</button>
	);
};

export const TertiaryButton = ({ className, isDisabled = false, isLoading = false, loadingLabel = "Loading ...", mainLabel, iconLeft, iconRight, ...rest }: IButtonProps): JSX.Element => {
	return (
		<button {...rest} className={`${classes.btn} ${classes.tertiary} ${isDisabled || isLoading ? classes.disabled : ""} ${className}`} title={mainLabel}>
			{isLoading ? <div className={classes.loader} /> : iconLeft}
			{isLoading ? loadingLabel : mainLabel}
			{!isLoading ? iconRight : null}
		</button>
	);
};