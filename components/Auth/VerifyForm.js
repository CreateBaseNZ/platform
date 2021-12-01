import { useRef, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn, signOut } from "next-auth/react";
import useApi from "../../hooks/useApi";
import VisualBellContext from "../../store/visual-bell-context";
import GlobalSessionContext from "../../store/global-session-context";
import Input from "../UI/Input";
import { PrimaryButton } from "../UI/Buttons";

import classes from "./AuthForms.module.scss";

const CODE_LENGTH = 6;

const Verify = ({ routerEmail = "", routerCode = "" }) => {
	const router = useRouter();
	const { setVisualBell } = useContext(VisualBellContext);
	const { globalSession, setGlobalSession } = useContext(GlobalSessionContext);
	const [isLoading, setIsLoading] = useState(false);
	const [isResending, setIsResending] = useState(false);
	const [error, setError] = useState();
	const [email, setEmail] = useState(globalSession.email || routerEmail);
	const [code, setCode] = useState(Array.from(Array(CODE_LENGTH).keys()).map((i) => routerCode[i] || "") || [...Array(CODE_LENGTH)].map(() => ""));
	const { post } = useApi();
	const refs = useRef([]);

	useEffect(async () => {
		if (code.every((char) => char !== "") && email) {
			await submitCode(code.join(""));
		}
	}, []);

	// note that the session email takes precedence over url query
	// i.e. if the session is an unverified user and the url is a ocl, then the session email is used as the API input
	const submitCode = async (code) => {
		setIsLoading(true);
		await post({
			route: "/api/auth/verify",
			input: {
				email: email,
				code: code,
				date: new Date().toString(),
			},
			failHandler: (data) => {
				if (data.content === "incorrect") {
					setError("The code you entered is invalid");
				} else if (data.content === "expired") {
					setError("The code you entered has expired");
				}
				setIsLoading(false);
			},
			successHandler: () => {
				setGlobalSession((state) => ({ ...state, verified: true }));
				router.push(router.query.callbackUrl || "/");
				setVisualBell({ type: "success", message: "Your account is now verified" });
			},
		});
	};

	const resendCodeHandler = async () => {
		setIsResending(true);
		await post({
			route: "/api/auth/resend-verify-code",
			input: { accountId: globalSession.accountId, date: new Date().toString() },
			successHandler: () => {
				setVisualBell({ type: "neutral", message: "A new verification code has been sent" });
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
		if (idx !== CODE_LENGTH - 1 && e.target.value) {
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
		const paste = (e.clipboardData || window.clipboardData).getData("text").slice(0, CODE_LENGTH);
		if (/[^a-zA-Z0-9]/.test(paste)) return;
		const newCode = [...paste];
		setCode(newCode);
		submitCode(newCode.join(""));
	};

	if (!globalSession.loaded || !router.isReady) return null;

	if (globalSession.verified) {
		router.replace("/");
		return null;
	}

	if (!email) {
		signIn();
		return null;
	}

	return (
		<div className={classes.authCard} style={{ width: 600, height: "auto" }}>
			<form className={`${classes.form} ${classes.codeForm}`}>
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
				{!isLoading && (
					<div className={classes.verifOptions}>
						<button
							className={`${classes.smallFont} ${classes.switch}`}
							onClick={() => {
								signOut({ redirect: false });
								router.push("/");
							}}>
							Cancel
						</button>
						<div className={`${classes.smallFont} ${classes.switch}`}>
							{isResending ? (
								"Resending ..."
							) : (
								<button type="button" className={classes.linkBtn} onClick={resendCodeHandler}>
									Resend code
								</button>
							)}
						</div>
					</div>
				)}
			</form>
		</div>
	);
};

export default Verify;
