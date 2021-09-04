import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PrimaryButton } from "../UI/Buttons";
import Input, { PasswordInput } from "../UI/Input";
import { isBlacklisted } from "../../utils/formValidation";
import { displayNameMinLength, displayNamePattern, emailPattern, passwordMinLength, passwordValidate, usernameMinLength, usernamePattern } from "../../utils/formValidation";
import VisualBellContext from "../../store/visual-bell-context";
import classes from "./AuthForm.module.scss";
import router from "next/router";
import axios from "axios";
import { signIn } from "next-auth/client";

const SignupStepOne = ({ setStep, access, setAccess }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	const changeHandler = (e) => {
		setError("");
		setAccess(e.target.value);
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		if (!access) {
			setError("Please select an option");
			return setIsLoading(false);
		}
		setIsLoading(false);
		setStep(1);
	};

	return (
		<form className={`${classes.form} ${classes.signupForm}`}>
			<h1>Are you an Educator or a Learner?</h1>
			<div className={`${classes.input} ${classes.inputCheckbox} ${error ? classes.inputError : ""}`}>
				<input type="radio" name="access" value="educator" onChange={changeHandler} checked={access === "educator"} />
				<label>Educator</label>
			</div>
			<div className={`${classes.input} ${classes.inputCheckbox} ${error ? classes.inputError : ""}`}>
				<input type="radio" name="access" value="learner" onChange={changeHandler} checked={access === "learner"} />
				<label>Learner</label>
			</div>
			<div className={classes.errorMessage} style={{ opacity: !error && 0 }}>
				{error}
			</div>
			<PrimaryButton className={classes.submit} isLoading={isLoading} type="button" onClick={onSubmit} loadingLabel="Loading ..." mainLabel="Continue" />
		</form>
	);
};

const SignupStepTwo = ({ access, setStep }) => {
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
		let frontEndError = false;
		if (isBlacklisted(input.username)) {
			setError("displayName", {
				type: "manual",
				message: "Display name contains disallowed words",
			});
			frontEndError = true;
		}
		if (access === "educator") {
			if (isBlacklisted(input.displayName)) {
				setError("username", {
					type: "manual",
					message: "Username contains disallowed words",
				});
				frontEndError = true;
			}
		} else {
			input.displayName = "//TODO set a pseudonym";
		}
		if (frontEndError) {
			return setIsLoading(false);
		}

		const newUser = { ...{ username: input.username, displayName: input.displayName, password: input.password, date: new Date().toString() }, ...(access === "educator" && { email: input.email }) };
		console.log(newUser);
		let data;
		try {
			data = (await axios.post(`/api/signup/${access === "educator" ? "educator" : "learner-organisation"}`, { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: newUser }))["data"];
		} catch (error) {
			if (error.response) {
				data = error.response.data;
			} else if (error.request) {
				data = { status: "error", content: error.request };
			} else {
				data = { status: "error", content: error.message };
			}
			ctx.setBell({
				type: "catastrophe",
				message: "Oops! Something went wrong, please refresh the page and try again",
			});
			return setIsLoading(false);
		}
		if (data.status === "failed") {
			if (data.content.email) {
				setError("email", {
					type: "manual",
					message: "This email is already taken",
				});
			}
			if (data.content.username) {
				setError("username", {
					type: "manual",
					message: "This username is already taken",
				});
			}
			return setIsLoading(false);
		}

		if (access === "educator") {
			const result = await signIn("credentials", {
				redirect: false,
				username: input.username,
				password: input.password,
				type: "username",
				PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
			});
			if (result.error) {
				ctx.setBell({
					type: "catastrophe",
					message: "Something unexpected happened, please reload the page",
				});
				return setIsLoading(false);
			}
			router.replace("/browse");
			ctx.setBell({
				type: "success",
				message: "Success! You account has been created",
			});
		} else {
			// TODO validate username and password for learner
			setStep(2);
			setIsLoading(false);
		}
	};

	return (
		<form className={`${classes.form} ${classes.signupForm}`} onSubmit={handleSubmit(onSubmit)}>
			<h1>Register a{access === "educator" ? "n Educator" : " Learner"} account</h1>
			{access === "educator" && (
				<Input
					inputProps={{
						className: classes.input,
						maxLength: 254,
						placeholder: "Email*",
						...register("email", {
							required: "An email is required",
							pattern: emailPattern,
						}),
					}}
					error={errors.email}
				/>
			)}
			<Input
				inputProps={{
					className: classes.input,
					placeholder: "Username*",
					type: "text",
					maxLength: 254,
					...register("username", {
						required: "Please enter a username",
						minLength: usernameMinLength,
						pattern: usernamePattern,
					}),
				}}
				error={errors.username}
			/>
			{access === "educator" && (
				<Input
					inputProps={{
						className: classes.input,
						placeholder: "Display name*",
						type: "text",
						maxLength: 254,
						...register("displayName", {
							required: "A display name is required",
							minLength: displayNameMinLength,
							pattern: displayNamePattern,
						}),
					}}
					error={errors.displayName}
				/>
			)}
			<PasswordInput
				inputProps={{
					className: classes.input,
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
				<div className={`${classes.terms} ${errors.terms ? classes.termsError : ""}`}>
					<input type="checkbox" {...register("terms", { required: true })} />
					<div className={classes.checkbox}>
						<i className="material-icons-outlined">check</i>
					</div>
					<label>
						Agree to{" "}
						<a href="https://createbase.co.nz/terms" target="_blank">
							Terms &amp; Conditions
						</a>
					</label>
				</div>
			</div>
		</form>
	);
};

const SignupStepThree = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: "onTouched",
	});

	const onSubmit = async (input) => {
		setIsLoading(true);
		console.log(input);

		const anError = true;
		if (anError) {
			setError("Incorrect details, please try again");
			return setIsLoading(false);
		}

		// TODO: Success handler
	};

	return (
		<form className={`${classes.form} ${classes.educatorForm}`} onSubmit={handleSubmit(onSubmit)}>
			<h1>Join an Org</h1>
			<div className={classes.instructions}>Please enter your organisation details</div>
			<Input
				inputProps={{
					className: classes.input,
					placeholder: "Organisation code",
					type: "text",
					onFocus: () => setError(""),
					...register("orgCode", { required: true }),
				}}
				error={errors.orgCode}
			/>
			<Input
				inputProps={{
					className: classes.input,
					type: "text",
					placeholder: "Organisation ID",
					onFocus: () => setError(""),
					...register("orgId", { required: true }),
				}}
				error={errors.orgId}
			/>
			<Input
				inputProps={{
					className: classes.input,
					type: "text",
					placeholder: "Organisation name",
					onFocus: () => setError(""),
					...register("orgName", { required: true }),
				}}
				error={errors.orgName}
			/>
			<div className={classes.errorMessage} style={{ opacity: !error && 0 }}>
				{error}
			</div>
			<PrimaryButton className={classes.submit} isLoading={isLoading} type="submit" loadingLabel="Joining org ..." mainLabel="Join" />
		</form>
	);
};

const SignupForm = ({ setIsSignup }) => {
	const [step, setStep] = useState(0);
	const [access, setAccess] = useState();

	return (
		<div className={classes.signupContainer}>
			{step !== 0 && (
				<button className={`${classes.backBtn}`} type="button" onClick={() => setStep((state) => state - 1)} title="Back to account type">
					<i className="material-icons-outlined">chevron_left</i> Back
				</button>
			)}
			{step === 0 && <SignupStepOne access={access} setAccess={setAccess} setStep={setStep} />}
			{step === 1 && <SignupStepTwo access={access} setStep={setStep} />}
			{step === 2 && <SignupStepThree />}
			<div className={classes.switch}>
				Have an account?
				<button type="button" onClick={() => setIsSignup(false)}>
					Log in
				</button>
			</div>
		</div>
	);
};

export default SignupForm;
