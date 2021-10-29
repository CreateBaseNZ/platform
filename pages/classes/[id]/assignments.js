import Head from "next/head";
import InnerLayout from "../../../components/Layouts/InnerLayout/InnerLayout";
import MainLayout from "../../../components/Layouts/MainLayout/MainLayout";
import CLASSES_TABS from "../../../constants/classesTabs";

import classes from "../../../components/Classes/Assignments.module.scss";
import { useContext } from "react";
import ClassesContext from "../../../store/classes-context";

const ClassesAssignments = () => {
	const { classSession } = useContext(ClassesContext);

	return (
		<div className={classes.view}>
			<Head>
				<title>Assignments • {classSession.name} | CreateBase</title>
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

export default ClassesAssignments;
