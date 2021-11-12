import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { TertiaryButton } from "../../UI/Buttons";
import Input from "../../UI/Input";
import useHandleResponse from "../../../hooks/useHandleResponse";
import classes from "./NameForm.module.scss";
import GlobalSessionContext from "../../../store/global-session-context";

const NameForm = ({ defaultValue, classId }) => {
	const [isLoading, setIsLoading] = useState(false);
	const { globalSession } = useContext(GlobalSessionContext);
	const { handleResponse } = useHandleResponse();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({ defaultValues: { name: defaultValue }, mode: "onTouched" });

	const onSubmit = async (inputs) => {
		setIsLoading(true);
		const details = {
			groupId: globalSession.groups[globalSession.recentGroups[0]].id,
			classId: classId,
			name: inputs.name,
			date: new Date().toString(),
		};
		let data = {};
		const DUMMY_STATUS = "failed 1";
		try {
			data = (await axios.post("/api/classes/update", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: details, status: DUMMY_STATUS }))["data"];
		} catch (error) {
			data.status = "error";
		} finally {
			handleResponse({
				data,
				failHandler: () => {
					if (data.content === "name taken") {
						setError("name", { type: "manual", message: "This name is already taken in your school" });
					}
					setIsLoading(false);
				},
				successHandler: () => ref.current && setData(data.content.filter((user) => user.role === role)),
			});
		}
	};

	return (
		<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
			<Input
				label="Class name"
				className={classes.inputContainer}
				inputProps={{ className: classes.input, placeholder: "Give your class a name", type: "text", maxLength: 254, ...register("name", { required: "Please enter a name for your class" }) }}
				error={errors.name}
			/>
			<TertiaryButton className={classes.submit} isLoading={isLoading} type="submit" loadingLabel="Updating" mainLabel="Update" />
		</form>
	);
};

export default NameForm;
