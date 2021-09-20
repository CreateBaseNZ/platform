import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PrimaryButton } from "../UI/Buttons";
import Input, { PasswordInput } from "../UI/Input";
import { isBlacklisted } from "../../utils/formValidation";
import { displayNameMinLength, displayNamePattern, emailPattern, passwordMinLength, passwordValidate, usernameMinLength, usernamePattern } from "../../utils/formValidation";
import VisualBellContext from "../../store/visual-bell-context";
import router from "next/router";
import classes from "./AuthForms.module.scss";
import { logIn } from "../../utils/authHelpers";
import useSignupHelper from "../../hooks/useSignupHelper";
import getRandomName from "../../utils/randomNames";
import InviteOrgContext from "../../store/invite-org-context";
import useOrganisationHelper from "../../hooks/useOrganisationHelper";

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

const SignupStepTwo = ({ access, setStep, learner, setLearner, educator, setEducator }) => {
	const vbCtx = useContext(VisualBellContext);
	const inviteCtx = useContext(InviteOrgContext);
	const { signUpEducator, validateUsername } = useSignupHelper({ ...vbCtx });
	const { joinOrgEducator } = useOrganisationHelper({ ...inviteCtx });
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		setError,
		getValues,
		formState: { errors },
	} = useForm({
		mode: "onTouched",
		defaultValues:
			access === "learner"
				? { username: learner.username, password: learner.password, terms: learner.terms }
				: { email: educator.email, username: educator.username, displayName: educator.displayName, password: educator.password, terms: educator.terms },
	});

	useEffect(() => {
		return () => {
			if (access === "learner") {
				setLearner((state) => ({ ...state, username: getValues("username"), password: getValues("password"), terms: getValues("terms") }));
			} else {
				setEducator((state) => ({
					...state,
					email: getValues("email"),
					username: getValues("username"),
					displayName: getValues("displayName"),
					password: getValues("password"),
					terms: getValues("terms"),
				}));
			}
		};
	}, []);

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
			input.displayName = getRandomName();
		}
		if (frontEndError) {
			return setIsLoading(false);
		}

		if (access === "educator") {
			signUpEducator({
				details: { email: input.email, username: input.username, displayName: input.displayName, password: input.password },
				failHandler: (content) => {
					if (content.email)
						setError("email", {
							type: "manual",
							message: "This email is already taken",
						});
					if (content.username)
						setError("username", {
							type: "manual",
							message: "This username is already taken",
						});
					setIsLoading(false);
				},
				successHandler: async () =>
					await logIn(
						input.username,
						input.password,
						() => {
							vbCtx.setBell({
								type: "catastrophe",
								message: "Something unexpected happened, please reload the page",
							});
						},
						() => {
							router.push("/auth/login");
							vbCtx.setBell({
								type: "success",
								message: "Success! Your account has been created, log in to continue",
							});
						},
						() => {
							if (inviteCtx.details.isInvited && inviteCtx.details.type === "educator") {
								joinOrgEducator({
									details: { name: educator.orgName, code: educator.orgCode, type: "school", country: "New Zealand", metadata: { id: educator.orgId } },
									failHandler: () =>
										vbCtx.setBell({
											type: "error",
											message: `Invalid invitation to join ${educator.orgName}, please try again`,
										}),
									successHandler: () =>
										vbCtx.setBell({
											type: "success",
											message: `Success! You have joined ${educator.orgName}`,
										}),
								});
							} else {
								vbCtx.setBell({
									type: "success",
									message: "Success! Your account has been created",
								});
							}
						}
					),
			});
		} else {
			validateUsername({
				details: { username: input.username },
				failHandler: () => {
					setError("username", {
						type: "manual",
						message: "This username is already taken",
					});
					setIsLoading(false);
				},
				successHandler: () => {
					setLearner((state) => ({ ...state, username: input.username, displayName: input.displayName, password: input.password, terms: input.terms }));
					setStep(2);
				},
			});
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
				{access === "educator" && (
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
				)}
			</div>
		</form>
	);
};

const SignupStepThree = ({ learner, setLearner }) => {
	const vbCtx = useContext(VisualBellContext);
	const { signUpLearner } = useSignupHelper({ ...vbCtx });
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

		signUpLearner({
			details: {
				username: learner.username,
				displayName: learner.displayName,
				password: learner.password,
				name: input.orgName,
				code: input.orgCode,
				type: "school",
				country: "New Zealand",
				metadata: { id: input.orgId },
			},
			failHandler: () => {
				setError("No organisations were found with these details");
				setIsLoading(false);
			},
			successHandler: async () =>
				await logIn(
					learner.username,
					learner.password,
					() => {
						vbCtx.setBell({
							type: "catastrophe",
							message: "Something unexpected happened, please reload the page",
						});
					},
					() => {
						router.push("/auth/login");
						vbCtx.setBell({
							type: "success",
							message: "Success! Your account has been created, log in to continue",
						});
					},
					() =>
						vbCtx.setBell({
							type: "success",
							message: "Success! Your account has been created",
						})
				),
		});
	};

	return (
		<form className={`${classes.form} ${classes.educatorForm}`} onSubmit={handleSubmit(onSubmit)}>
			<h1>Join an Org</h1>
			<div className={classes.instructions}>Please enter your organisation details</div>
			<Input
				inputProps={{
					className: classes.input,
					placeholder: "Organisation code*",
					maxLength: 254,
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
					placeholder: "Organisation ID*",
					maxLength: 254,
					onFocus: () => setError(""),
					...register("orgId", { required: "Please enter the organisation ID" }),
				}}
				error={errors.orgId || error}
			/>
			<Input
				inputProps={{
					className: classes.input,
					type: "text",
					placeholder: "Organisation name*",
					maxLength: 254,
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

const autofillAccess = (details) => {
	if (details.isInvited && details.type) {
		return details.type;
	}
	return null;
};

const autofillDetails = (details) => {
	if (details.isInvited && details.type === "learner") {
		return { orgId: details.orgId, orgName: details.orgName, orgCode: details.orgCode };
	} else if (details.isInvited && details.type === "educator") {
		return { email: details.email, orgId: details.orgId, orgName: details.orgName, orgCode: details.orgCode };
	}
	return {};
};

const SignupForm = () => {
	const inviteCtx = useContext(InviteOrgContext);
	console.log(inviteCtx);
	const [step, setStep] = useState(inviteCtx.details.isInvited ? 1 : 0);
	const [access, setAccess] = useState(autofillAccess(inviteCtx.details));
	const [learner, setLearner] = useState(autofillDetails(inviteCtx.details));
	const [educator, setEducator] = useState(autofillDetails(inviteCtx.details));

	return (
		<div className={classes.signupContainer}>
			{step !== 0 && (
				<button className={`${classes.backBtn}`} type="button" onClick={() => setStep((state) => state - 1)} title="Back to account type">
					<i className="material-icons-outlined">chevron_left</i> Back
				</button>
			)}
			{step === 0 && <SignupStepOne access={access} setAccess={setAccess} setStep={setStep} />}
			{step === 1 && <SignupStepTwo access={access} setStep={setStep} learner={learner} setLearner={setLearner} educator={educator} setEducator={setEducator} />}
			{step === 2 && <SignupStepThree learner={learner} setLearner={setLearner} />}
			<div className={`${classes.smallFont} ${classes.switch}`}>
				Have an account?
				<button type="button" className={classes.linkBtn} onClick={() => router.push("/auth/login")}>
					Log in
				</button>
			</div>
		</div>
	);
};

export default SignupForm;
