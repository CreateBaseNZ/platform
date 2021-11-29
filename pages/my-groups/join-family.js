// BACKLOG - this page

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { SearchBar, TextArea } from "../../components/UI/Input";
import { PrimaryButton } from "../../components/UI/Buttons";
import MainLayout from "../../components/Layouts/MainLayout/MainLayout";

import classes from "/styles/myGroups.module.scss";

const JoinFamily = () => {
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
				<title>Join a Family | CreateBase</title>
				<meta name="description" content="Join your family group on CreateBase" />
			</Head>
			<Link href="/my-groups">
				<button className={classes.backBtn}>
					<i className="material-icons-outlined">chevron_left</i>Back
				</button>
			</Link>
			<div className={`${classes.container} roundScrollbar`}>
				<div className={`${classes.wrapper} ${classes.formWrapper}`}>
					<div className={classes.h2Container}>
						<h2>Join a family</h2>
					</div>
					<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
						<SearchBar
							className={classes.input}
							label="Group name*"
							labelProps={{ className: classes.inputLabel }}
							inputProps={{ placeholder: "Search for your family", type: "text", maxLength: 254, ...register("name", { required: "Please select a family" }) }}
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

JoinFamily.getLayout = (page) => {
	return <MainLayout page="my-groups">{page}</MainLayout>;
};

JoinFamily.auth = "user";

export default JoinFamily;
