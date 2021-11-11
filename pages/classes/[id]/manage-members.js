import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import AddModal from "../../../components/Classes/ManageMembers/AddModal";
import InnerLayout from "../../../components/Layouts/InnerLayout/InnerLayout";
import HeaderToggle from "../../../components/Layouts/MainLayout/HeaderToggle";
import MainLayout from "../../../components/Layouts/MainLayout/MainLayout";
import { PrimaryButton, TertiaryButton } from "../../../components/UI/Buttons";
import Table from "../../../components/UI/Table/Table";
import CLASSES_TABS from "../../../constants/classesConstants";
import { MANAGE_MEMBERS_COLUMNS, MANAGE_MEMBERS_SIZES } from "../../../constants/classesConstants";
import useClass from "../../../hooks/useClass";
import useHandleResponse from "../../../hooks/useHandleResponse";

import classes from "../../../styles/classManageMembers.module.scss";

const DUMMY_STUDENTS = [
	{ accountId: "abc123", firstName: "asdfasdasdf", lastName: "asfsasdasddf", email: "abc123@gmail.com" },
	{ accountId: "gh", firstName: "asdsfsddf", lastName: "dsdasdf", email: "123@gmail.com" },
	{ accountId: "asdf", firstName: "ssasdsa", lastName: "asdasds", email: "abc@gmail.com" },
];

const ClassesManage = () => {
	const { classObject, setClassObject, classLoaded } = useClass();
	const { handleResponse } = useHandleResponse();
	const [showAddModal, setShowAddModal] = useState(false);

	console.log(classObject);

	const renderBtns = [
		(key, data, selectedRowIds) => (
			<TertiaryButton
				key={key}
				onClick={async () => {
					const inputs = {
						classId: classObject.id,
						users: Object.keys(selectedRowIds).map((i) => data[i].accountId),
					};
					let _data;
					const DUMMY_STATUS = "succeeded";
					try {
						_data = (await axios.post("/api/classes/remove-users", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: inputs, status: DUMMY_STATUS }))["data"];
					} catch (error) {
						_data.status = "error";
					} finally {
						console.log(_data);
						handleResponse({
							data: _data,
							failHandler: () => {},
							successHandler: () => {
								setClassObject((state) => ({ ...state, students: state.students.filter((_, i) => !Object.keys(selectedRowIds).includes(i)) }));
							},
						});
					}
				}}
				mainLabel="Remove"
				className={classes.removeBtn}
				iconLeft={<i className="material-icons-outlined">person_remove</i>}
			/>
		),
	];

	// TODO replace DUMMY_STUDENTS with classObject.students

	if (!classLoaded) return null;

	return (
		<div className={classes.view}>
			<Head>
				<title>Manage Members • {classObject.name} | CreateBase</title>
				<meta name="description" content="View your class announcements" />
			</Head>
			<h1>
				Manage {classObject.name} Members
				<PrimaryButton className={classes.addBtn} onClick={() => setShowAddModal(true)} mainLabel="Add" iconLeft={<i className="material-icons-outlined">person_add</i>} /> <HeaderToggle />
			</h1>
			<Table columns={MANAGE_MEMBERS_COLUMNS} data={DUMMY_STUDENTS} pageSizes={MANAGE_MEMBERS_SIZES} renderBtns={renderBtns} />
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
