import Head from "next/head";
import InnerLayout from "../../../components/Layouts/InnerLayout/InnerLayout";
import MainLayout from "../../../components/Layouts/MainLayout/MainLayout";
import CLASSES_TABS from "../../../constants/classesConstants";
import useClass from "../../../hooks/useClass";

import classes from "../../../components/Classes/Assignments.module.scss";

const ClassesAssignments = () => {
	const { classObject, classLoaded } = useClass();

	if (!classLoaded) return null;

	return (
		<div className={classes.view}>
			<Head>
				<title>Assignments • {classObject.name} | CreateBase</title>
				<meta name="description" content="View your class announcements" />
			</Head>
			<h1>Assignments</h1>
			Coming soon!
		</div>
	);
};

ClassesAssignments.getLayout = function getLayout(page) {
	return (
		<MainLayout page="classes">
			<InnerLayout tabs={CLASSES_TABS} backHref="/classes">
				{page}
			</InnerLayout>
		</MainLayout>
	);
};

ClassesAssignments.auth = "user";

export default ClassesAssignments;
