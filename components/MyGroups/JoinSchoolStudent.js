import { useContext, useState } from "react";
import router from "next/router";
import { useForm } from "react-hook-form";
import useApi from "../../hooks/useApi";
import GlobalSessionContext from "../../store/global-session-context";
import Input from "../../components/UI/Input";
import { PrimaryButton } from "../../components/UI/Buttons";

import classes from "/styles/myGroups.module.scss";

const JoinSchoolStudent = () => {
	const [isLoading, setIsLoading] = useState(false);
	const { globalSession, setGlobalSession } = useContext(GlobalSessionContext);
	const { post } = useApi();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({ mode: "onTouched" });

	const onStudentSubmit = async (inputs) => {
		setIsLoading(true);
		await post({
			route: "/api/groups/join-school-student",
			input: { profileId: globalSession.profileId, code: inputs.code, date: new Date().toString() },
			failHandler: (data) => {
				if (data.content === "incorrect") {
					setError("code", {
						type: "manual",
						message: "No schools found with this school",
					});
				} else if (data.content === "expired") {
					setError("code", {
						type: "manual",
						message: "This code has expired",
					});
				} else if (data.content === "already joined") {
					setError("code", {
						type: "manual",
						message: "You are already in this school",
					});
				}
				setIsLoading(false);
			},
			successHandler: (data) => {
				setGlobalSession((state) => ({ ...state, groups: [...state.groups, data.content], recentGroups: [state.groups.length, ...state.recentGroups.slice(0, 2)] }));
				router.push("/my-groups");
			},
		});
	};

	return (
		<form className={classes.form} onSubmit={handleSubmit(onStudentSubmit)}>
			<Input
				className={classes.input}
				label="Student code*"
				labelProps={{ className: classes.inputLabel }}
				inputProps={{ placeholder: "Student code", type: "text", maxLength: 254, ...register("code", { required: "Please enter a student code" }) }}
				error={errors.code}
			/>
			<PrimaryButton className={classes.submit} isLoading={isLoading} type="submit" loadingLabel="Joining ..." mainLabel="Join" />
		</form>
	);
};

export default JoinSchoolStudent;
