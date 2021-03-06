import { ReactElement, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import useApi from "../../hooks/useApi";
import GlobalSessionContext from "../../store/global-session-context";
import { PrimaryButton } from "../../components/UI/Buttons";
import MainLayout from "../../components/Layouts/MainLayout/MainLayout";

import classes from "../../styles/classes.module.scss";

interface IBareClassObject {
	id: string;
	name: string;
	teachers: string[];
	numOfStudents: number;
	status: "joined" | "requested";
}

const ClassesTabRoot = () => {
	const router = useRouter();
	const { globalSession } = useContext(GlobalSessionContext);
	const [classObjects, setClassObjects] = useState<IBareClassObject[]>([]);
	const { post } = useApi();

	useEffect(() => {
		(async () =>
			await post(
				"/api/classes/fetch-joined",
				{
					licenseId: globalSession.groups[globalSession.recentGroups[0]].licenseId,
					schoolId: globalSession.groups[globalSession.recentGroups[0]].id,
				},
				(data) => {
					console.log(data);
					setClassObjects(data.content);
				}
			))();
	}, [globalSession.groups[globalSession.recentGroups[0]].alias]);

	const cardClickHandler = (_class: IBareClassObject) => {
		_class.status === "joined" && router.push({ pathname: "/classes/[id]/progress", query: { id: _class.id } });
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
								<div key={_class.name} className={`${classes.card} ${classes[_class.status]}`} onClick={() => cardClickHandler(_class)}>
									{_class.status === "requested" && <div className={classes.pending}>Pending approval</div>}
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

ClassesTabRoot.getLayout = (page: ReactElement) => {
	return <MainLayout page="classes">{page}</MainLayout>;
};

ClassesTabRoot.auth = "user";

export default ClassesTabRoot;
