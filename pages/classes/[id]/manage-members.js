import Head from "next/head";
import { useRef, useState } from "react";
import useApi from "../../../hooks/useApi";
import useClass from "../../../hooks/useClass";
import AddModal from "../../../components/Classes/ManageMembers/AddModal";
import InnerLayout from "../../../components/Layouts/InnerLayout/InnerLayout";
import HeaderToggle from "../../../components/Layouts/MainLayout/HeaderToggle";
import MainLayout from "../../../components/Layouts/MainLayout/MainLayout";
import { PrimaryButton, TertiaryButton } from "../../../components/UI/Buttons";
import Table from "../../../components/UI/Table/Table";
import CLASSES_TABS from "../../../constants/classesConstants";
import { MANAGE_MEMBERS_COLUMNS, MANAGE_MEMBERS_SIZES } from "../../../constants/classesConstants";

import classes from "../../../styles/classManageMembers.module.scss";
import SkeletonTable from "../../../components/UI/SkeletonTable";

const ClassesManage = () => {
	const ref = useRef();
	const post = useApi();
	const { classObject, setClassObject, classLoaded } = useClass();
	const [showAddModal, setShowAddModal] = useState(false);

	const renderBtns = [
		(key, data, selectedRowIds) => (
			<TertiaryButton
				key={key}
				onClick={async () => {
					await post({
						route: "/api/classes/remove-users",
						input: {
							classId: classObject.id,
							licenseIds: Object.keys(selectedRowIds).map((i) => data[i].licenseId),
							date: new Date().toString(),
						},
						successHandler: () => {
							setClassObject((state) => ({ ...state, students: state.students.filter((_, i) => !Object.keys(selectedRowIds).includes(i.toString())) }));
						},
					});
				}}
				mainLabel="Remove"
				className={classes.removeBtn}
				iconLeft={<i className="material-icons-outlined">person_remove</i>}
			/>
		),
	];

	return (
		<div className={classes.view} ref={ref}>
			<Head>
				<title>Manage Members • {classObject.name} | CreateBase</title>
				<meta name="description" content="View your class announcements" />
			</Head>
			<h1>
				Manage Members
				<PrimaryButton className={classes.addBtn} onClick={() => setShowAddModal(true)} mainLabel="Add" iconLeft={<i className="material-icons-outlined">person_add</i>} /> <HeaderToggle />
			</h1>
			{classObject.students ? <Table columns={MANAGE_MEMBERS_COLUMNS} data={classObject.students} pageSizes={MANAGE_MEMBERS_SIZES} renderBtns={renderBtns} /> : <SkeletonTable />}
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
