import { useContext, useState } from "react";
import axios from "axios";
import { useFieldArray, useForm } from "react-hook-form";
import useHandleResponse from "../../hooks/useHandleResponse";
import GlobalSessionContext from "../../store/global-session-context";
import ClientOnlyPortal from "../UI/ClientOnlyPortal";
import Input from "../UI/Input";
import { PrimaryButton, TertiaryButton } from "../UI/Buttons";
import { emailPattern } from "../../utils/formValidation";
import classes from "./AddGroupUserModal.module.scss";
import VisualBellContext from "../../store/visual-bell-context";

const ROLES = ["student", "teacher", "admin"];

const AddGroupUserModal = ({ setShow, role }) => {
	const [isLoading, setIsLoading] = useState(false);
	const { globalSession } = useContext(GlobalSessionContext);
	const { handleResponse } = useHandleResponse();
	const { setVisualBell } = useContext(VisualBellContext);
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		mode: "onTouched",
		defaultValues: {
			invitations: [{ email: "", role: role }],
		},
	});
	const { fields, append, remove } = useFieldArray({ control, name: "invitations" });

	const onSubmit = async (inputs) => {
		console.log(inputs);
		setIsLoading(true);
		if (!inputs.invitations.length) return setIsLoading(false);
		const details = {
			groupId: globalSession.groups[globalSession.recentGroups[0]].id,
			invitations: inputs.invitations,
		};
		let _data;
		const DUMMY_STATUS = "succeeded";
		try {
			_data = (await axios.post("/api/groups/invite-users", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: details, status: DUMMY_STATUS }))["data"];
		} catch (error) {
			_data.status = "error";
		} finally {
			handleResponse({
				data: _data,
				failHandler: () => {},
				successHandler: () => {
					setShow(false);
					setVisualBell({ type: "success", message: "Invitations have been sent out!" });
				},
			});
		}
	};

	const copyHandler = () => {
		navigator.clipboard.writeText(globalSession.groups[globalSession.recentGroups[0]].studentCode);
		setVisualBell({ type: "success", message: "Code copied to clipboard" });
	};

	return (
		<ClientOnlyPortal selector="#modal-root">
			<div className={classes.view}>
				<div className={classes.overlay} onClick={() => setShow(false)} />
				<div className={classes.modal}>
					<h2>Add members to {globalSession.groups[globalSession.recentGroups[0]].name}</h2>
					<i className={`material-icons-outlined ${classes.close}`} onClick={() => setShow(false)}>
						close
					</i>
					<div className={classes.codeContainer}>
						<h3>
							<i className="material-icons-outlined">pin</i> Student code
						</h3>
						<button className={classes.code} title="Click to copy" onClick={copyHandler}>
							{globalSession.groups[globalSession.recentGroups[0]].studentCode}
							<i className="material-icons-outlined">content_copy</i>
						</button>
					</div>
					{/* <TertiaryButton
						type="button"
						className={classes.addBtn}
						mainLabel="Add invitation"
						onClick={() =>
							append({
								email: "",
								role: role,
							})
						}
						iconLeft={<i className="material-icons-outlined">add</i>}
					/>
					<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
						<div className={`${classes.fieldContainer} roundScrollbar`}>
							{fields.map((field, index) => (
								<div key={field.id} className={classes.field}>
									<div className={classes.radioContainer}>
										{ROLES.map((_role) => (
											<div key={_role} className={classes.radio}>
												<input {...register(`invitations.${index}.role`)} type="radio" name={`invitations.${index}.role`} value={_role} id={_role} />
												<label>{_role}</label>
											</div>
										))}
										<i className="material-icons-outlined" title="Discard" onClick={() => remove(index)}>
											close
										</i>
									</div>
									<Input
										className={classes.textInput}
										inputProps={{ placeholder: "Email", ...register(`invitations.${index}.email`, { required: "Please enter an email", pattern: emailPattern }) }}
										error={errors.invitations?.[index]?.email}
									/>
								</div>
							))}
						</div>
						<PrimaryButton
							className={classes.submitBtn}
							isLoading={isLoading}
							type="submit"
							mainLabel="Send invitations"
							iconRight={<i className="material-icons-outlined">send</i>}
							loadingLabel="Sending invitations"
						/>
					</form> */}
				</div>
			</div>
		</ClientOnlyPortal>
	);
};

export default AddGroupUserModal;
