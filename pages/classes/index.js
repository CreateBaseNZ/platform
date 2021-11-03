import { useContext } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import ClassesContext from "../../store/classes-context";
import { PrimaryButton } from "../../components/UI/Buttons";
import MainLayout from "../../components/Layouts/MainLayout/MainLayout";

import classes from "/styles/classes.module.scss";

const DUMMY_CLASSES = [
	{ id: "room12id", name: "Room 23", teachers: ["Mrs Applecrumb"], numOfStudents: 23 },
	{ id: "room26id", name: "Room 26", teachers: ["Mr Bumblebee"], numOfStudents: 28 },
];

const ClassesTabRoot = () => {
	const router = useRouter();
	const { classSession, setClassSession } = useContext(ClassesContext);

	const cardClickHandler = (_class) => {
		setClassSession(_class);
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
						<div className={`${classes.card} ${classes.addCard}`} onClick={() => router.push("/classes/new")}>
							<div className={classes.addIcons}>
								<i className="material-icons-outlined">add</i>
								<i className="material-icons-outlined">chair_alt</i>
							</div>
							<div className={classes.className}>Create a class</div>
						</div>
						{DUMMY_CLASSES.map((_class) => (
							<div key={_class.name} className={classes.card} onClick={() => cardClickHandler(_class)}>
								<div className={classes.className}>{_class.name}</div>
								<div className={classes.classTeachers}>{_class.teachers.join(", ")}</div>
								<div className={classes.classStudents}>
									{_class.numOfStudents} student{_class.numOfStudents === 1 ? "" : "s"}
								</div>
							</div>
						))}
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
