import { useEffect, useState } from "react";
import Link from "next/link";
import router from "next/router";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { PrimaryButton, SecondaryButton } from "../UI/Buttons";
import Input, { PasswordInput } from "../UI/Input";
import classes from "./AuthForms.module.scss";

interface ILoginInputs {
	email: string;
	password: string;
}

export const LoginForm = (): JSX.Element => {
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

	useEffect(() => {
		if (router.query?.error) {
			const error = JSON.parse(router.query.error as string);
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
		}
	}, [router.query.error]);

	const onSubmit = async (input: ILoginInputs) => {
		setIsLoading(true);
		window.localStorage.setItem("createbase__remember-me", input.email);
		await signIn("credentials", {
			user: input.email,
			password: input.password,
			PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
			callbackUrl: router.query.callbackUrl as string | undefined,
		});
	};

	return (
		<div className={classes.loginContainer}>
			<form className={`${classes.form} ${classes.loginForm}`} onSubmit={handleSubmit(onSubmit)}>
				<h1>Log in to your account</h1>
				<Input
					className={classes.input}
					inputProps={{
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
					className={classes.input}
					inputProps={{
						placeholder: "Password*",
						...register("password", {
							required: "Please enter your password",
						}),
					}}
					error={errors.password}
				/>
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
				<PrimaryButton className={classes.submit} isLoading={isLoading} loadingLabel="Logging you in" mainLabel="Log In" type="submit" />
				<div className={classes.smallFont} style={{ margin: "2vh 0", alignSelf: "center" }}>
					Or
				</div>
				<SecondaryButton
					className={classes.googleAuth}
					type="button"
					loadingLabel="Loading Google auth"
					mainLabel="Log in with Google"
					onClick={() => signIn("google")}
					iconLeft={<img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/auth/google.svg" />}
				/>
			</form>
			<div className={`${classes.smallFont} ${classes.switch}`}>
				Don't have an account?{" "}
				<Link href="/auth/signup">
					<a className={classes.linkBtn}>Sign up for free</a>
				</Link>
			</div>
		</div>
	);
};
