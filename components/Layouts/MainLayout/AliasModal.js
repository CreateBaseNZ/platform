import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import GlobalSessionContext from "../../../store/global-session-context";
import { PrimaryButton } from "../../UI/Buttons";
import ClientOnlyPortal from "../../UI/ClientOnlyPortal";
import Input from "../../UI/Input";

import classes from "./AliasModal.module.scss";

const AliasModal = ({ setShow }) => {
	const { globalSession } = useContext(GlobalSessionContext);
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues: { alias: globalSession.groups[globalSession.recentGroups[0]].alias }, mode: "onTouched" });

	const onSubmit = (inputs) => {
		console.log(inputs);
	};

	return (
		<ClientOnlyPortal selector="#modal-root">
			<div className={classes.view}>
				<div className={classes.overlay} onClick={() => setShow(false)} />
				<div className={classes.modal}>
					<h2>{globalSession.groups[globalSession.recentGroups[0]].name} alias</h2>
					<i className={`material-icons-outlined ${classes.close}`} onClick={() => setShow(false)}>
						close
					</i>
					<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
						<Input
							className={classes.inputContainer}
							inputProps={{ className: classes.input, placeholder: "Alias in this group", ...register("alias", { required: "Please enter an alias" }) }}
							error={errors.alias}
						/>
						<PrimaryButton className={classes.submitBtn} isLoading={isLoading} type="submit" mainLabel="Save" iconLeft={<i className="material-icons-outlined">check</i>} />
					</form>
				</div>
			</div>
		</ClientOnlyPortal>
	);
};

export default AliasModal;
