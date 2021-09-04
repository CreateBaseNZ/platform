import { useState } from "react";
import router from "next/router";
import { useForm } from "react-hook-form";
import Input from "../UI/Input";
import { PrimaryButton } from "../UI/Buttons";

import classes from "./AuthForms.module.scss";
import { emailPattern } from "../../utils/formValidation";

const ForgotPassword = () => {
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
			data = (await axios.post("/api/auth/reset-password-email", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: input.email }))["data"];
		} catch (error) {
			//TODO handle error
			if (error.response) {
				data = error.response.data;
			} else if (error.request) {
				data = { status: "error", content: error.request };
			} else {
				data = { status: "error", content: error.message };
			}
			alert("An error occurred, please reload the page");
		}

		router.push("/auth/reset-password");
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
			<button type="button" className={classes.backToLogin} onClick={() => router.push("/auth/login")}>
				Back to Login
			</button>
		</div>
	);
};

export default ForgotPassword;
