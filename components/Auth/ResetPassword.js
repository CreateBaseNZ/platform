import { createRef, useEffect, useMemo, useState, useRef } from "react";
import router from "next/router";
import Input from "../UI/Input";
import { PrimaryButton } from "../UI/Buttons";

import axios from "axios";

import classes from "./AuthForms.module.scss";

const codeLength = 6;

const ResetPasswordStepOne = ({ inputs }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
	const [code, setCode] = useState([...Array(codeLength)].map(() => ""));
	const refs = useRef([]);

	const submitCode = async (code) => {
		setIsLoading(true);

		// TODO send request
		// TODO handle fail
		// TODO handle success
	};

	const changeHandler = (e, idx) => {
		setError();
		const char = e.target.value;
		if (/[^a-zA-Z0-9]/.test(char)) return;
		const newCode = [...code];
		newCode[idx] = char;
		setCode(newCode);
		if (idx !== codeLength - 1) {
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
		<form className={`${classes.form} ${classes.resetPassForm}`}>
			<h1>Enter verification code</h1>
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
			<PrimaryButton className={`${classes.submit} ${classes.loadingVerifCode}`} isLoading={true} type="button" loadingLabel="Verifying ..." style={{ opacity: isLoading ? 1 : 0 }} />
		</form>
	);
};

const ResetPassword = ({ passEmail }) => {
	const [inputs, setInputs] = useState({ email: passEmail });
	const [step, setStep] = useState(0);

	console.log(inputs);

	useEffect(() => {
		if (router.query.authView.length > 1) {
			setInputs({ email: router.query.authView[1], code: router.query.authView[2] });
		}
	}, []);

	console.log(router.query.authView);
	return (
		<div className={`${classes.resetPassContainer} roundScrollbar`}>
			{step === 0 && <ResetPasswordStepOne inputs={inputs} />}
			<div className={classes.resetPassOptions}>
				<button type="button" className={`${classes.smallFont} ${classes.linkBtn}`} onClick={() => router.push("/auth/login")}>
					Back to Login
				</button>
				<div />
			</div>
		</div>
	);
};

export default ResetPassword;
