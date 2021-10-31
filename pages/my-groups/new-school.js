import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Input from "../../components/UI/Input";
import { PrimaryButton } from "../../components/UI/Buttons";
import MainLayout from "../../components/Layouts/MainLayout/MainLayout";

import classes from "/styles/myGroups.module.scss";

const NewSchool = () => {
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({ mode: "onTouched" });

	//TODO
	const onSubmit = () => {};

	return (
		<div className={classes.view}>
			<Head>
				<title>Register a School | CreateBase</title>
				<meta name="description" content="Register your school as a group on CreateBase" />
			</Head>
			<Link href="/my-groups">
				<button className={classes.backBtn}>
					<i className="material-icons-outlined">chevron_left</i>Back
				</button>
			</Link>
			<div className={`${classes.container} roundScrollbar`}>
				<div className={`${classes.wrapper} ${classes.formWrapper}`}>
					<div className={classes.h2Container}>
						<h2>Register a school</h2>
					</div>
					<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
						<Input
							className={classes.input}
							label="School name*"
							labelProps={{ className: classes.inputLabel }}
							inputProps={{ placeholder: "School name", type: "text", maxLength: 254, ...register("name", { required: "Please enter your school's name" }) }}
							error={errors.name}
						/>
						<Input
							className={classes.input}
							label="Address"
							labelProps={{ className: classes.inputLabel }}
							inputProps={{ placeholder: "Address", type: "text", maxLength: 254, ...register("address", { required: "Please enter your school's address" }) }}
							error={errors.address}
						/>
						<Input
							className={classes.input}
							label="City/State"
							labelProps={{ className: classes.inputLabel }}
							inputProps={{ placeholder: "City/State", type: "text", maxLength: 254, ...register("cityState", { required: "Please enter your school's city/state" }) }}
							error={errors.cityState}
						/>
						<Input
							className={classes.input}
							label="Country"
							labelProps={{ className: classes.inputLabel }}
							inputProps={{ placeholder: "Country", type: "text", maxLength: 254, ...register("country", { required: "Please enter your school's country" }) }}
							error={errors.country}
						/>
						<div className={classes.caption}>The email registered with your account will be the primary point of contact. Please allow up to 24 hours for us to be verify your registration.</div>
						<PrimaryButton className={classes.submit} isLoading={isLoading} type="submit" loadingLabel="Registering ..." mainLabel="Register" />
					</form>
				</div>
			</div>
		</div>
	);
};

NewSchool.getLayout = (page) => {
	return <MainLayout page="my-groups">{page}</MainLayout>;
};

NewSchool.auth = "user";

export default NewSchool;
