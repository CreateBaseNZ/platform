import { useContext, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useForm } from "react-hook-form";
import MainLayout from "../../components/Layouts/MainLayout/MainLayout";
import Input, { SearchBar } from "../../components/UI/Input";
import { PrimaryButton } from "../../components/UI/Buttons";

import classes from "/styles/classes.module.scss";
import GlobalSessionContext from "../../store/global-session-context";

const ClassJoin = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [queriedClasses, setQueriedClasses] = useState([{ name: "hello" }, { name: "hello 2" }]);
	const { globalSession } = useContext(GlobalSessionContext);
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
				<title>Join a Class | CreateBase</title>
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
						<h2>Join a class</h2>
					</div>
					<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
						<SearchBar
							className={classes.input}
							label={`Search for a class in ${globalSession.groups[globalSession.recentGroups[0]].name}`}
							labelProps={{ className: classes.inputLabel }}
							inputProps={{ placeholder: "Class name", type: "text", maxLength: 254, ...register("name", { required: "Please select a class" }) }}
							error={errors.name}
						/>
						<div className={`${classes.queryContainer} roundScrollbar`}>
							{queriedClasses.map((_class) => (
								<input key={_class.name} type="checkbox" id={_class.name} name={_class.name}>
									<label className={classes.queryItem}>
										{_class.name} <i className="material-icons-outlined">add_circle_outline</i>
									</label>
								</input>
							))}
						</div>
						<PrimaryButton className={classes.submit} isLoading={isLoading} type="submit" loadingLabel="Joining ..." mainLabel="Join" />
					</form>
				</div>
			</div>
		</div>
	);
};

ClassJoin.getLayout = function getLayout(page) {
	return <MainLayout page="classes">{page}</MainLayout>;
};

ClassJoin.auth = "user";

export default ClassJoin;
