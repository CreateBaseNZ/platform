import Head from "next/head";
import InnerLayout from "../../../components/Layouts/InnerLayout/InnerLayout";
import HeaderToggle from "../../../components/Layouts/MainLayout/HeaderToggle";
import MainLayout from "../../../components/Layouts/MainLayout/MainLayout";
import CLASSES_TABS from "../../../constants/classesConstants";
import useClass from "../../../hooks/useClass";
import NameForm from "../../../components/Classes/Settings/NameForm";

import classes from "../../../styles/classesSettings.module.scss";

const ClassesSettings = () => {
	const { classObject, classLoaded } = useClass();

	if (!classLoaded) return null;

	return (
		<div className={classes.view}>
			<Head>
				<title>Settings • {classObject.name} | CreateBase</title>
				<meta name="description" content="View your class announcements" />
			</Head>
			<h1>
				Settings <HeaderToggle />
			</h1>
			<div className={classes.container}>
				<NameForm defaultValue={classObject.name} classId={classObject.id} />
			</div>
		</div>
	);
};

ClassesSettings.getLayout = function getLayout(page) {
	return (
		<MainLayout page="classes">
			<InnerLayout tabs={CLASSES_TABS} backHref="/classes">
				{page}
			</InnerLayout>
		</MainLayout>
	);
};

ClassesSettings.auth = "user";

export default ClassesSettings;
