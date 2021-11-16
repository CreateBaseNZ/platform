import { useState } from "react";
import Head from "next/head";
import InnerLayout from "../../../components/Layouts/InnerLayout/InnerLayout";
import HeaderToggle from "../../../components/Layouts/MainLayout/HeaderToggle";
import MainLayout from "../../../components/Layouts/MainLayout/MainLayout";
import CLASSES_TABS from "../../../constants/classesConstants";
import useClass from "../../../hooks/useClass";
import NameForm from "../../../components/Classes/Settings/NameForm";
import { TertiaryButton } from "../../../components/UI/Buttons";

import classes from "../../../styles/classesSettings.module.scss";
import LeaveModal from "../../../components/Classes/Settings/LeaveModal";
import DeleteModal from "../../../components/Classes/Settings/DeleteModal";

const ClassesSettings = () => {
	const { classObject, classLoaded, setClassObject } = useClass();
	const [showLeaveModal, setShowLeaveModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	console.log(classObject);

	if (!classLoaded) return null;

	return (
		<div className={`${classes.view} roundScrollbar`}>
			<Head>
				<title>Settings • {classObject.name} | CreateBase</title>
				<meta name="description" content="View your class announcements" />
			</Head>
			<h1>
				Settings <HeaderToggle />
			</h1>
			<div className={classes.container}>
				<div className={classes.wrapper}>
					<NameForm defaultValue={classObject.name} classId={classObject.id} setClassObject={setClassObject} />
					{classObject.teachers.length > 1 && (
						<>
							<div className={classes.divider} />
							<TertiaryButton className={classes.leaveBtn} mainLabel="Leave class" onClick={() => setShowLeaveModal(true)} />
						</>
					)}
					<div className={classes.divider} />
					<TertiaryButton className={classes.deleteBtn} mainLabel="Delete class" onClick={() => setShowDeleteModal(true)} />
				</div>
			</div>
			{showLeaveModal && <LeaveModal setShow={setShowLeaveModal} classObject={classObject} />}
			{showDeleteModal && <DeleteModal setShow={setShowDeleteModal} classObject={classObject} />}
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
