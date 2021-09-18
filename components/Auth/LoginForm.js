import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import router from "next/router";
import { logIn } from "../../utils/authHelpers";
import { PrimaryButton, SecondaryButton } from "../UI/Buttons";
import Input, { PasswordInput } from "../UI/Input";
import classes from "./AuthForms.module.scss";
import VisualBellContext from "../../store/visual-bell-context";
import useAuthHelper from "../../hooks/useAuthHelper";

export const LoginForm = ({ setUser }) => {
	const ctx = useContext(VisualBellContext);
	const { verifyAccount } = useAuthHelper({ ...ctx });
	const [isLoading, setIsLoading] = useState(false);
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

		await logIn(
			input.username,
			input.password,
			() =>
				ctx.setBell({
					type: "catastrophe",
					message: "Something unexpected happened, please reload the page",
				}),
			() => {
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
			async () => {
				if (input.remember) {
					window.localStorage.setItem("createbase__remember-me", input.username);
				} else {
					window.localStorage.removeItem("createbase__remember-me");
				}
				if (router?.query?.authView[1] === "verify") {
					await verifyAccount({
						details: { code: router.query.authView[2] },
						criticalHandler: () => {
							ctx.setBell({ type: "error", message: "Incorrect verification code" });
							router.push("/");
						},
						failHandler: () => ctx.setBell({ type: "error", message: "Incorrect verification code" }),
						successHandler: () => {
							ctx.setBell({
								type: "success",
								message: "Congratulations! Your account is now verified",
							});
						},
					});
				}
			},
			"/" + router?.query?.authView?.slice(1)?.join("/")
		);
	};

	return (
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
			<SecondaryButton className={classes.secondaryBtn} isDisabled={isLoading} type="button" mainLabel="Create an Account" onClick={() => router.push("/auth/signup")} />
			<div className={classes.options}>
				<div className={classes.smallCheckbox}>
					<input type="checkbox" {...register("remember")} />
					<div className={classes.checkbox}>
						<i className="material-icons-outlined">check</i>
					</div>
					<label className={classes.smallFont}>Remember me</label>
				</div>
				<button type="button" className={`${classes.smallFont} ${classes.linkBtn}`} onClick={() => router.push("/auth/forgot-password")}>
					Forgot your password?
				</button>
			</div>
		</form>
	);
};
