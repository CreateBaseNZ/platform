import { HTMLAttributes, InputHTMLAttributes, ReactNode, Ref, TextareaHTMLAttributes, useState } from "react";
import classes from "./Input.module.scss";

export interface IInputProps extends HTMLAttributes<HTMLDivElement> {
	className?: string;
	inputProps?: InputHTMLAttributes<HTMLInputElement> & { ref?: Ref<HTMLInputElement> };
	label?: string;
	labelProps?: any; // TODO
	error?:
		| {
				message: string;
		  }
		| string;
	icon?: ReactNode;
}

const Input = ({ className, inputProps, label, labelProps, error, icon, ...rest }: IInputProps): JSX.Element => {
	return (
		<div {...rest} className={`${classes.inputWrapper} ${className} ${error ? classes.hasError : ""}`}>
			<p className={classes.error}>{typeof error === "object" ? error.message : ""}</p>
			<div className={classes.inputWrapper}>
				<input {...inputProps} className={`${classes.input} ${inputProps?.className}`} />
				{icon}
			</div>
			<label {...labelProps} className={classes.label}>
				{label}
			</label>
		</div>
	);
};

export default Input;

export const PasswordInput = ({ className, inputProps, ...rest }: IInputProps): JSX.Element => {
	const [show, setShow] = useState(false);

	return (
		<Input
			className={`${className} ${classes.password}`}
			inputProps={{ ...inputProps, type: show ? "text" : "password" }}
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

type ITextAreaProps = IInputProps & {
	inputProps?: TextareaHTMLAttributes<HTMLTextAreaElement> & { ref?: Ref<HTMLTextAreaElement> };
};

export const TextArea = ({ className, inputProps, label, labelProps, error, ...rest }: ITextAreaProps): JSX.Element => {
	return (
		<div {...rest} className={`${classes.inputWrapper} ${className} ${error ? classes.hasError : ""}`}>
			<p className={classes.error}>{typeof error === "object" ? error.message : ""}</p>
			<textarea rows={4} {...inputProps} className={`${classes.input} ${classes.textarea} ${inputProps?.className} roundScrollbar`} />
			<label {...labelProps} className={classes.label}>
				{label}
			</label>
		</div>
	);
};

export const SearchBar = ({ className, inputProps, ...rest }: IInputProps): JSX.Element => {
	return <Input className={`${className} ${classes.searchBar}`} inputProps={{ ...inputProps, type: "text" }} icon={<i className="material-icons-outlined">search</i>} {...rest} />;
};
