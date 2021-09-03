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

const SignupStepTwo = ({ access }) => {
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
		if (isBlacklisted(input.displayName)) {
			setError("username", {
				type: "manual",
				message: "Username contains disallowed words",
			});
			frontEndError = true;
		}
		if (frontEndError) {
			return setIsLoading(false);
		}

		const newUser = { email: input.email, username: input.username, displayName: input.displayName, password: input.password, date: new Date().toString() };
		let data;
		try {
			data = (await axios.post("/api/signup/educator", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: newUser }))["data"];
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
		router.push("/auth/login");
		ctx.setBell({
			type: "success",
			message: "Success! You account has been created, please log in to continue",
		});
	};

	return (
		<form className={`${classes.form} ${classes.signupForm}`} onSubmit={handleSubmit(onSubmit)}>
			<h1>Register a{access === "educator" ? "n Educator" : " Learner"} account</h1>
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
			{/* 
      // TODO add this back in after demo
      <div className={classes.options}>
        <div
          className={`${classes.terms} ${
            errors.terms ? classes.termsError : ""
          }`}
        >
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
      </div> */}
		</form>
	);
};

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

const SignupForm = ({ setIsSignup }) => {
	const [step, setStep] = useState(0);
	const [access, setAccess] = useState();

	return (
		<div className={classes.signupContainer}>
			{step === 1 && (
				<button className={`${classes.backBtn}`} type="button" onClick={() => setStep(0)} title="Back to account type">
					<i className="material-icons-outlined">chevron_left</i> Back
				</button>
			)}
			{step === 0 && <SignupStepOne access={access} setAccess={setAccess} setStep={setStep} />}
			{step === 1 && <SignupStepTwo access={access} />}
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
