import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { Dispatch, SetStateAction, useContext } from "react";
import { useForm } from "react-hook-form";
import CodeContext from "../../../store/code-context";
import { TCodeFile } from "../../../types/code";
import ClientOnlyPortal from "../../UI/ClientOnlyPortal";

import classes from "./NewFileModal.module.scss";
import useApi from "../../../hooks/useApi";
import GlobalSessionContext from "../../../store/global-session-context";

interface Props {
	projectId: string;
	subsystem: string;
	setIsCreatingNewFile: Dispatch<SetStateAction<boolean>>;
}

const NewFileModal = ({ projectId, subsystem, setIsCreatingNewFile }: Props): JSX.Element => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: {
			lang: "flow", // TODO default to first value in list of available langs
			name: "",
		},
		shouldFocusError: true,
	});
	const selectedLang = watch("lang");
	const { setFiles, setActiveFileId } = useContext(CodeContext);
	const { post } = useApi();
	const { globalSession } = useContext(GlobalSessionContext);

	const onSubmit = (values: any) => {
		if (Object.keys(errors).length > 0) return;

		const newFile: TCodeFile = { id: uuidv4(), name: values.name, code: "", created: new Date(), lastModified: new Date(), lang: values.lang };

		let newState: TCodeFile[] = [];
		setFiles((state) => {
			newState = [...state, newFile];
			return newState;
		});

		post("/api/profile/update-saves", { profileId: globalSession.profileId, update: { [`${projectId}__${subsystem}`]: newState }, date: new Date().toString() }, () => {
			setActiveFileId(newFile.id);
			setIsCreatingNewFile(false);
		});
	};

	return (
		<ClientOnlyPortal selector="#modal-root">
			<div className={classes.view}>
				<form onSubmit={handleSubmit(onSubmit)} className={classes.modal}>
					<div className={classes.heading}>Create a new file</div>
					<i className={`material-icons-outlined ${classes.close}`} onClick={() => setIsCreatingNewFile(false)} title="Close">
						close
					</i>
					<div className={classes.radioBtnContainer}>
						<div className={`${classes.radioBtnWrapper} ${selectedLang && (selectedLang === "flow" ? classes.selected : classes.deselected)}`}>
							<div className={classes.logo}>
								<Image height={64} width={64} src={`https://raw.githubusercontent.com/CreateBaseNZ/public/dev/project-pages/flow.svg`} alt="flow" />
							</div>
							<label htmlFor="flow">Flow</label>
							<input {...register("lang")} type="radio" name="lang" value="flow" id="flow" />
						</div>
						<div className={`${classes.radioBtnWrapper} ${selectedLang && (selectedLang === "blockly" ? classes.selected : classes.deselected)}`}>
							<div className={classes.logo}>
								<Image height={64} width={64} src={`https://raw.githubusercontent.com/CreateBaseNZ/public/dev/project-pages/blockly.svg`} alt="blockly" />
							</div>
							<label htmlFor="blockly">Blockly</label>
							<input {...register("lang")} type="radio" name="lang" value="blockly" id="blockly" />
						</div>
						<div className={`${classes.radioBtnWrapper} ${selectedLang && (selectedLang === "js" ? classes.selected : classes.deselected)}`}>
							<div className={classes.logo}>
								<Image height={64} width={64} src={`https://raw.githubusercontent.com/CreateBaseNZ/public/dev/project-pages/js.svg`} alt="js" />
							</div>
							<label htmlFor="js">Javascript</label>
							<input {...register("lang")} type="radio" name="lang" value="js" id="js" />
						</div>
					</div>
					<div className={`${classes.nameContainer} ${errors.name?.type === "required" && classes.nameError}`}>
						<label>Name</label>
						<div className={classes.nameWrapper}>
							<input {...register("name", { required: true, maxLength: 100 })} />
							<button type="submit" className={classes.submit}>
								<i className="material-icons-outlined">arrow_forward</i>
							</button>
						</div>
						<div className={classes.nameErrorMessage}>
							{errors.name?.type === "required" && "File name required"} {errors.name?.type === "maxLength" && "File name cannot exceed 100 characters"}
						</div>
					</div>
				</form>
			</div>
		</ClientOnlyPortal>
	);
};

export default NewFileModal;
