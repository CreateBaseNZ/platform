import { useState } from "react";
import { useForm } from "react-hook-form";
import router from "next/router";
import { signIn } from "next-auth/client";
import { PrimaryButton, SecondaryButton } from "../UI/Buttons";
import Input, { PasswordInput } from "../UI/Input";
import classes from "./AuthForm.module.scss";

export const LoginForm = ({ setIsSignup }) => {
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({
		defaultValues: {
			username: window.localStorage.getItem("createbase__remember-me"),
		},
		mode: "onTouched",
	});

	const onSubmit = async (input) => {
		setIsLoading(true);
		const result = await signIn("credentials", {
			redirect: false,
			username: input.username,
			password: input.password,
			type: "username",
			PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
		});

		if (result.error) {
			// incorrect login
			setError("username", {
				type: "manual",
				message: result.error,
			});
			setError("password", {
				type: "manual",
				message: result.error,
			});
			return setIsLoading(false);
		}

		if (input.remember) {
			window.localStorage.setItem("createbase__remember-me", input.username);
		} else {
			window.localStorage.removeItem("createbase__remember-me");
		}
		// setIsLoading(false);
		router.replace("/browse");
	};

	return (
		<form className={`${classes.form} ${classes.loginForm}`} onSubmit={handleSubmit(onSubmit)}>
			<h1>Log in to your account</h1>
			<Input
				inputProps={{
					className: classes.input,
					placeholder: "Username*",
					type: "text",
					maxLength: 254,
					...register("username", {
						required: "Please enter your username",
					}),
				}}
				error={errors.username}
			/>
			<PasswordInput
				inputProps={{
					className: classes.input,
					placeholder: "Password*",
					...register("password", {
						required: "Please enter your password",
					}),
				}}
				error={errors.password}
			/>
			<PrimaryButton className={classes.submit} isLoading={isLoading} type="submit" loadingLabel="Logging you in ..." mainLabel="Log In" />
			<SecondaryButton className={classes.secondaryBtn} isDisabled={isLoading} type="button" mainLabel="Create an Account" onClick={() => setIsSignup(true)} />
			<div className={classes.options}>
				<div className={classes.remember}>
					<input type="checkbox" {...register("remember")} />
					<div className={classes.checkbox}>
						<i className="material-icons-outlined">check</i>
					</div>
					<label>Remember me</label>
				</div>
				<button type="button" className={classes.forgot} onClick={() => console.log("//TODO")}>
					Forgot your password?
				</button>
			</div>
		</form>
	);
};
