import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import router from "next/router";
import { PrimaryButton, SecondaryButton } from "../UI/Buttons";
import Input, { PasswordInput } from "../UI/Input";
import classes from "./AuthForms.module.scss";
import useAuthHelper from "../../hooks/useAuthHelper";

export const LoginForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const { logIn } = useAuthHelper();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: window.localStorage.getItem("createbase__remember-me"),
			remember: window.localStorage.getItem("createbase__remember-me") && true,
		},
		mode: "onTouched",
	});

	const onSubmit = async (input) => {
		setIsLoading(true);
		await logIn({
			email: input.email,
			password: input.password,
			failHandler: (content) => {
				if (content.account === "does not exist") {
					setError("email", {
						type: "manual",
						message: "No accounts registered with this email",
					});
				} else if (content.password === "incorrect") {
					console.log("incorrect");
					setError("password", {
						type: "manual",
						message: "Incorrect password",
					});
				}
				setIsLoading(false);
			},
			successHandler: () => router.push(router?.query?.redirect || "/"),
		});
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
			<SecondaryButton className={classes.secondaryBtn} isDisabled={isLoading} type="button" mainLabel="Create an Account" onClick={() => router.replace("/auth/signup")} />
		</div>
	);
};
