import { useState } from "react";
import Link from "next/link";
import router from "next/router";
import { signIn } from "next-auth/react";
import { useForm, ValidationRule } from "react-hook-form";
import useApi from "../../hooks/useApi";
import { PrimaryButton, SecondaryButton } from "../UI/Buttons";
import Input, { PasswordInput } from "../UI/Input";
import { isBlacklisted, nameMaxLength, nameMinLength, namePattern, nameValidation } from "../../utils/formValidation";
import { emailPattern, passwordMinLength, passwordValidate } from "../../utils/formValidation";
import classes from "./AuthForms.module.scss";

interface ISignupInputs {
	email: string;
	firstName: string;
	lastName: string;
	password: string;
}

const SignupForm = (): JSX.Element => {
	const [isLoading, setIsLoading] = useState(false);
	const { post } = useApi();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({
		mode: "onTouched",
		// defaultValues: {}, // TODO prefill if in URL query params
	});

	const onSubmit = async (input: ISignupInputs) => {
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
		await post(
			"/api/auth/signup",
			{
				email: input.email,
				firstName: input.firstName,
				lastName: input.lastName,
				password: input.password,
				date: new Date().toString(),
			},
			async () => {
				await signIn("credentials", {
					redirect: false,
					user: input.email,
					password: input.password,
					PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
				}),
					router.push({ pathname: "/auth/verify", query: router.query });
			},
			(data) => {
				if (data.content.email === "taken")
					setError("email", {
						type: "manual",
						message: "This email is already registered",
					});
				setIsLoading(false);
			}
		);
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
							pattern: emailPattern as ValidationRule<RegExp>,
						}),
					}}
					error={errors.email}
				/>
				<div style={{ display: "flex" }}>
					<Input
						className={classes.input}
						style={{ marginRight: "0.5rem" }}
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
						style={{ marginLeft: "0.5rem" }}
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
				</div>
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
				<div className={classes.options}>
					<div className={`${classes.smallFont} ${classes.smallCheckbox} ${errors.terms ? classes.termsError : ""}`}>
						<input type="checkbox" {...register("terms", { required: true })} />
						<div className={classes.checkbox}>
							<i className="material-icons-outlined">check</i>
						</div>
						<label>
							Agree to{" "}
							<a className={classes.linkBtn} href="https://createbase.co.nz/terms" target="_blank" rel="noreferrer">
								Terms &amp; Conditions
							</a>
						</label>
					</div>
				</div>
				<PrimaryButton className={classes.submit} isLoading={isLoading} type="submit" loadingLabel="Signing you up ..." mainLabel="Sign Up" />
				<div className={classes.smallFont} style={{ margin: "2vh 0", alignSelf: "center" }}>
					Or
				</div>
				<SecondaryButton
					className={classes.googleAuth}
					type="button"
					loadingLabel="Loading Google auth"
					mainLabel="Sign up with Google"
					onClick={() => signIn("google")}
					iconLeft={<img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/auth/google.svg" />}
				/>
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
