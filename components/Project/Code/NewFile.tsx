import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import GlobalSessionContext from "../../../store/global-session-context";
import { newFile } from "../../../store/reducers/codeStepReducer";

import classes from "./NewFile.module.scss";

interface Props {
	projectId: string;
	subsystem: string;
	submitCallback?: () => any;
}

const NewFile = ({ projectId, subsystem, submitCallback = () => {} }: Props) => {
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
	const dispatch = useDispatch();
	const { globalSession } = useContext(GlobalSessionContext);

	const onSubmit = (values: any) => {
		if (Object.keys(errors).length > 0) return;
		dispatch(newFile(globalSession.profileId, projectId, subsystem, uuidv4(), values.name, values.lang, () => submitCallback()));
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
			<div className={classes.heading}>Create a new file</div>

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
	);
};

export default NewFile;
