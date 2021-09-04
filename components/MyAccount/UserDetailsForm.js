import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Input, { PasswordInput } from "../UI/Input";
import { PrimaryButton, TertiaryButton } from "../UI/Buttons";
import { displayNameMinLength, displayNamePattern, emailPattern, passwordMinLength, passwordValidate, usernameMinLength, usernamePattern, isBlacklisted } from "../../utils/formValidation";

import classes from "./UserDetailsForm.module.scss";

const UserDetailsForm = ({ user, setUser, ctx }) => {
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		setError,
		formState: { errors },
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

		// EXAMPLE: Update data
		const newDetails = { date: new Date().toString(), displayName: input.displayName };
		console.log(newDetails);
		let data;
		try {
			data = (await axios.post("/api/profile/update", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: newDetails }))["data"];
		} catch (error) {
			// TODO handle error
			console.log(error);
			if (error.response) {
				data = error.response.data;
			} else if (error.request) {
				data = { status: "error", content: error.request };
			} else {
				data = { status: "error", content: error.message };
			}
			alert("TODO: an error occurred");
			return setIsLoading(false);
		}
		console.log(data);

		setUser((state) => ({ ...state, ...input }));
		ctx.setBell({
			type: "success",
			message: "Successfully updated details",
		});
		setIsLoading(false);
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
			<div className={classes.btnContainer}>
				<PrimaryButton className={classes.submit} isLoading={isLoading} type="submit" iconLeft={<i className="material-icons-outlined">done</i>} loadingLabel="Saving ..." mainLabel="Update" />
			</div>
		</form>
	);
};

export default UserDetailsForm;

export const ChangePasswordForm = ({ setChangingPassword, ctx }) => {
	const [isSaving, setIsSaving] = useState(false);
	const password = useRef({});
	const {
		register,
		handleSubmit,
		trigger,
		watch,
		formState: { errors, touchedFields },
	} = useForm({ mode: "onTouched" });
	password.current = watch("newPassword", "");

	const onSubmit = async (input) => {
		setIsSaving(true);
		// TODO validate password
		console.log(input); // TODO change password

		setIsSaving(false);
		const error = false;
		if (error) {
			// TODO handle error
			alert("nope");
			return;
		}

		setChangingPassword(false);
		ctx.setBell({
			type: "success",
			message: "Successfully changed password",
		});
	};

	useEffect(() => {
		touchedFields.confirmPassword && trigger("confirmPassword");
	}, [password.current]);

	return (
		<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
			<Input
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
						validate: (value) => value === password.current || "Confirmation does not match new password",
					}),
				}}
				error={errors.confirmPassword}
			/>
			<div className={classes.btnContainer}>
				{!isSaving && <TertiaryButton className={classes.cancel} type="button" onClick={() => setChangingPassword(false)} mainLabel="Cancel" />}
				<PrimaryButton className={classes.submit} isLoading={isSaving} iconLeft={<i className="material-icons-outlined">save</i>} type="submit" loadingLabel="Saving ..." mainLabel="Save" />
			</div>
		</form>
	);
};
