import Head from "next/head";
import { useState } from "react";
import AddModal from "../../../components/Classes/Manage/AddModal";
import NameForm from "../../../components/Classes/Manage/NameForm";
import InnerLayout from "../../../components/Layouts/InnerLayout/InnerLayout";
import HeaderToggle from "../../../components/Layouts/MainLayout/HeaderToggle";
import MainLayout from "../../../components/Layouts/MainLayout/MainLayout";
import { PrimaryButton } from "../../../components/UI/Buttons";
import Table from "../../../components/UI/Table/Table";
import CLASSES_TABS from "../../../constants/classesTabs";
import { COLUMNS, SIZES } from "../../../constants/manageClass";
import useClass from "../../../hooks/useClass";

import classes from "/styles/manageClass.module.scss";

const DUMMY_STUDENTS = [
	{ accountId: "abc123", firstName: "asdfasdasdf", lastName: "asfsasdasddf", email: "abc123@gmail.com" },
	{ accountId: "gh", firstName: "asdsfsddf", lastName: "dsdasdf", email: "123@gmail.com" },
	{ accountId: "asdf", firstName: "ssasdsa", lastName: "asdasds", email: "abc@gmail.com" },
];

const ClassesManage = () => {
	const { classObject, setClassObject, classLoaded } = useClass();
	const [showAddModal, setShowAddModal] = useState(false);

	console.log(classObject);

	// TODO replace DUMMY_STUDENTS with classObject.students

	if (!classLoaded) return null;

	return (
		<div className={classes.view}>
			<Head>
				<title>Manage • {classObject.name} | CreateBase</title>
				<meta name="description" content="View your class announcements" />
			</Head>
			<h1>
				Manage {classObject.name} <HeaderToggle />
			</h1>
			<div className={classes.controls}>
				<NameForm defaultValue={classObject.name} classId={classObject.id} />
				<PrimaryButton className={classes.addBtn} onClick={() => setShowAddModal(true)} mainLabel="Add" iconLeft={<i className="material-icons-outlined">person_add</i>} />
			</div>
			<Table columns={COLUMNS} data={DUMMY_STUDENTS} pageSizes={SIZES} />
			{showAddModal && <AddModal setShow={setShowAddModal} classObject={classObject} setClassObject={setClassObject} />}
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

ClassesManage.auth = "user";

export default ClassesManage;
