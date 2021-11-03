import { useState, useContext } from "react";
import Head from "next/head";
import axios from "axios";
import { useForm } from "react-hook-form";
import useHandleResponse from "../../hooks/useHandleResponse";
import VisualBellContext from "../../store/visual-bell-context";
import GlobalSessionContext from "../../store/global-session-context";
import MainLayout from "../../components/Layouts/MainLayout/MainLayout";
import MyAccountLayout from "../../components/Layouts/MyAccountLayout/MyAccountLayout";
import Input from "../../components/UI/Input";
import UserAvatar from "../../components/UI/UserAvatar";
import { PrimaryButton } from "../../components/UI/Buttons";
import { namePattern, isBlacklisted, emailPattern } from "../../utils/formValidation";

import classes from "../../components/Layouts/MyAccountLayout/MyAccountLayout.module.scss";

const MyProfile = () => {
	const { globalSession, setGlobalSession } = useContext(GlobalSessionContext);
	const { handleResponse } = useHandleResponse();
	const { setVisualBell } = useContext(VisualBellContext);
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		setError,
		formState: { errors, isDirty },
	} = useForm({
		defaultValues: {
			firstName: globalSession.firstName,
			lastName: globalSession.lastName,
			email: globalSession.email,
		},
		mode: "onTouched",
	});

	const onSubmit = async (inputs) => {
		setIsLoading(true);
		let frontendError = false;
		if (isBlacklisted(inputs.firstName)) {
			setError("firstName", {
				type: "manual",
				message: "First name contains disallowed words",
			});
			frontendError = true;
		}
		if (isBlacklisted(inputs.lastName)) {
			setError("lastName", {
				type: "manual",
				message: "Last name contains disallowed words",
			});
			frontendError = true;
		}
		if (frontendError) {
			return setIsLoading(false);
		}
		const DUMMY_STATUS = "succeeded";
		let data = {};
		try {
			data = (await axios.post("/api/profile/update-profile", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: inputs, status: DUMMY_STATUS }))["data"];
		} catch (error) {
			data.status = "error";
		} finally {
			handleResponse({
				data,
				failHandler: () => {
					if (data.content === "email taken") {
						setError("email", {
							type: "manual",
							message: "This email is already registered to another account",
						});
						setIsLoading(false);
					}
				},
				successHandler: () => {
					setGlobalSession((state) => ({ ...state, ...inputs }));
					setVisualBell({
						type: "success",
						message: "Your profile has been updated",
					});
					setIsLoading(false);
					reset(inputs);
				},
			});
		}
	};

	return (
		<div>
			<Head>
				<title>
					Profile • {globalSession.firstName} {globalSession.lastName} | CreateBase
				</title>
				<meta name="description" content="View and update your profile on CreateBase" />
			</Head>
			<div className={classes.myView}>
				<div className={classes.section}>
					<h2>Public Profile</h2>
					<div className={classes.profile}>
						<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
							<Input
								className={classes.input}
								label="Email*"
								inputProps={{
									type: "text",
									maxLength: 254,
									...register("email", {
										required: "Please enter an email",
										pattern: emailPattern,
									}),
								}}
								error={errors.email}
							/>
							<Input
								className={classes.input}
								label="First name*"
								inputProps={{
									type: "text",
									maxLength: 254,
									...register("firstName", {
										required: "Please enter your first name",
										pattern: namePattern,
									}),
								}}
								error={errors.firstName}
							/>
							<Input
								className={classes.input}
								label="Last name*"
								inputProps={{
									type: "text",
									maxLength: 254,
									...register("lastName", {
										required: "Please enter your last name",
										pattern: namePattern,
									}),
								}}
								error={errors.lastName}
							/>

							<PrimaryButton
								className={classes.submit}
								isLoading={isLoading}
								type="submit"
								mainLabel="Update"
								loadingLabel="Saving ..."
								iconLeft={<i className={`material-icons-outlined ${classes.left}`}>done</i>}
							/>
							{isDirty && <div className={classes.unsavedChanges}>You have unsaved changes</div>}
						</form>
						<div className={classes.avatar}>
							<UserAvatar size={160} id={globalSession.profileId} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

MyProfile.getLayout = (page) => {
	return (
		<MainLayout page="my-account">
			<MyAccountLayout name="profile">{page}</MyAccountLayout>
		</MainLayout>
	);
};

MyProfile.auth = "user";

export default MyProfile;
