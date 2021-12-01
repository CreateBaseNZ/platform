import { useState } from "react";
import Link from "next/link";
import router from "next/router";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import useApi from "../../hooks/useApi";
import { PrimaryButton } from "../UI/Buttons";
import Input, { PasswordInput } from "../UI/Input";
import { isBlacklisted, nameMaxLength, nameMinLength, namePattern, nameValidation } from "../../utils/formValidation";
import { emailPattern, passwordMinLength, passwordValidate } from "../../utils/formValidation";
import classes from "./AuthForms.module.scss";

const SignupForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const { post } = useApi();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({
		mode: "onTouched",
		defaultValues: {}, // TODO prefill if in URL query params
	});

	console.log(errors);

	const onSubmit = async (input) => {
		setIsLoading(true);
		let frontEndError = false;
		if (isBlacklisted(input.firstName)) {
			setError("firstName", {
				type: "manual",
				message: "First name contains disallowed words",
			});
			frontEndError = true;
		}
		if (isBlacklisted(input.lastName)) {
			setError("lastName", {
				type: "manual",
				message: "Last name contains disallowed words",
			});
			frontEndError = true;
		}
		if (frontEndError) {
			return setIsLoading(false);
		}
		await post({
			route: "/api/auth/signup",
			input: {
				email: input.email,
				firstName: input.firstName,
				lastName: input.lastName,
				password: input.password,
				date: new Date().toString(),
			},
			failHandler: (data) => {
				if (data.content.email === "taken")
					setError("email", {
						type: "manual",
						message: "This email is already registered",
					});
				setIsLoading(false);
			},
			successHandler: async () => {
				await signIn("credentials", {
					redirect: false,
					user: input.email,
					password: input.password,
					PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
				}),
					router.push({ pathname: "/auth/verify", query: router.query });
			},
		});
	};

	return (
		<div className={classes.signupContainer}>
			<form className={`${classes.form} ${classes.signupForm}`} onSubmit={handleSubmit(onSubmit)}>
				<h1>Register an account</h1>
				<Input
					className={classes.input}
					inputProps={{
						maxLength: 254,
						placeholder: "Email*",
						...register("email", {
							required: "An email is required",
							pattern: emailPattern,
						}),
					}}
					error={errors.email}
				/>
				<Input
					className={classes.input}
					inputProps={{
						placeholder: "First name*",
						type: "text",
						maxLength: 50,
						...register("firstName", {
							required: "Please enter your first name",
							pattern: namePattern,
							validate: nameValidation,
							maxLength: nameMaxLength,
							minLength: nameMinLength,
						}),
					}}
					error={errors.firstName}
				/>
				<Input
					className={classes.input}
					inputProps={{
						placeholder: "Last name*",
						type: "text",
						maxLength: 50,
						...register("lastName", {
							required: "Please enter your last name",
							pattern: namePattern,
							validate: nameValidation,
							maxLength: nameMaxLength,
							minLength: nameMinLength,
						}),
					}}
					error={errors.lastName}
				/>
				<PasswordInput
					className={classes.input}
					inputProps={{
						placeholder: "Password*",
						...register("password", {
							required: "Please enter a password",
							minLength: passwordMinLength,
							validate: passwordValidate,
						}),
					}}
					error={errors.password}
				/>
				<PrimaryButton className={classes.submit} isLoading={isLoading} type="submit" loadingLabel="Signing you up ..." mainLabel="Sign Up" />
				<div className={classes.options}>
					<div className={`${classes.smallFont} ${classes.smallCheckbox} ${errors.terms ? classes.termsError : ""}`}>
						<input type="checkbox" {...register("terms", { required: true })} />
						<div className={classes.checkbox}>
							<i className="material-icons-outlined">check</i>
						</div>
						<label>
							Agree to{" "}
							<a className={classes.linkBtn} href="https://createbase.co.nz/terms" target="_blank">
								Terms &amp; Conditions
							</a>
						</label>
					</div>
				</div>
			</form>
			<div className={`${classes.smallFont} ${classes.switch}`}>
				Have an account?{" "}
				<Link href="/auth/login">
					<a className={classes.linkBtn}>Log in</a>
				</Link>
			</div>
		</div>
	);
};

export default SignupForm;
