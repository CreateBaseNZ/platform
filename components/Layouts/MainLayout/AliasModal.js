import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import useApi from "../../../hooks/useApi";
import GlobalSessionContext from "../../../store/global-session-context";
import VisualBellContext from "../../../store/visual-bell-context";
import { nameMaxLength, nameMinLength, namePattern, nameValidation } from "../../../utils/formValidation";
import { PrimaryButton } from "../../UI/Buttons";
import Input from "../../UI/Input";
import Modal from "../../UI/Modal";

import classes from "./AliasModal.module.scss";

const AliasModal = ({ setShow }) => {
	const { globalSession, setGlobalSession } = useContext(GlobalSessionContext);
	const [isLoading, setIsLoading] = useState(false);
	const { setVisualBell } = useContext(VisualBellContext);
	const { post } = useApi();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({ defaultValues: { alias: globalSession.groups[globalSession.recentGroups[0]].alias }, mode: "onTouched" });

	const onSubmit = async (inputValues) => {
		setIsLoading(true);
		await post({
			route: "/api/license/update-saves",
			input: { licenseId: globalSession.groups[globalSession.recentGroups[0]].licenseId, update: { alias: inputValues.alias }, date: new Date().toString() },
			failHandler: (data) => {
				if (data.content === "taken") {
					setError("alias", { type: "manual", message: "This alias is already taken in your group" });
				}
				setIsLoading(false);
			},
			successHandler: () => {
				setGlobalSession((state) => ({ ...state, groups: [...state.groups].map((_group, i) => (i === state.recentGroups[0] ? { ..._group, alias: inputValues.alias } : _group)) }));
				setVisualBell("success", "Your alias has been updated");
				setShow(false);
			},
		});
	};

	return (
		<Modal setShow={setShow} title={`Edit alias in ${globalSession.groups[globalSession.recentGroups[0]].name}`}>
			<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
				<Input
					className={classes.inputContainer}
					inputProps={{
						className: classes.input,
						placeholder: "Alias in this group",
						maxLength: 50,
						...register("alias", {
							required: "Please enter an alias",
							pattern: namePattern,
							validate: nameValidation,
							maxLength: nameMaxLength,
							minLength: nameMinLength,
						}),
					}}
					error={errors.alias}
				/>
				<PrimaryButton className={classes.submitBtn} isLoading={isLoading} type="submit" mainLabel="Save" iconLeft={<i className="material-icons-outlined">check</i>} />
			</form>
		</Modal>
	);
};

export default AliasModal;
