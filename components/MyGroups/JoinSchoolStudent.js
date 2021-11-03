import { useContext, useState } from "react";
import router from "next/router";
import axios from "axios";
import { useForm } from "react-hook-form";
import useHandleResponse from "../../hooks/useHandleResponse";
import GlobalSessionContext from "../../store/global-session-context";
import Input from "../../components/UI/Input";
import { PrimaryButton } from "../../components/UI/Buttons";

import classes from "/styles/myGroups.module.scss";

const JoinSchoolStudent = () => {
	const [isLoading, setIsLoading] = useState(false);
	const { globalSession, setGlobalSession } = useContext(GlobalSessionContext);
	const { handleResponse } = useHandleResponse();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({ mode: "onTouched" });

	const onStudentSubmit = async (inputs) => {
		setIsLoading(true);
		const details = { profileId: globalSession.profileId, code: inputs.code };
		const DUMMY_STATUS = "succeeded";
		let data = {};
		try {
			data = (await axios.post("/api/groups/join-school-student", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: details, status: DUMMY_STATUS }))["data"];
		} catch (error) {
			data.status = "error";
		} finally {
			console.log(data);
			handleResponse({
				data,
				failHandler: () => {
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
				successHandler: () => {
					setGlobalSession((state) => ({ ...state, recentGroups: [data.content, ...state.recentGroups.slice(0, 2)] }));
					router.push("/my-groups");
				},
			});
		}
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
