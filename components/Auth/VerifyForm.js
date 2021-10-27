import { useRef, useState, useContext } from "react";
import useAuthHelper from "../../hooks/useAuthHelper";
import VisualBellContext from "../../store/visual-bell-context";
import Input from "../UI/Input";
import { PrimaryButton } from "../UI/Buttons";

import classes from "./AuthForms.module.scss";
import UserSessionContext from "../../store/user-session";
import { useRouter } from "next/router";

const CODE_LENGTH = 6;

const Verify = () => {
	const router = useRouter();
	const { setVisualBell } = useContext(VisualBellContext);
	const { userSession } = useContext(UserSessionContext);
	const { verifyAccount } = useAuthHelper();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
	const [code, setCode] = useState(router?.query?.code || [...Array(CODE_LENGTH)].map(() => ""));
	const refs = useRef([]);

	console.log(code);

	const submitCode = async (code) => {
		setIsLoading(true);
		await verifyAccount({
			details: { email: userSession.email, code: code },
			failHandler: () => {
				setError("The code you entered is invalid");
				setIsLoading(false);
			},
			successHandler: () => {
				router.push(router?.query?.redirect || "/");
				setVisualBell({ type: "success", message: "Welcome to CreateBase!" });
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

	return (
		<form className={`${classes.form} ${classes.codeForm}`}>
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
							onPaste: (e) => pasteHandler(e),
							ref: (ref) => refs.current.push(ref),
						}}
						error={error}
					/>
				))}
			</div>
			<div className={classes.errorMessage} style={{ opacity: error ? 1 : 0 }}>
				The code you entered is incorrect or has expired
			</div>
			<PrimaryButton className={`${classes.submit} ${classes.loadingVerifCode}`} isLoading={true} type="button" loadingLabel="Verifying ..." style={{ opacity: isLoading ? 1 : 0 }} />
		</form>
	);
};

export default Verify;
