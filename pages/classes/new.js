import { useContext, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import { useForm } from "react-hook-form";
import MainLayout from "../../components/Layouts/MainLayout/MainLayout";
import Input from "../../components/UI/Input";
import { PrimaryButton } from "../../components/UI/Buttons";

import classes from "/styles/classes.module.scss";
import useHandleResponse from "../../hooks/useHandleResponse";
import VisualBellContext from "../../store/visual-bell-context";
import router from "next/router";

const ClassesNew = () => {
	const { handleResponse } = useHandleResponse();
	const { setVisualBell } = useContext(VisualBellContext);
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({ mode: "onTouched" });

	const onSubmit = async (input) => {
		const DUMMY_STATUS = "succeeded";
		let data;
		// FEEDBACK (CARL): When creating a class we will also need these additional inputs:
		// groupId		-	so we know which group the class is being created on.
		// licenseId	-	so we know which user within the organisation is creating the group.
		//							This user will be the first teacher of the class.
		// date				-	for date and time stamping.
		// subject		-	on the Figma mockup, I saw a field for a subject, do we still want this
		//							property? It's okay if we no longer want this property.
		// alias			- this is the name of the teacher, you have on your example Mrs Applecrumb.
		//							How do we determine the title name (e.g., Mr, Miss, Mrs, etc.)?
		//							But yeah, just so I don't need to fetch the user's profile details, just
		//							send through their name as alias, and that's what's going to be returned.
		const details = { name: input.name };
		try {
			data = (await axios.post("/api/classes/new", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: details, status: DUMMY_STATUS }))["data"];
		} catch (error) {
			data.status = "error";
		} finally {
			handleResponse({
				data,
				failHandler: () => {
					if (data.content === "taken") {
						setError(
							"name",
							{
								type: "manual",
								message: "There is already another class with this name in your school",
							},
							{ shouldFocus: true }
						);
						setIsLoading(false);
					}
				},
				successHandler: () => {
					setVisualBell({ type: "success", message: `Welcome to ${data.content.name}!` });
					router.push(`/classes/${data.content.id}`);
				},
			});
		}
	};

	return (
		<div className={classes.view}>
			<Head>
				<title>New Class | CreateBase</title>
				<meta name="description" content="Create a new class on CreateBase" />
			</Head>
			<Link href="/classes">
				<button className={classes.backBtn} title="Back to classes">
					<i className="material-icons-outlined">chevron_left</i>Back
				</button>
			</Link>
			<div className={`${classes.container} roundScrollbar`}>
				<div className={`${classes.wrapper} ${classes.formWrapper}`}>
					<div className={classes.h2Container}>
						<h2>New class</h2>
					</div>
					<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
						<Input
							className={classes.input}
							label="Class name*"
							labelProps={{ className: classes.inputLabel }}
							inputProps={{ placeholder: "Class name", type: "text", maxLength: 254, ...register("name", { required: "Please enter a name for your class" }) }}
							error={errors.name}
						/>
						<PrimaryButton className={classes.submit} isLoading={isLoading} type="submit" loadingLabel="Creating ..." mainLabel="Create" />
					</form>
				</div>
			</div>
		</div>
	);
};

ClassesNew.getLayout = function getLayout(page) {
	return <MainLayout page="classes">{page}</MainLayout>;
};

ClassesNew.auth = "staff";

export default ClassesNew;
