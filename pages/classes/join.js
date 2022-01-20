import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import router from "next/router";
import { useForm } from "react-hook-form";
import useApi from "../../hooks/useApi";
import GlobalSessionContext from "../../store/global-session-context";
import { useSetVisualBell } from "../../store/visual-bell-context";
import MainLayout from "../../components/Layouts/MainLayout/MainLayout";
import { SearchBar } from "../../components/UI/Input";
import { PrimaryButton } from "../../components/UI/Buttons";

import classes from "../../styles/classes.module.scss";

const ClassJoin = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [queriedClasses, setQueriedClasses] = useState([]);
	const { globalSession } = useContext(GlobalSessionContext);
	const { post } = useApi();
	const setVisualBell = useSetVisualBell();
	const { register, handleSubmit, watch } = useForm({ mode: "onTouched" });
	const queryValue = watch("searchQuery");

	useEffect(async () => {
		await post(
			"/api/classes/fetch-all",
			{
				licenseId: globalSession.groups[globalSession.recentGroups[0]].licenseId,
				schoolId: globalSession.groups[globalSession.recentGroups[0]].id,
			},
			(data) => setQueriedClasses(data.content.filter((_class) => _class.status !== "joined" && _class.status !== "requested"))
		);
	}, []);

	const onSubmit = async (inputValues) => {
		setIsLoading(true);
		if (!inputValues.classId) {
			return setIsLoading(false);
		}
		await post(
			"/api/classes/join",
			{
				classId: inputValues.classId,
				licenseId: globalSession.groups[globalSession.recentGroups[0]].licenseId,
				role: globalSession.groups[globalSession.recentGroups[0]].role,
				date: new Date().toString(),
			},
			() => {
				setVisualBell("success", "Request sent");
				router.push("/classes");
			}
		);
	};

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
							inputProps={{ placeholder: "Class name", type: "text", maxLength: 254, ...register("searchQuery") }}
						/>
						<div className={`${classes.queryContainer} roundScrollbar`}>
							{queriedClasses.map(
								(_class) =>
									_class.name.toLowerCase().includes((queryValue || "").toLowerCase()) && (
										<div className={`${classes.queryItem} ${_class.joined ? classes.disabled : ""}`} key={_class.id}>
											<input {...register("classId", { required: true })} type="radio" name="classId" id={_class.id} value={_class.id} />
											<label>
												{_class.name} <i className={`material-icons-outlined ${classes.addIcon}`}>circle</i>
												<i className={`material-icons ${classes.checkIcon}`}>check_circle</i>
												<span>Already in this class</span>
											</label>
										</div>
									)
							)}
						</div>
						<PrimaryButton className={classes.submit} isLoading={isLoading} type="submit" loadingLabel="Sending requests ..." mainLabel="Request to join" />
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
