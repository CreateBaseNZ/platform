import { useState } from "react";
import classes from "./Input.module.scss";

const Input = ({ className = "", inputProps = {}, label, error, children, ...rest }) => {
	return (
		<div {...rest} className={`${classes.inputWrapper} ${className} ${error ? classes.hasError : ""}`}>
			<p className={classes.error}>{error ? error.message : ""}</p>
			<input {...inputProps} className={`${classes.input} ${inputProps.className}`} />
			<label className={classes.label}>
				{label}
				{children}
			</label>
		</div>
	);
};

export default Input;

export const PasswordInput = ({ className, inputProps, label, error, ...rest }) => {
	const [show, setShow] = useState(false);

	return (
		<Input
			className={`${className} ${classes.password}`}
			inputProps={{ ...inputProps, type: show ? "text" : "password" }}
			label={label}
			error={error}
			children={
				show ? (
					<i className="material-icons" style={{ top: label ? "2.5rem" : "1.5rem" }} title="Hide password" onClick={() => setShow((state) => !state)}>
						visibility
					</i>
				) : (
					<i className="material-icons-outlined" style={{ opacity: 0.5, top: label ? "2.5rem" : "1.5rem" }} title="Show password" onClick={() => setShow((state) => !state)}>
						visibility
					</i>
				)
			}
			{...rest}
		/>
	);
};
