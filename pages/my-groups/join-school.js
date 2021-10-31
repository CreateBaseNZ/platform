import { useContext, useState } from "react";
import Head from "next/head";
import axios from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Input, { SearchBar, TextArea } from "../../components/UI/Input";
import { PrimaryButton } from "../../components/UI/Buttons";
import MainLayout from "../../components/Layouts/MainLayout/MainLayout";

import classes from "/styles/myGroups.module.scss";
import useHandleResponse from "../../hooks/useHandleResponse";
import GlobalSessionContext from "../../store/global-session-context";
import router from "next/router";

const StudentForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const { setGlobalSession } = useContext(GlobalSessionContext);
	const { handleResponse } = useHandleResponse();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({ mode: "onTouched" });

	const onStudentSubmit = async (inputs) => {
		setIsLoading(true);
		const details = { code: inputs.code };
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
					setGlobalSession((state) => ({ ...state, isViewingGroup: true, recentGroups: [data.content, ...state.recentGroups.slice(0, 2)] }));
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

const JoinSchool = () => {
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({ mode: "onTouched" });

	//TODO

	const onTeacherSubmit = () => {};

	return (
		<div className={classes.view}>
			<Head>
				<title>Join a School | CreateBase</title>
				<meta name="description" content="Join your school group on CreateBase" />
			</Head>
			<Link href="/my-groups">
				<button className={classes.backBtn}>
					<i className="material-icons-outlined">chevron_left</i>Back
				</button>
			</Link>
			<div className={`${classes.container} roundScrollbar`}>
				<div className={`${classes.wrapper} ${classes.formWrapper}`}>
					<div className={classes.h2Container}>
						<h2>Join a school as a student</h2>
					</div>
					<StudentForm />
					<div className={classes.divider} />
					<div className={classes.h2Container}>
						<h2>Join a school as a teacher</h2>
					</div>
					<form className={classes.form} onSubmit={handleSubmit(onTeacherSubmit)}>
						<SearchBar
							className={classes.input}
							label="School name*"
							labelProps={{ className: classes.inputLabel }}
							inputProps={{ placeholder: "Search for your school", type: "text", maxLength: 254, ...register("name", { required: "Please select a school" }) }}
							error={errors.name}
						/>
						<TextArea
							className={classes.input}
							label="Message"
							labelProps={{ className: classes.inputLabel }}
							inputProps={{ placeholder: "Send a message with your join request", type: "text", maxLength: 500, ...register("message") }}
							error={errors.message}
						/>
						<PrimaryButton className={classes.submit} isLoading={isLoading} type="submit" loadingLabel="Sending request ..." mainLabel="Request to join" />
					</form>
				</div>
			</div>
		</div>
	);
};

JoinSchool.getLayout = (page) => {
	return <MainLayout page="my-groups">{page}</MainLayout>;
};

JoinSchool.auth = "user";

export default JoinSchool;
