import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Input from "../../components/UI/Input";
import { PrimaryButton } from "../../components/UI/Buttons";
import MainLayout from "../../components/Layouts/MainLayout/MainLayout";

import classes from "/styles/myGroups.module.scss";

const NewFamily = () => {
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({ mode: "onTouched" });

	// TODO
	const onSubmit = () => {};

	return (
		<div className={classes.view}>
			<Head>
				<title>Create a family | CreateBase</title>
				<meta name="description" content="Create a new family group on CreateBase" />
			</Head>
			<Link href="/my-groups">
				<button className={classes.backBtn}>
					<i className="material-icons-outlined">chevron_left</i>Back
				</button>
			</Link>
			<div className={`${classes.container} roundScrollbar`}>
				<div className={`${classes.wrapper} ${classes.formWrapper}`}>
					<div className={classes.h2Container}>
						<h2>Create a family</h2>
					</div>
					<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
						<Input
							className={classes.input}
							label="Group name*"
							labelProps={{ className: classes.inputLabel }}
							inputProps={{ placeholder: "Group name", type: "text", maxLength: 254, ...register("name", { required: "Please enter a name for your group" }) }}
							error={errors.name}
						/>
						<div className={classes.caption}>Note: this does NOT need to be your surname, so get creative!</div>
						<PrimaryButton className={classes.submit} isLoading={isLoading} type="submit" loadingLabel="Creating ..." mainLabel="Create" />
					</form>
				</div>
			</div>
		</div>
	);
};

NewFamily.getLayout = (page) => {
	return <MainLayout page="my-groups">{page}</MainLayout>;
};

NewFamily.authorisation = "user";

export default NewFamily;
