import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import Input, { PasswordInput } from "../UI/Input";
import { PrimaryButton, SecondaryButton, TertiaryButton } from "../UI/Buttons";
import { displayNameMinLength, displayNamePattern, emailPattern, passwordMinLength, passwordValidate, usernameMinLength, usernamePattern, isBlacklisted } from "../../utils/formValidation";

import classes from "./UserDetailsForm.module.scss";
import useProfileHelper from "../../hooks/useProfileHelper";
import useLicenseHelper from "../../hooks/useLicenseHelper";
import getRandomName from "../../utils/randomNames";

const UserDetailsForm = ({ user, setUser, ctx }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [learnerName, setLearnerName] = useState(user.displayName);
	const { updateProfile } = useProfileHelper({ ...ctx });
	const {
		register,
		handleSubmit,
		reset,
		setError,
		setValue,
		formState: { errors, isDirty },
	} = useForm({
		defaultValues: {
			displayName: user.displayName,
			email: user.email,
			username: user.username,
		},
		mode: "onTouched",
	});

	useEffect(
		() =>
			reset({
				displayName: user.displayName,
				email: user.email,
				username: user.username,
			}),
		[user]
	);

	const newNameHandler = () => {
		const randomName = getRandomName();
		setLearnerName(randomName);
		setValue("displayName", randomName, { shouldDirty: true });
	};

	const onSubmit = async (input) => {
		setIsLoading(true);
		let frontendError = false;
		if (isBlacklisted(input.displayName)) {
			setError("displayName", {
				type: "manual",
				message: "Display name contains disallowed words",
			});
			frontendError = true;
		}
		// if (isBlacklisted(input.username)) {
		//   setError("username", {
		//     type: "manual",
		//     message: "Username contains disallowed words",
		//   });
		//   frontendError = true;
		// }
		if (frontendError) {
			return setIsLoading(false);
		}
		updateProfile({
			details: { displayName: input.displayName },
			successHandler: () => {
				setUser((state) => ({ ...state, ...input }));
				ctx.setBell({
					type: "success",
					message: "Successfully updated details",
				});
				setIsLoading(false);
			},
		});
	};

	return (
		<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
			{/* <Input
        className={classes.input}
        label="Email"
        inputProps={{
          maxLength: 254,
          ...register("email", {
            required: "An email is required",
            pattern: emailPattern,
          }),
        }}
        error={errors.email}
      /> */}
			{/* <Input
        className={classes.input}
        label="Username"
        inputProps={{
          maxLength: 254,
          ...register("username", {
            required: "Please enter a username",
            minLength: usernameMinLength,
            pattern: usernamePattern,
          }),
        }}
        error={errors.username}
      /> */}
			{user.type === "learner" ? (
				<div className={classes.learnerNameContainer}>
					<input {...register("displayName")} style={{ visibility: "hidden" }} />
					<div className={classes.caption}>Display name</div>
					<div className={classes.learnerName}>
						{learnerName} <SecondaryButton type="button" className={classes.changeNameBtn} mainLabel="Randomise!" onClick={newNameHandler} />
					</div>
				</div>
			) : (
				<Input
					className={classes.input}
					label="Display Name"
					inputProps={{
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
			<div className={classes.btnContainer}>
				<PrimaryButton className={classes.submit} isLoading={isLoading} type="submit" iconLeft={<i className="material-icons-outlined">done</i>} loadingLabel="Saving ..." mainLabel="Update" />
			</div>
			{isDirty && <div className={classes.unsavedChanges}>You have unsaved changes</div>}
		</form>
	);
};

export default UserDetailsForm;

export const ChangePasswordForm = ({ setChangingPassword, ctx }) => {
	const { changePassword } = useLicenseHelper({ ...ctx });
	const [isLoading, setIsLoading] = useState(false);
	const password = useRef({});
	const {
		register,
		handleSubmit,
		trigger,
		watch,
		setError,
		formState: { errors, touchedFields },
	} = useForm({ mode: "onTouched" });
	password.current = watch("newPassword", "");

	const onSubmit = async (input) => {
		setIsLoading(true);
		changePassword({
			details: { oldPassword: input.currentPassword, password: input.newPassword },
			failHandler: (content) => {
				if (content.password) setError("currentPassword", { type: "manual", message: "Incorrect password" }, { shouldFocus: true });
				setIsLoading(false);
			},
			successHandler: () => {
				setChangingPassword(false);
				ctx.setBell({
					type: "success",
					message: "Successfully changed password",
				});
			},
		});
	};

	useEffect(() => {
		touchedFields.confirmPassword && trigger("confirmPassword");
	}, [password.current]);

	return (
		<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
			<PasswordInput
				className={classes.input}
				label="Current Password"
				inputProps={{
					type: "password",
					...register("currentPassword", {
						required: "Please enter your current password",
					}),
				}}
				error={errors.currentPassword}
			/>
			<PasswordInput
				className={classes.input}
				label="New Password"
				inputProps={{
					...register("newPassword", {
						required: "Please enter your new password",
						minLength: passwordMinLength,
						validate: passwordValidate,
					}),
				}}
				error={errors.newPassword}
			/>
			<PasswordInput
				className={classes.input}
				label="Confirm Password"
				inputProps={{
					...register("confirmPassword", {
						required: "Please confirm your new password",
						validate: (value) => value === password.current || "Passwords do not match",
					}),
				}}
				error={errors.confirmPassword}
			/>
			<div className={classes.btnContainer}>
				{!isLoading && <TertiaryButton className={classes.cancel} type="button" onClick={() => setChangingPassword(false)} mainLabel="Cancel" />}
				<PrimaryButton className={classes.submit} isLoading={isLoading} iconLeft={<i className="material-icons-outlined">save</i>} type="submit" loadingLabel="Saving ..." mainLabel="Save" />
			</div>
		</form>
	);
};
