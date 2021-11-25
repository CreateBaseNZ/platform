// TODO - ADD IN LATER

import { useState } from "react";
import { useForm } from "react-hook-form";
import { PrimaryButton, SecondaryButton } from "../UI/Buttons";
import ClientOnlyPortal from "../UI/ClientOnlyPortal";
import Input, { PasswordInput } from "../UI/Input";
import classes from "./DeleteAccModal.module.scss";

const DeleteAccModal = ({ setDeletingAcc }) => {
	const [loadingPasswordCheck, setLoadingPasswordCheck] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: "onTouched",
	});

	const onSubmit = async (input) => {
		setLoadingPasswordCheck(true);
		// TODO [IGNORE] query if password is correct
		const incorrect = false;
		if (incorrect) {
			return setLoadingPasswordCheck(false);
		}
		// TODO [IGNORE] handle logout
		setLoadingPasswordCheck(false);
	};

	return (
		<ClientOnlyPortal selector="#modal-root">
			<div className={classes.overlay}>
				<div className={classes.modal}>
					<i className={`material-icons-outlined ${classes.close}`} onClick={() => setDeletingAcc(false)}>
						close
					</i>
					<i className="material-icons-outlined">warning</i>
					<div className={classes.h1}>Hold on a second!</div>
					<ul className={classes.ul}>
						Once you delete your account, there's no going back. You will lose:
						<li>Access to your organisation</li>
						<li>Access to all subscribed contents</li>
						<li>All project and exploration progress</li>
					</ul>
					<div className={classes.confirm}>If you're sure, confirm by typing your password below</div>
					<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
						<PasswordInput
							className={classes.inputContainer}
							inputProps={{
								className: classes.input,
								placeholder: "Password*",
								...register("password", {
									required: "Please enter your password",
								}),
							}}
							error={errors.password}
						/>
						<div className={classes.btnContainer}>
							{!loadingPasswordCheck && <SecondaryButton className={classes.cancelBtn} type="button" onClick={() => setDeletingAcc(false)} mainLabel="Cancel" />}
							<PrimaryButton className={classes.deleteBtn} isLoading={loadingPasswordCheck} type="submit" mainLabel="Delete account" iconLeft={<i className="material-icons-outlined">delete</i>} />
						</div>
					</form>
				</div>
			</div>
		</ClientOnlyPortal>
	);
};

export default DeleteAccModal;
