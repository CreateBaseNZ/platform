import { useState, useContext, useRef, useEffect } from "react";
import VisualBellContext from "../../store/visual-bell-context";
import useLicenseHelper from "../../hooks/useLicenseHelper";
import { PasswordInput } from "../UI/Input";
import { useForm } from "react-hook-form";
import { passwordMinLength, passwordValidate } from "../../utils/formValidation";
import { PrimaryButton } from "../UI/Buttons";
import classes from "./MyAccount.module.scss";

export const MySecurity = () => {
	const ctx = useContext(VisualBellContext);
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
		<div className={classes.myView}>
			<div className={classes.section}>
				<h2>Change password</h2>
				<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
					<PasswordInput
						className={classes.input}
						label="Current password*"
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
						label="New password*"
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
						label="Confirm password*"
						inputProps={{
							...register("confirmPassword", {
								required: "Please confirm your new password",
								validate: (value) => value === password.current || "Passwords do not match",
							}),
						}}
						error={errors.confirmPassword}
					/>
					<PrimaryButton
						className={classes.submit}
						isLoading={isLoading}
						type="submit"
						mainLabel="Save"
						loadingLabel="Saving ..."
						iconLeft={<i className={`material-icons-outlined ${classes.left}`}>save</i>}
					/>
				</form>
			</div>
		</div>
	);
};

export default MySecurity;
