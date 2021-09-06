import { useContext, useState, useRef, useEffect } from "react";
import router from "next/router";
import { useForm } from "react-hook-form";
import Input, { PasswordInput } from "../UI/Input";
import { PrimaryButton } from "../UI/Buttons";
import { emailPattern } from "../../utils/formValidation";
import VisualBellContext from "../../store/visual-bell-context";
import { resetPassword, sendForgotPasswordCode } from "../../utils/authHelpers";
import { passwordMinLength, passwordValidate } from "../../utils/formValidation";

const codeLength = 6;

import classes from "./AuthForms.module.scss";

const ForgotPasswordStepOne = ({ setStep, setInputValues }) => {
	const ctx = useContext(VisualBellContext);
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({
		mode: "onTouched",
	});

	const onSubmit = async (input) => {
		setIsLoading(true);
		await sendForgotPasswordCode(
			input.email,
			() =>
				ctx.setBell({
					type: "catastrophe",
					message: "Something unexpected happened, please reload the page",
				}),
			() =>
				ctx.setBell({
					type: "catastrophe",
					message: "Something unexpected happened, please reload the page",
				}),
			() => {
				setError("email", {
					type: "manual",
					message: "We could not find an account with that email",
				});
				setIsLoading(false);
			},
			() => {
				setInputValues((state) => ({ ...state, email: input.email }));
				setStep(1);
				ctx.setBell({ type: "neutral", message: "Recovery code sent" });
			}
		);
	};

	return (
		<form className={`${classes.form} ${classes.forgotForm}`} onSubmit={handleSubmit(onSubmit)}>
			<h1>Forgot your password?</h1>
			<div className={classes.instructions}>Enter your email and we will send you instructions to reset your password</div>
			<Input
				inputProps={{
					className: classes.input,
					placeholder: "Email*",
					type: "text",
					maxLength: 254,
					...register("email", {
						required: "Please enter your email",
						pattern: emailPattern,
					}),
				}}
				error={errors.email}
			/>
			<PrimaryButton className={classes.submit} isLoading={isLoading} type="submit" loadingLabel="Loading ..." mainLabel="Continue" />
		</form>
	);
};

const ForgotPasswordStepTwo = ({ setStep, inputValues, setInputValues }) => {
	const ctx = useContext(VisualBellContext);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
	const [code, setCode] = useState([...Array(codeLength)].map(() => ""));
	const refs = useRef([]);

	const submitCode = async (code) => {
		setIsLoading(true);

		resetPassword(
			{ email: inputValues.email, code: code, password: "" },
			() =>
				ctx.setBell({
					type: "catastrophe",
					message: "Something unexpected happened, please reload the page",
				}),
			() =>
				ctx.setBell({
					type: "catastrophe",
					message: "Something unexpected happened, please reload the page",
				}),
			() => {
				setError("The code you entered is invalid");
				setIsLoading(false);
			},
			() => {
				setStep(2);
				setInputValues((state) => ({ ...state, code: code }));
			}
		);
	};

	const changeHandler = (e, idx) => {
		setError();
		const char = e.target.value;
		if (/[^a-zA-Z0-9]/.test(char)) return;
		const newCode = [...code];
		newCode[idx] = char;
		setCode(newCode);
		if (idx !== codeLength - 1 && e.target.value) {
			refs.current[idx + 1].focus();
		}
		if (newCode.every((char) => char !== "")) {
			const verifCode = newCode.join("");
			submitCode(verifCode);
		}
	};

	const keyDownHandler = (e, idx) => {
		if (e.key === "Backspace" && !code[idx] && idx !== 0) {
			setError();
			const newCode = [...code];
			newCode[idx - 1] = "";
			setCode(newCode);
			refs.current[idx - 1].focus();
		}
	};

	return (
		<form className={`${classes.form} ${classes.forgotForm} ${classes.forgotTwoForm}`}>
			<h1>Verification code</h1>
			<div className={classes.instructions}>Enter the verification code sent to your email</div>
			<div className={classes.verifCode}>
				{code.map((char, idx) => (
					<Input
						key={idx}
						className={classes.verifCodeInput}
						inputProps={{
							className: classes.input,
							type: "text",
							maxLength: 1,
							value: char,
							autoFocus: !code[0].length && idx === 0,
							readOnly: isLoading,
							onChange: (e) => changeHandler(e, idx),
							onKeyDown: (e) => keyDownHandler(e, idx),
							ref: (ref) => refs.current.push(ref),
						}}
						error={error}
					/>
				))}
			</div>
			<div className={classes.errorMessage} style={{ opacity: error ? 1 : 0 }}>
				The code you entered is incorrect or expired
			</div>
			<PrimaryButton className={`${classes.submit} ${classes.loadingVerifCode}`} isLoading={true} type="button" loadingLabel="Verifying ..." style={{ opacity: isLoading ? 1 : 0 }} />
		</form>
	);
};

const ForgotPasswordStepThree = ({ inputValues }) => {
	const ctx = useContext(VisualBellContext);
	const newPassword = useRef({});
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		trigger,
		watch,
		formState: { errors, touchedFields },
	} = useForm({
		mode: "onTouched",
	});
	newPassword.current = watch("newPassword");

	useEffect(() => {
		touchedFields.confirmPassword && trigger("confirmPassword");
	}, [newPassword.current]);

	const onSubmit = (input) => {
		setIsLoading(true);

		resetPassword(
			{ email: inputValues.email, code: inputValues.code, password: input.newPassword },
			() =>
				ctx.setBell({
					type: "catastrophe",
					message: "Something unexpected happened, please reload the page",
				}),
			() =>
				ctx.setBell({
					type: "catastrophe",
					message: "Something unexpected happened, please reload the page",
				}),
			() => {
				setError("An error occurred, please try again");
				setIsLoading(false);
			},
			() => {
				router.push("/auth/login");
				ctx.setBell({ type: "success", message: "Successfully reset password, please log in to continue" });
			}
		);
	};

	return (
		<form className={`${classes.form} ${classes.forgotForm}`} onSubmit={handleSubmit(onSubmit)}>
			<h1>Set a new password</h1>
			<PasswordInput
				inputProps={{
					className: classes.input,
					placeholder: "New password*",
					...register("newPassword", {
						required: "Please enter a new password",
						minLength: passwordMinLength,
						validate: passwordValidate,
					}),
				}}
				error={errors.newPassword}
			/>
			<PasswordInput
				inputProps={{
					className: classes.input,
					placeholder: "Confirm password*",
					...register("confirmPassword", {
						required: "Please confirm your password",
						validate: (value) => value === newPassword.current || "Passwords do not match",
					}),
				}}
				error={errors.confirmPassword}
			/>
			<PrimaryButton className={classes.submit} isLoading={isLoading} type="submit" loadingLabel="Saving ..." mainLabel="Set new password" />
		</form>
	);
};

const ForgotPassword = ({ ocl }) => {
	const ctx = useContext(VisualBellContext);
	const [step, setStep] = useState(ocl[1] && ocl[2] ? 2 : 0);
	const [inputValues, setInputValues] = useState(ocl[1] && ocl[2] ? { email: ocl[1], code: ocl[2] } : null);

	const resendCode = async () => {
		await sendForgotPasswordCode(
			inputValues.email,
			() =>
				ctx.setBell({
					type: "catastrophe",
					message: "Something unexpected happened, please reload the page",
				}),
			() =>
				ctx.setBell({
					type: "catastrophe",
					message: "Something unexpected happened, please reload the page",
				}),
			() => {
				setError("email", {
					type: "manual",
					message: "Something went wrong, please reload the page",
				});
			},
			() => {
				ctx.setBell({ type: "neutral", message: "Recovery code sent" });
			}
		);
	};

	return (
		<div className={`${classes.forgotContainer} roundScrollbar`}>
			{step === 0 && <ForgotPasswordStepOne setStep={setStep} setInputValues={setInputValues} />}
			{step === 1 && <ForgotPasswordStepTwo setStep={setStep} inputValues={inputValues} setInputValues={setInputValues} />}
			{step === 2 && <ForgotPasswordStepThree inputValues={inputValues} />}
			<div className={classes.forgotOptions}>
				<button type="button" className={`${classes.smallFont} ${classes.linkBtn}`} onClick={() => router.push("/auth/login")}>
					Back to Login
				</button>
				{step === 1 && (
					<div className={`${classes.smallFont} ${classes.switch}`}>
						Didn't receive a code?
						<button type="button" className={classes.linkBtn} onClick={resendCode}>
							Resend
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default ForgotPassword;
