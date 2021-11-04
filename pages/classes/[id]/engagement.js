import Head from "next/head";
import InnerLayout from "../../../components/Layouts/InnerLayout/InnerLayout";
import MainLayout from "../../../components/Layouts/MainLayout/MainLayout";
import CLASSES_TABS from "../../../constants/classesTabs";

import classes from "../../../components/Classes/Engagement.module.scss";
import useClass from "../../../hooks/useClass";

const ClassesEngagement = () => {
	const { classObject, classLoaded } = useClass();

	if (!classLoaded) return null;
	return (
		<div className={classes.view}>
			<Head>
				<title>Engagement • {classObject.name} | CreateBase</title>
				<meta name="description" content="View your class announcements" />
			</Head>
			<h1>Engagement</h1>
			Coming soon!
		</div>
	);
};

ClassesEngagement.getLayout = function getLayout(page) {
	return (
		<MainLayout page="classes">
			<InnerLayout tabs={CLASSES_TABS} backHref="/classes">
				{page}
			</InnerLayout>
		</MainLayout>
	);
};

ClassesEngagement.auth = "user";

export default ClassesEngagement;
