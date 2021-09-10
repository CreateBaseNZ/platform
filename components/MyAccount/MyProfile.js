import { useForm } from "react-hook-form";
import { useState, useEffect, useContext } from "react";
import VisualBellContext from "../../store/visual-bell-context";
import Input from "../UI/Input";
import { PrimaryButton, SecondaryButton } from "../UI/Buttons";
import { displayNameMinLength, displayNamePattern, isBlacklisted } from "../../utils/formValidation";

import classes from "./MyAccount.module.scss";
import useProfileHelper from "../../hooks/useProfileHelper";
import getRandomName from "../../utils/randomNames";
import UserAvatar from "../UI/UserAvatar";

const MyProfile = ({ user, setUser }) => {
	const ctx = useContext(VisualBellContext);
	const { updateProfile } = useProfileHelper({ ...ctx });
	const [isLoading, setIsLoading] = useState(false);
	const [learnerName, setLearnerName] = useState(user.displayName);
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
		<div className={classes.myView}>
			<div className={classes.section}>
				<h2>Profile</h2>
				<div className={classes.profile}>
					<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
						{user.type === "learner" ? (
							<div className={classes.learnerNameContainer}>
								<input {...register("displayName")} style={{ visibility: "hidden", height: 0 }} />
								<div className={classes.instruction}>Display name</div>
								<div className={classes.learnerName}>{learnerName}</div>
								<SecondaryButton type="button" className={classes.changeNameBtn} mainLabel="Randomise!" onClick={newNameHandler} />
							</div>
						) : (
							<Input
								className={classes.input}
								label="Display name*"
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
						<UserAvatar size={160} type={user.type} name={user.username} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default MyProfile;
