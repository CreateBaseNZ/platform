import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Input, { TextArea } from "../../components/UI/Input";
import { PrimaryButton } from "../../components/UI/Buttons";
import MainLayout from "../../components/Layouts/MainLayout/MainLayout";

import classes from "/styles/myGroups.module.scss";

const JoinSchool = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [joinRole, setJoinRole] = useState("");
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({ mode: "onTouched" });

	//TODO
	const onStudentSubmit = () => {};
	const onTeacherSubmit = () => {};

	return (
		<div className={classes.view}>
			<Head>
				<title>Join a school | CreateBase</title>
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
					<form className={classes.form} onSubmit={handleSubmit(onStudentSubmit)}>
						<Input
							className={classes.input}
							label="Student code*"
							labelProps={{ className: classes.inputLabel }}
							inputProps={{ placeholder: "Student code", type: "text", maxLength: 254, ...register("code", { required: "Please enter the student code" }) }}
							error={errors.name}
						/>
						<PrimaryButton className={classes.submit} isLoading={isLoading} type="submit" loadingLabel="Joining ..." mainLabel="Join" />
					</form>
					<div className={classes.divider} />
					<div className={classes.h2Container}>
						<h2>Join a school as a teacher</h2>
					</div>
					<form className={classes.form} onSubmit={handleSubmit(onTeacherSubmit)}>
						<Input
							className={classes.input}
							label="School name*"
							labelProps={{ className: classes.inputLabel }}
							inputProps={{ placeholder: "School name", type: "text", maxLength: 254, ...register("name", { required: "Please select a school" }) }}
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

JoinSchool.authorisation = "user";

export default JoinSchool;
