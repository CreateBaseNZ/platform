import Head from "next/head";
import InnerLayout from "../../../components/Layouts/InnerLayout/InnerLayout";
import MainLayout from "../../../components/Layouts/MainLayout/MainLayout";
import CLASSES_TABS from "../../../constants/classesTabs";

import classes from "../../../components/Classes/Reporting.module.scss";

const DUMMY_CLASS_DATA = {
	name: "10S4",
};

const ClassesReporting = () => {
	return (
		<div className={classes.view}>
			<Head>
				<title>Reporting • {DUMMY_CLASS_DATA.name} | CreateBase</title>
				<meta name="description" content="View your class announcements" />
			</Head>
			<h1>Reporting</h1>
			Coming soon!
		</div>
	);
};

ClassesReporting.getLayout = function getLayout(page) {
	return (
		<MainLayout page="classes">
			<InnerLayout tabs={CLASSES_TABS}>{page}</InnerLayout>
		</MainLayout>
	);
};

export default ClassesReporting;
