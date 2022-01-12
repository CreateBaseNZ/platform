import { useRef, useState, useContext, useEffect, KeyboardEvent, ChangeEvent, ClipboardEvent } from "react";
import { useRouter } from "next/router";
import { signIn, signOut } from "next-auth/react";
import useApi from "../../hooks/useApi";
import VisualBellContext from "../../store/visual-bell-context";
import GlobalSessionContext from "../../store/global-session-context";
import Input, { IInputProps } from "../UI/Input";
import { PrimaryButton } from "../UI/Buttons";

import classes from "./AuthForms.module.scss";

interface IVerifyProps {
	routerEmail: string;
	routerCode: string;
}

const CODE_LENGTH = 6;

const Verify = ({ routerEmail = "", routerCode = "" }: IVerifyProps): JSX.Element | null => {
	const router = useRouter();
	const { setVisualBell } = useContext(VisualBellContext);
	const { loaded, globalSession, setGlobalSession } = useContext(GlobalSessionContext);
	const [isLoading, setIsLoading] = useState(false);
	const [isResending, setIsResending] = useState(false);
	const [error, setError] = useState<string | undefined>(undefined);
	const [email, setEmail] = useState(globalSession.email || routerEmail);
	const [code, setCode] = useState(Array.from(Array(CODE_LENGTH).keys()).map((i) => routerCode[i] || "") || [...Array(CODE_LENGTH)].map(() => ""));
	const { post } = useApi();
	const refs = useRef<HTMLInputElement[]>([]);

	useEffect(() => {
		(async () => {
			if (code.every((char) => char !== "") && email) await submitCode(code.join(""));
		})();
	}, []);

	// note that the session email takes precedence over url query
	// i.e. if the session is an unverified user and the url is a ocl, then the session email is used as the API input
	const submitCode = async (code: string) => {
		setIsLoading(true);
		await post(
			"/api/auth/verify",
			{
				email: email,
				code: code,
				date: new Date().toString(),
			},
			() => {
				setGlobalSession((state) => ({ ...state, verified: true }));
				router.push((router.query.callbackUrl as string) || "/");
				setVisualBell("success", "Your account is now verified");
			},
			(data) => {
				if (data.content === "incorrect") {
					setError("The code you entered is invalid");
				} else if (data.content === "expired") {
					setError("The code you entered has expired");
				}
				setIsLoading(false);
			}
		);
	};

	const resendCodeHandler = async () => {
		setIsResending(true);
		await post("/api/auth/resend-verify-code", { accountId: globalSession.accountId, date: new Date().toString() }, () => {
			setVisualBell("neutral", "A new verification code has been sent");
			setIsResending(false);
		});
	};

	const changeHandler = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
		setError(undefined);
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

	const keyDownHandler = (e: KeyboardEvent, idx: number) => {
		if (e.key === "Backspace" && !code[idx] && idx !== 0) {
			setError(undefined);
			const newCode = [...code];
			newCode[idx - 1] = "";
			setCode(newCode);
			refs.current[idx - 1].focus();
		}
	};

	const pasteHandler = (e: ClipboardEvent<HTMLInputElement>) => {
		setError(undefined);
		const paste = e.clipboardData.getData("text").slice(0, CODE_LENGTH);
		if (/[^a-zA-Z0-9]/.test(paste)) return;
		const newCode = [...paste];
		setCode(newCode);
		submitCode(newCode.join(""));
	};

	if (!loaded || !router.isReady) return null;

	if (globalSession.verified) {
		router.replace("/");
		return null;
	}

	if (!email) {
		signIn();
		return null;
	}

	return (
		<div className={classes.verifyCard} style={{ width: 600, height: "auto" }}>
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
								onChange: (e: ChangeEvent<HTMLInputElement>) => changeHandler(e, idx),
								onKeyDown: (e: KeyboardEvent) => keyDownHandler(e, idx),
								onPaste: (e: ClipboardEvent<HTMLInputElement>) => pasteHandler(e),
								ref: (ref: HTMLInputElement) => refs.current.push(ref),
							}}
							error={error}
						/>
					))}
				</div>
				<div className={classes.errorMessage} style={{ opacity: error ? 1 : 0 }}>
					{error}
				</div>
				<PrimaryButton className={`${classes.submit} ${classes.loadingVerifCode}`} isLoading={true} type="button" loadingLabel="Verifying ..." style={{ opacity: isLoading ? 1 : 0 }} mainLabel="" />
				{!isLoading && (
					<div className={classes.verifOptions}>
						<button className={`${classes.smallFont} ${classes.switch}`} onClick={() => signOut({ redirect: false })}>
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
