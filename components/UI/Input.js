import { useState } from "react";
import classes from "./Input.module.scss";

const Input = ({ className = "", inputProps = {}, label, labelProps = {}, error, icon, ...rest }) => {
	return (
		<div {...rest} className={`${classes.inputWrapper} ${className} ${error ? classes.hasError : ""}`}>
			<p className={classes.error}>{error ? error.message : ""}</p>
			<div className={classes.inputWrapper}>
				<input {...inputProps} className={`${classes.input} ${inputProps.className}`} />
				{icon}
			</div>
			<label {...labelProps} className={classes.label}>
				{label}
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
			icon={
				<>
					<i className="material-icons" style={{ opacity: show ? 0.75 : 0, zIndex: show ? 2 : 1 }} title="Hide password" onClick={() => setShow((state) => !state)}>
						visibility
					</i>
					<i className="material-icons-outlined" style={{ opacity: show ? 0 : 0.5, zIndex: show ? 1 : 2 }} title="Show password" onClick={() => setShow((state) => !state)}>
						visibility
					</i>
				</>
			}
			{...rest}
		/>
	);
};

export const TextArea = ({ className = "", inputProps = {}, label, labelProps = {}, error, ...rest }) => {
	return (
		<div {...rest} className={`${classes.inputWrapper} ${className} ${error ? classes.hasError : ""}`}>
			<p className={classes.error}>{error ? error.message : ""}</p>
			<textarea rows={4} {...inputProps} className={`${classes.input} ${classes.textarea} ${inputProps.className} roundScrollbar`} />
			<label {...labelProps} className={classes.label}>
				{label}
			</label>
		</div>
	);
};

export const SearchBar = ({ className = "", inputProps = {}, label, labelProps = {}, error, ...rest }) => {
	return (
		<Input
			className={`${className} ${classes.searchBar}`}
			inputProps={{ ...inputProps, type: "text" }}
			label={label}
			error={error}
			icon={<i className="material-icons-outlined">search</i>}
			{...rest}
		/>
	);
};
