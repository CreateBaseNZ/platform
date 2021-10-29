import Head from "next/head";
import InnerLayout from "../../../components/Layouts/InnerLayout/InnerLayout";
import MainLayout from "../../../components/Layouts/MainLayout/MainLayout";
import CLASSES_TABS from "../../../constants/classesTabs";

import classes from "../../../components/Classes/Manage.module.scss";
import { useContext } from "react";
import ClassesContext from "../../../store/classes-context";

const ClassesManage = () => {
	const { classSession } = useContext(ClassesContext);

	return (
		<div className={classes.view}>
			<Head>
				<title>Manage • {classSession.name} | CreateBase</title>
				<meta name="description" content="View your class announcements" />
			</Head>
			<h1>Manage {classSession.name}</h1>
			Coming soon!
		</div>
	);
};

ClassesManage.getLayout = function getLayout(page) {
	return (
		<MainLayout page="classes">
			<InnerLayout tabs={CLASSES_TABS} backHref="/classes">
				{page}
			</InnerLayout>
		</MainLayout>
	);
};

export default ClassesManage;
