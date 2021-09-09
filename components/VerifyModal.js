import { useContext, useRef, useState } from "react";
import VisualBellContext from "../store/visual-bell-context";
import ClientOnlyPortal from "./UI/ClientOnlyPortal";
import Input from "./UI/Input";
import { PrimaryButton } from "./UI/Buttons";
import useAuthHelper from "../hooks/useAuthHelper";

import classes from "./VerifyModal.module.scss";

const codeLength = 6;

const VerifyModal = ({ setIsShown, setUser }) => {
	const ctx = useContext(VisualBellContext);
	const { verifyAccount, resendVerificationCode } = useAuthHelper({ ...ctx });
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
	const [code, setCode] = useState([...Array(codeLength)].map(() => ""));
	const refs = useRef([]);

	const skipHandler = () => {
		setIsShown(false);
	};

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
				setIsShown(false);
				setShowExternal(false);
				ctx.setBell({
					type: "success",
					message: "Congratulations! Your account is now verified",
				});
			},
		});
	};

	const resendCodeHandler = () => {
		resendVerificationCode({ successHandler: () => ctx.setBell({ type: "neutral", message: "New code sent" }) });
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
		<ClientOnlyPortal selector="#modal-root">
			<div className={classes.overlay}>
				<form className={classes.modal}>
					<h1>Verification code</h1>
					<div className={classes.instructions}>Enter the verification code sent to your email</div>
					<div className={classes.codeContainer}>
						{code.map((char, idx) => (
							<Input
								key={idx}
								className={classes.inputWrapper}
								inputProps={{
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
						The code you entered is incorrect or has expired
					</div>
					<PrimaryButton className={classes.loading} isLoading={true} type="button" loadingLabel="Verifying ..." style={{ opacity: isLoading ? 1 : 0, pointerEvents: "none" }} />
					<div className={classes.verifOptions}>
						<button type="button" className={`${classes.optionBtn}  ${isLoading ? classes.disabled : ""}`} onClick={skipHandler}>
							Skip for now
						</button>
						<button type="button" className={`${classes.optionBtn} ${classes.resend} ${isLoading ? classes.disabled : ""}`} onClick={resendCodeHandler}>
							Resend code
						</button>
					</div>
				</form>
			</div>
		</ClientOnlyPortal>
	);
};

export default VerifyModal;
