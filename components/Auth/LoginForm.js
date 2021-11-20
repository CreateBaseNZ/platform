import { useEffect, useState } from "react";
import Link from "next/link";
import router from "next/router";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { PrimaryButton, SecondaryButton, TertiaryButton } from "../UI/Buttons";
import Input, { PasswordInput } from "../UI/Input";
import classes from "./AuthForms.module.scss";

export const LoginForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		setError,
		reset,
		formState: { errors },
	} = useForm({
		mode: "onTouched",
	});

	useEffect(() => {
		if (window) {
			reset({ email: window.localStorage.getItem("createbase__remember-me"), remember: !!window.localStorage.getItem("createbase__remember-me") });
		}
	}, []);

	const onSubmit = async (input) => {
		setIsLoading(true);
		window.localStorage.setItem("createbase__remember-me", input.email);
		const result = await signIn("credentials", {
			redirect: false,
			user: input.email,
			password: input.password,
			PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
		});
		if (result.error) {
			const error = JSON.parse(result.error);
			if (error.status === "failed") {
				if (error.content.account === "does not exist") {
					setError("email", {
						type: "manual",
						message: "No accounts registered with this email",
					});
				} else if (error.content.password === "incorrect") {
					setError("password", {
						type: "manual",
						message: "Incorrect password",
					});
				}
				setIsLoading(false);
			} else {
				return router.push("/404");
			}
		}
	};

	return (
		<div className={classes.loginContainer}>
			<form className={`${classes.form} ${classes.loginForm}`} onSubmit={handleSubmit(onSubmit)}>
				<h1>Log in to your account</h1>
				<Input
					inputProps={{
						className: classes.input,
						placeholder: "Email*",
						type: "text",
						maxLength: 254,
						...register("email", {
							required: "Please enter your email",
						}),
					}}
					error={errors.email}
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
				<div className={classes.options}>
					<div className={classes.smallCheckbox}>
						<input type="checkbox" {...register("remember")} />
						<div className={classes.checkbox}>
							<i className="material-icons-outlined">check</i>
						</div>
						<label className={classes.smallFont}>Remember me</label>
					</div>
					<Link href="/auth/forgot-password">
						<a className={`${classes.smallFont} ${classes.linkBtn}`}>Forgot your password?</a>
					</Link>
				</div>
			</form>
			<TertiaryButton
				className={classes.secondaryBtn}
				isDisabled={isLoading}
				type="button"
				mainLabel="Create an Account"
				onClick={() => router.replace({ pathname: "/auth/signup", query: router.query })}
			/>
		</div>
	);
};
