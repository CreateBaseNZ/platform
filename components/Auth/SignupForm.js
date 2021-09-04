import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PrimaryButton } from "../UI/Buttons";
import Input, { PasswordInput } from "../UI/Input";
import { isBlacklisted } from "../../utils/formValidation";
import { displayNameMinLength, displayNamePattern, emailPattern, passwordMinLength, passwordValidate, usernameMinLength, usernamePattern } from "../../utils/formValidation";
import VisualBellContext from "../../store/visual-bell-context";
import router from "next/router";
import axios from "axios";
import { signIn } from "next-auth/client";
import classes from "./AuthForms.module.scss";
import { logIn } from "../../utils/authHelpers";

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

const SignupStepTwo = ({ access, setStep, learner, setLearner }) => {
	const ctx = useContext(VisualBellContext);
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		setError,
		getValues,
		formState: { errors },
	} = useForm({
		mode: "onTouched",
		defaultValues: { username: learner.username, password: learner.password, terms: learner.terms },
	});

	useEffect(() => {
		return () => access === "learner" && setLearner((state) => ({ ...state, username: getValues("username"), password: getValues("password"), terms: getValues("terms") }));
	}, []);

	const onSubmit = async (input) => {
		console.log(input);

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
			input.displayName = "TODO set a pseudonym";
		}
		if (frontEndError) {
			return setIsLoading(false);
		}

		const newUser = { ...{ username: input.username, displayName: input.displayName, password: input.password, date: new Date().toString() }, ...(access === "educator" && { email: input.email }) };
		console.log(newUser);
		let data;
		try {
			data = (await axios.post(`/api/signup/${access === "educator" ? "educator" : "validate-username"}`, { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: newUser }))["data"];
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
		}

		if (access === "educator") {
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
			await logIn(
				input.username,
				input.password,
				() => {
					ctx.setBell({
						type: "catastrophe",
						message: "Something unexpected happened, please reload the page",
					});
				},
				() => {
					router.replace("/auth/login");
					ctx.setBell({
						type: "success",
						message: "Success! Your account has been created, log in to continue",
					});
				},
				() =>
					ctx.setBell({
						type: "success",
						message: "Success! Your account has been created",
					})
			);
		} else {
			if (data.status === "failed") {
				setError("username", {
					type: "manual",
					message: "This username is already taken",
				});
				return setIsLoading(false);
			}
			setLearner((state) => ({ ...state, username: input.username, displayName: input.displayName, password: input.password, terms: input.terms }));
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

const SignupStepThree = ({ learner, setLearner }) => {
	const ctx = useContext(VisualBellContext);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm({
		mode: "onTouched",
		defaultValues: { orgCode: learner.orgCode, orgId: learner.orgId, orgName: learner.orgName },
	});

	useEffect(() => {
		return () => setLearner((state) => ({ ...state, orgCode: getValues("orgCode"), orgId: getValues("orgId"), orgName: getValues("orgName") }));
	}, []);

	const onSubmit = async (input) => {
		setIsLoading(true);

		const newLearner = {
			username: learner.username,
			displayName: learner.displayName,
			password: learner.password,
			name: input.orgName,
			code: input.orgCode,
			type: "school",
			country: "New Zealand",
			metadata: { id: input.orgId },
			date: new Date().toString(),
		};
		let data;
		try {
			data = (await axios.post("/api/signup/learner-organisation", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: newLearner }))["data"];
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
		}

		if (data.status === "failed") {
			setError("No organisations were found with these details");
			return setIsLoading(false);
		}

		await logIn(
			learner.username,
			learner.password,
			() => {
				ctx.setBell({
					type: "catastrophe",
					message: "Something unexpected happened, please reload the page",
				});
			},
			() => {
				router.replace("/auth/login");
				ctx.setBell({
					type: "success",
					message: "Success! Your account has been created, log in to continue",
				});
			},
			() =>
				ctx.setBell({
					type: "success",
					message: "Success! Your account has been created",
				})
		);
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
					...register("orgCode", { required: "Please enter an organisation code" }),
				}}
				error={errors.orgCode || error}
			/>
			<Input
				inputProps={{
					className: classes.input,
					type: "number",
					placeholder: "Organisation ID",
					onFocus: () => setError(""),
					...register("orgId", { required: "Please enter the organisation ID" }),
				}}
				error={errors.orgId || error}
			/>
			<Input
				inputProps={{
					className: classes.input,
					type: "text",
					placeholder: "Organisation name",
					onFocus: () => setError(""),
					...register("orgName", { required: "Please enter the organisation name" }),
				}}
				error={errors.orgName || error}
			/>
			<div className={classes.errorMessage} style={{ opacity: !error && 0 }}>
				{error}
			</div>
			<PrimaryButton className={classes.submit} isLoading={isLoading} type="submit" loadingLabel="Joining org ..." mainLabel="Join" />
		</form>
	);
};

const SignupForm = () => {
	const [step, setStep] = useState(0);
	const [access, setAccess] = useState();
	const [learner, setLearner] = useState({});

	return (
		<div className={classes.signupContainer}>
			{step !== 0 && (
				<button className={`${classes.backBtn}`} type="button" onClick={() => setStep((state) => state - 1)} title="Back to account type">
					<i className="material-icons-outlined">chevron_left</i> Back
				</button>
			)}
			{step === 0 && <SignupStepOne access={access} setAccess={setAccess} setStep={setStep} />}
			{step === 1 && <SignupStepTwo access={access} setStep={setStep} learner={learner} setLearner={setLearner} />}
			{step === 2 && <SignupStepThree learner={learner} setLearner={setLearner} />}
			<div className={classes.switch}>
				Have an account?
				<button type="button" onClick={() => router.replace("/auth/login")}>
					Log in
				</button>
			</div>
		</div>
	);
};

export default SignupForm;
