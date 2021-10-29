import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useForm } from "react-hook-form";
import MainLayout from "../../components/Layouts/MainLayout/MainLayout";
import Input from "../../components/UI/Input";
import { PrimaryButton } from "../../components/UI/Buttons";

import classes from "/styles/classes.module.scss";

const ClassesNew = () => {
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({ mode: "onTouched" });

	const onSubmit = () => {};

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

export default ClassesNew;
