import { useContext, useState, useRef, useEffect } from "react";
import router from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import useApi from "../../hooks/useApi";
import Input, { PasswordInput } from "../UI/Input";
import VisualBellContext from "../../store/visual-bell-context";
import { PrimaryButton } from "../UI/Buttons";
import { emailPattern } from "../../utils/formValidation";
import { passwordMinLength, passwordValidate } from "../../utils/formValidation";
import classes from "./AuthForms.module.scss";

const codeLength = 6;

const ForgotPasswordStepOne = ({ setStep, setInputValues }) => {
	const [isLoading, setIsLoading] = useState(false);
	const { post } = useApi();
	const { setVisualBell } = useContext(VisualBellContext);
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
		await post({
			route: "/api/auth/send-recovery-code",
			input: {
				email: input.email,
				date: new Date().toString(),
			},
			failHandler: (data) => {
				if (data.content === "does not exist") {
					setError("email", {
						type: "manual",
						message: "We could not find an account with that email",
					});
				}
				setIsLoading(false);
			},
			successHandler: () => {
				setInputValues((state) => ({ ...state, email: input.email }));
				setVisualBell({ type: "success", message: "A recovery code has been sent to your email" });
				setStep(1);
			},
		});
	};

	return (
		<form className={`${classes.form} ${classes.forgotForm}`} onSubmit={handleSubmit(onSubmit)}>
			<h1>Forgot your password?</h1>
			<div className={classes.instructions}>Enter your email and we will send you instructions to reset your password</div>
			<Input
				className={classes.input}
				inputProps={{
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
			<div className={classes.forgotOptions}>
				<Link href="/auth/login">
					<a className={`${classes.smallFont} ${classes.linkBtn}`}>Back to Login</a>
				</Link>
			</div>
		</form>
	);
};

const ForgotPasswordStepTwo = ({ setStep, inputValues, setInputValues }) => {
	const { setVisualBell } = useContext(VisualBellContext);
	const [isLoading, setIsLoading] = useState(false);
	const [isResending, setIsResending] = useState(false);
	const { post } = useApi();
	const [error, setError] = useState();
	const [code, setCode] = useState([...Array(codeLength)].map(() => ""));
	const refs = useRef([]);

	const resendCode = async () => {
		setIsResending(true);
		await post({
			route: "/api/auth/send-recovery-code",
			input: { email: inputValues.email, date: new Date().toString() },
			successHandler: () => {
				setVisualBell({ type: "neutral", message: "A new recovery code has been sent to your email" });
				setIsResending(false);
			},
		});
	};

	const submitCode = async (code) => {
		setIsLoading(true);
		await post({
			route: "/api/auth/recover",
			input: { email: inputValues.email, code: code },
			failHandler: (data) => {
				if (data.content === "incorrect") {
					setError("The code you entered is incorrect");
				} else if (data.content === "expired") {
					setError("The code you entered has expired");
				}
				setIsLoading(false);
			},
			successHandler: () => {
				setInputValues((state) => ({ ...state, code: code }));
				setStep(2);
			},
		});
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
			submitCode(newCode.join(""));
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

	const pasteHandler = (e) => {
		setError();
		const paste = (e.clipboardData || window.clipboardData).getData("text").slice(0, codeLength);
		if (/[^a-zA-Z0-9]/.test(paste)) return;
		const newCode = [...paste];
		setCode(newCode);
		submitCode(newCode.join(""));
	};

	return (
		<form className={`${classes.form} ${classes.forgotForm} ${classes.codeForm}`}>
			<h1>Verification code</h1>
			<div className={classes.instructions}>Enter the verification code sent to your email</div>
			<div className={classes.verifCode}>
				{code.map((char, idx) => (
					<Input
						key={idx}
						className={`${classes.input} ${classes.verifCodeInput}`}
						inputProps={{
							type: "text",
							maxLength: 1,
							value: char,
							autoFocus: !code[0].length && idx === 0,
							readOnly: isLoading,
							onChange: (e) => changeHandler(e, idx),
							onKeyDown: (e) => keyDownHandler(e, idx),
							onPaste: (e) => pasteHandler(e),
							ref: (ref) => refs.current.push(ref),
						}}
						error={error}
					/>
				))}
			</div>
			<div className={classes.errorMessage} style={{ opacity: error ? 1 : 0 }}>
				{error}
			</div>
			<PrimaryButton className={`${classes.submit} ${classes.loadingVerifCode}`} isLoading={true} type="button" loadingLabel="Verifying ..." style={{ opacity: isLoading ? 1 : 0 }} />
			<div className={classes.forgotOptions}>
				<Link href="/auth/login">
					<a className={`${classes.smallFont} ${classes.linkBtn}`}>Back to Login</a>
				</Link>
				{isResending ? (
					<div className={classes.smallFont}>Resending ...</div>
				) : (
					<button type="button" className={`${classes.linkBtn} ${classes.smallFont}`} onClick={resendCode}>
						Resend code
					</button>
				)}
			</div>
		</form>
	);
};

const ForgotPasswordStepThree = ({ inputValues }) => {
	const { setVisualBell } = useContext(VisualBellContext);
	const newPassword = useRef({});
	const { post } = useApi();
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

	const onSubmit = async (input) => {
		setIsLoading(true);
		await post({
			route: "/api/auth/reset-password",
			input: { email: inputValues.email, password: input.newPassword, date: new Date().toString() },
			successHandler: () => {
				router.replace("/auth/login");
				setVisualBell({ type: "success", message: "Successfully reset password, please log in to continue" });
			},
		});
	};

	return (
		<form className={`${classes.form} ${classes.forgotForm}`} onSubmit={handleSubmit(onSubmit)}>
			<h1>Set a new password</h1>
			<PasswordInput
				className={classes.input}
				inputProps={{
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
				className={classes.input}
				inputProps={{
					placeholder: "Confirm password*",
					...register("confirmPassword", {
						required: "Please confirm your password",
						validate: (value) => value === newPassword.current || "Passwords do not match",
					}),
				}}
				error={errors.confirmPassword}
			/>
			<PrimaryButton className={classes.submit} isLoading={isLoading} type="submit" loadingLabel="Saving ..." mainLabel="Set new password" />
			<div className={classes.forgotOptions}>
				<Link href="/auth/login">
					<a className={`${classes.smallFont} ${classes.linkBtn}`}>Back to Login</a>
				</Link>
			</div>
		</form>
	);
};

const ForgotPassword = () => {
	const [step, setStep] = useState(router?.query?.code && router?.query?.email ? 2 : 0);
	const [inputValues, setInputValues] = useState({ email: router?.query?.email, code: router?.query?.code });

	return (
		<div className={`${classes.forgotContainer} roundScrollbar`}>
			{step === 0 && <ForgotPasswordStepOne setStep={setStep} setInputValues={setInputValues} />}
			{step === 1 && <ForgotPasswordStepTwo setStep={setStep} inputValues={inputValues} setInputValues={setInputValues} />}
			{step === 2 && <ForgotPasswordStepThree inputValues={inputValues} />}
		</div>
	);
};

export default ForgotPassword;
