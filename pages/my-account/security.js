import { useState, useContext, useRef, useEffect } from "react";
import Head from "next/head";
import { useForm } from "react-hook-form";
import useApi from "../../hooks/useApi";
import GlobalSessionContext from "../../store/global-session-context";
import VisualBellContext from "../../store/visual-bell-context";
import MainLayout from "../../components/Layouts/MainLayout/MainLayout";
import MyAccountLayout from "../../components/Layouts/MyAccountLayout/MyAccountLayout";
import { PasswordInput } from "../../components/UI/Input";
import { PrimaryButton } from "../../components/UI/Buttons";
import { passwordMinLength, passwordValidate } from "../../utils/formValidation";

import classes from "../../styles/myAccount.module.scss";

const MySecurity = () => {
	const { post } = useApi();
	const { globalSession } = useContext(GlobalSessionContext);
	const { setVisualBell } = useContext(VisualBellContext);
	const [isLoading, setIsLoading] = useState(false);
	const password = useRef({});
	const {
		register,
		handleSubmit,
		trigger,
		watch,
		setError,
		reset,
		formState: { errors, touchedFields },
	} = useForm({ mode: "onTouched" });
	password.current = watch("newPassword", "");

	const onSubmit = async (inputValues) => {
		setIsLoading(true);
		await post({
			route: "/api/auth/update-password",
			input: {
				date: new Date().toString(),
				email: globalSession.email,
				password: inputValues.newPassword,
				oldPassword: inputValues.currentPassword,
			},
			failHandler: (data) => {
				if (data.content === "incorrect") {
					setError(
						"currentPassword",
						{
							type: "manual",
							message: "Password incorrect",
						},
						{ shouldFocus: true }
					);
					setIsLoading(false);
				}
				if (data.content === "no account") {
					setError(
						"currentPassword",
						{
							type: "manual",
							message: "You have no 'local' account",
						},
						{ shouldFocus: true }
					);
					setIsLoading(false);
				}
			},
			successHandler: () => {
				setVisualBell("success", "Your password has been updated");
				reset();
				setIsLoading(false);
			},
		});
	};

	useEffect(() => {
		touchedFields.confirmPassword && trigger("confirmPassword");
	}, [password.current]);

	return (
		<div className={classes.myView}>
			<Head>
				<title>
					Security • {globalSession.firstName} {globalSession.lastName} | CreateBase
				</title>
				<meta name="description" content="Edit your account security on CreateBase" />
			</Head>
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

MySecurity.getLayout = (page) => {
	return (
		<MainLayout page="my-account">
			<MyAccountLayout name="security">{page}</MyAccountLayout>
		</MainLayout>
	);
};

MySecurity.auth = "user";

export default MySecurity;
