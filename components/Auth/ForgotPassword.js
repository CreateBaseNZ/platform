import { useContext, useState } from "react";
import router from "next/router";
import { useForm } from "react-hook-form";
import Input from "../UI/Input";
import { PrimaryButton } from "../UI/Buttons";
import { emailPattern } from "../../utils/formValidation";
import VisualBellContext from "../../store/visual-bell-context";

import axios from "axios";

import classes from "./AuthForms.module.scss";

const ForgotPassword = () => {
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
		let data;
		try {
			data = (await axios.post("/api/auth/reset-password-email", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: { email: input.email } }))["data"];
		} catch (error) {
			data = { status: "error", content: error };
		}
		console.log(data);
		if (data.status === "critical error") {
			return ctx.setBell({
				type: "catastrophe",
				message: "Something unexpected happened, please reload the page",
			});
		} else if (data.status === "error") {
			return ctx.setBell({
				type: "catastrophe",
				message: "Something unexpected happened, please reload the page",
			});
		} else if (data.status === "failed") {
			setError("email", {
				type: "manual",
				message: "We could not find an account with that email",
			});
			return setIsLoading(false);
		}

		router.push("/auth/reset-password");
		ctx.setBell({ type: "neutral", message: "Recovery code sent" });
	};

	return (
		<div className={classes.forgotPass}>
			<form className={`${classes.form} ${classes.forgotPassForm}`} onSubmit={handleSubmit(onSubmit)}>
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
			<div className={classes.forgotOptions}>
				<button type="button" className={`${classes.smallFont} ${classes.linkBtn}`} onClick={() => router.push("/auth/login")}>
					Back to Login
				</button>
				<div className={classes.smallFont}>
					Received a code?
					<button type="button" className={`${classes.linkBtn} ${classes.enterCode}`} onClick={() => router.push("/auth/reset-password")}>
						Enter it here
					</button>
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;
