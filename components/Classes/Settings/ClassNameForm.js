import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import useApi from "../../../hooks/useApi";
import GlobalSessionContext from "../../../store/global-session-context";
import VisualBellContext from "../../../store/visual-bell-context";
import { classNameMaxLength, classNameMinLength, nameMaxLength, nameMinLength } from "../../../utils/formValidation";
import { TertiaryButton } from "../../UI/Buttons";
import Input from "../../UI/Input";
import classes from "./ClassNameForm.module.scss";

const ClassNameForm = ({ defaultValue, classId, setClassObject }) => {
	const [isLoading, setIsLoading] = useState(false);
	const { setVisualBell } = useContext(VisualBellContext);
	const { globalSession } = useContext(GlobalSessionContext);
	const post = useApi();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({ defaultValues: { name: defaultValue }, mode: "onTouched" });

	const onSubmit = async (inputs) => {
		setIsLoading(true);
		await post({
			route: "/api/classes/update",
			input: {
				classId: classId,
				date: new Date().toString(),
				groupId: globalSession.groups[globalSession.recentGroups[0]].id,
				name: inputs.name,
			},
			failHandler: (data) => {
				if (data.content === "name taken") {
					setError("name", { type: "manual", message: "This name is already taken in your school" });
				}
				setIsLoading(false);
			},
			successHandler: () => {
				setClassObject((state) => ({ ...state, name: inputs.name }));
				setVisualBell({ type: "success", message: "Class details updated" });
				setIsLoading(false);
			},
		});
	};

	return (
		<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
			<Input
				label="Class name"
				className={classes.inputContainer}
				inputProps={{
					className: classes.input,
					placeholder: "Give your class a name",
					type: "text",
					maxLength: 254,
					...register("name", {
						required: "Please enter a name for your class",
						minLength: classNameMinLength,
						maxLength: classNameMaxLength,
					}),
				}}
				error={errors.name}
			/>
			<TertiaryButton className={classes.submit} isLoading={isLoading} type="submit" loadingLabel="Updating" mainLabel="Update" />
		</form>
	);
};

export default ClassNameForm;
