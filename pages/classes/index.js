import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import ClassesContext from "../../store/classes-context";
import { PrimaryButton } from "../../components/UI/Buttons";
import MainLayout from "../../components/Layouts/MainLayout/MainLayout";

import classes from "/styles/classes.module.scss";
import GlobalSessionContext from "../../store/global-session-context";
import useHandleResponse from "../../hooks/useHandleResponse";

// TODO fetch all classes (i.e. also those pending approval)

const ClassesTabRoot = () => {
	const router = useRouter();
	const { handleResponse } = useHandleResponse();
	const { globalSession } = useContext(GlobalSessionContext);
	const { classObjects, setClassObjects } = useContext(ClassesContext);

	useEffect(async () => {
		let data;
		const inputs = {
			licenseId: globalSession.groups[globalSession.recentGroups[0]].licenseId,
			schoolId: globalSession.groups[globalSession.recentGroups[0]].id,
		};
		try {
			data = (await axios.post("/api/classes/fetch-joined", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: inputs }))["data"];
		} catch (error) {
			data.status = "error";
		} finally {
			console.log(data);
			handleResponse({
				data,
				failHandler: () => {},
				successHandler: () => {
					setClassObjects(data.content);
				},
			});
		}
		// TODO refetch when alias changes (to be upgraded to websocket)
	}, [globalSession.groups[globalSession.recentGroups[0]].alias]);

	const cardClickHandler = (_class) => {
		router.push({ pathname: "/classes/[id]/announcements", query: { id: _class.id } });
	};

	return (
		<div className={classes.view}>
			<Head>
				<title>Classes | CreateBase</title>
				<meta name="description" content="View your classes on CreateBase" />
			</Head>
			<div className={`${classes.container} roundScrollbar`}>
				<div className={classes.wrapper}>
					<div className={classes.h2Container}>
						<h2>My Classes</h2>
						<PrimaryButton className={classes.joinBtn} mainLabel="Join a class" onClick={() => router.push("/classes/join")} />
					</div>
					<div className={classes.cardContainer}>
						{classObjects && globalSession.groups[globalSession.recentGroups[0]].role !== "student" && (
							<div className={`${classes.card} ${classes.addCard}`} onClick={() => router.push("/classes/new")}>
								<div className={classes.addIcons}>
									<i className="material-icons-outlined">add</i>
									<i className="material-icons-outlined">chair_alt</i>
								</div>
								<div className={classes.className}>Create a class</div>
							</div>
						)}
						{classObjects &&
							classObjects.map((_class) => (
								<div key={_class.name} className={classes.card} onClick={() => cardClickHandler(_class)}>
									<div className={classes.className}>{_class.name}</div>
									<div className={classes.classTeachers}>{_class.teachers.join(", ")}</div>
									<div className={classes.classStudents}>
										{_class.numOfStudents} student{_class.numOfStudents === 1 ? "" : "s"}
									</div>
								</div>
							))}
						{!classObjects && (
							<>
								<div className={`${classes.card} ${classes.loadingCard}`} />
								<div className={`${classes.card} ${classes.loadingCard}`} />
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

ClassesTabRoot.getLayout = (page) => {
	return <MainLayout page="classes">{page}</MainLayout>;
};

ClassesTabRoot.auth = "user";

export default ClassesTabRoot;
