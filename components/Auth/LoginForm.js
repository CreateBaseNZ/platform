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
			username: window.localStorage.getItem("createbase__remember-me"),
			remember: window.localStorage.getItem("createbase__remember-me") && true,
		},
		mode: "onTouched",
	});

	const onSubmit = async (input) => {
		setIsLoading(true);
		await logIn({
			email: input.email,
			password: input.password,
			failHandler: () => {
				setError("username", {
					type: "manual",
					message: "The details you entered are incorrect",
				});
				setError("password", {
					type: "manual",
					message: "The details you entered are incorrect",
				});
				setIsLoading(false);
			},
			// TODO redirect
			// redirect: '/'
		});
	};

	return (
		<div className={classes.loginContainer}>
			<form className={`${classes.form} ${classes.loginForm}`} onSubmit={handleSubmit(onSubmit)}>
				<h1>Log in to your account</h1>
				<Input
					inputProps={{
						className: classes.input,
						placeholder: "Email or Username*",
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
				<div className={classes.options}>
					<div className={classes.smallCheckbox}>
						<input type="checkbox" {...register("remember")} />
						<div className={classes.checkbox}>
							<i className="material-icons-outlined">check</i>
						</div>
						<label className={classes.smallFont}>Remember me</label>
					</div>
					<Link href={{ pathname: "/auth", query: { action: "forgot-password" } }}>
						<a className={`${classes.smallFont} ${classes.linkBtn}`}>Forgot your password?</a>
					</Link>
				</div>
			</form>
			<SecondaryButton
				className={classes.secondaryBtn}
				isDisabled={isLoading}
				type="button"
				mainLabel="Create an Account"
				onClick={() => router.push({ pathname: "/auth", query: { action: "signup" } })}
			/>
		</div>
	);
};
