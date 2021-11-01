import { useRef, useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { signIn } from "next-auth/react";
import VisualBellContext from "../../store/visual-bell-context";
import GlobalSessionContext from "../../store/global-session-context";
import Input from "../UI/Input";
import { PrimaryButton } from "../UI/Buttons";

import classes from "./AuthForms.module.scss";
import useHandleResponse from "../../hooks/useHandleResponse";

const CODE_LENGTH = 6;

const Verify = () => {
	const router = useRouter();
	const { handleResponse } = useHandleResponse();
	const { setVisualBell } = useContext(VisualBellContext);
	const { globalSession, setGlobalSession } = useContext(GlobalSessionContext);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
	const [code, setCode] = useState(router?.query?.code || [...Array(CODE_LENGTH)].map(() => ""));
	const refs = useRef([]);

	const submitCode = async (code) => {
		setIsLoading(true);
		const details = { email: globalSession.email, code: code };
		const DUMMY_STATUS = "succeeded";
		let data = {};
		try {
			data = (await axios.post("/api/auth/verify", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: details, status: DUMMY_STATUS }))["data"];
		} catch (error) {
			data.status = "error";
		} finally {
			console.log(data);
			handleResponse({
				data,
				failHandler: () => {
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
					setVisualBell({ type: "success", message: "Welcome to CreateBase!" });
				},
			});
		}
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

	if (!globalSession.loaded) return null;

	if (!globalSession.accountId) {
		signIn();
		return null;
	}

	if (globalSession.verified) {
		router.replace("/");
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
					{error}
				</div>
				<PrimaryButton className={`${classes.submit} ${classes.loadingVerifCode}`} isLoading={true} type="button" loadingLabel="Verifying ..." style={{ opacity: isLoading ? 1 : 0 }} />
			</form>
		</div>
	);
};

export default Verify;
