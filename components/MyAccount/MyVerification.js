import { useContext, useState, useRef } from "react";
import useAuthHelper from "../../hooks/useAuthHelper";
import VisualBellContext from "../../store/visual-bell-context";
import Head from "next/head";
import { PrimaryButton } from "../UI/Buttons";
import Input from "../UI/Input";

import classes from "./MyAccount.module.scss";

const codeLength = 6;

const VerifyAccountForm = ({ setUser }) => {
	const ctx = useContext(VisualBellContext);
	const { verifyAccount, resendVerificationCode } = useAuthHelper({ ...ctx });
	const [isLoading, setIsLoading] = useState(false);
	const [isResending, setIsResending] = useState(false);
	const [error, setError] = useState();
	const [code, setCode] = useState([...Array(codeLength)].map(() => ""));
	const refs = useRef([]);

	const submitCode = async (code) => {
		setIsLoading(true);

		verifyAccount({
			details: { code: code },
			failHandler: (content) => {
				if (content.code) setError(true);
				setIsLoading(false);
			},
			successHandler: () => {
				setUser((state) => ({ ...state, verified: true }));
				ctx.setBell({
					type: "success",
					message: "Congratulations! Your account is now verified",
				});
			},
		});
	};

	const resendCodeHandler = () => {
		setIsResending(true);
		resendVerificationCode({
			successHandler: () => {
				ctx.setBell({ type: "success", message: "New code sent" });
				setIsResending(false);
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

	const pasteHandler = (e) => {
		setError();
		const paste = (e.clipboardData || window.clipboardData).getData("text").slice(0, codeLength);
		if (/[^a-zA-Z0-9]/.test(paste)) return;
		const newCode = [...paste];
		setCode(newCode);
		submitCode(newCode.join(""));
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
		<form className={classes.form}>
			<div className={classes.instruction}>
				Your account is not verified. <br /> Verifying your account will enable you to view, join or register your organisation. To continue, enter the six-digit code sent to your email.
			</div>
			<div className={classes.codeContainer}>
				{code.map((char, idx) => (
					<Input
						key={idx}
						className={`${classes.input} ${classes.codeInput}`}
						label={idx === 0 && "Verification code*"}
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
					/>
				))}
			</div>
			<div className={classes.errorMessage} style={{ opacity: error ? 1 : 0 }}>
				The code you entered is incorrect or has expired
			</div>
			<PrimaryButton className={classes.loading} isLoading={true} type="button" loadingLabel="Verifying ..." style={{ opacity: isLoading ? 1 : 0, pointerEvents: "none" }} />
			{isResending ? (
				<div className={classes.instruction} style={{ marginTop: "1rem" }}>
					Resending ...
				</div>
			) : (
				<button type="button" className={`${classes.resend} ${isLoading ? classes.disabled : ""}`} onClick={resendCodeHandler}>
					Resend code
				</button>
			)}
		</form>
	);
};

const MyVerification = ({ user, setUser }) => {
	console.log(user);

	return (
		<div className={classes.myView}>
			<Head>
				<title>Verify • {user.displayName} | CreateBase</title>
				<meta name="description" content="Verify your account to secure your account and join or register an organisation. CreateBase" />
			</Head>
			<div className={`${classes.section} ${classes.verifyAccount}`}>
				<h2>Account verification</h2>
				{!user.verified && <VerifyAccountForm setUser={setUser} />}
				{user.verified && (
					<div className={classes.verifiedCard}>
						<i className="material-icons-outlined">check_circle</i>
						<div style={{ display: "flex", flexDirection: "column" }}>
							<h3>Verified</h3>
							<div className={classes.caption}>Your account is verified</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default MyVerification;
