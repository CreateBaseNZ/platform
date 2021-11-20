import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import GlobalSessionContext from "../../../store/global-session-context";
import { PrimaryButton } from "../../UI/Buttons";
import ClientOnlyPortal from "../../UI/ClientOnlyPortal";
import Input from "../../UI/Input";

import classes from "./AliasModal.module.scss";
import VisualBellContext from "../../../store/visual-bell-context";
import useHandleResponse from "../../../hooks/useHandleResponse";

const AliasModal = ({ setShow }) => {
	const { globalSession, setGlobalSession } = useContext(GlobalSessionContext);
	const [isLoading, setIsLoading] = useState(false);
	const { handleResponse } = useHandleResponse();
	const { setVisualBell } = useContext(VisualBellContext);
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({ defaultValues: { alias: globalSession.groups[globalSession.recentGroups[0]].alias }, mode: "onTouched" });

	const onSubmit = async (inputs) => {
		setIsLoading(true);
		let data = {};
		const DUMMY_STATUS = "failed 1";
		const details = { licenseId: globalSession.groups[globalSession.recentGroups[0]].licenseId, update: { alias: inputs.alias }, date: new Date().toString() };
		try {
			data = (await axios.post("/api/license/update-saves", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: details, status: DUMMY_STATUS }))["data"];
		} catch (error) {
			data.status = "error";
		} finally {
			handleResponse({
				data,
				failHandler: () => {
					if (data.content === "taken") {
						setError("alias", { type: "manual", message: "This alias is already taken in your group" });
					}
					setIsLoading(false);
				},
				successHandler: () => {
					setGlobalSession((state) => ({ ...state, groups: [...state.groups].map((_group, i) => (i === state.recentGroups[0] ? { ..._group, alias: inputs.alias } : _group)) }));
					setVisualBell({ type: "success", message: "Your alias has been updated" });
					setShow(false);
				},
			});
		}
	};

	return (
		<ClientOnlyPortal selector="#modal-root">
			<div className={classes.view}>
				<div className={classes.overlay} onClick={() => setShow(false)} />
				<div className={classes.modal}>
					<h2>Edit alias in {globalSession.groups[globalSession.recentGroups[0]].name}</h2>
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
