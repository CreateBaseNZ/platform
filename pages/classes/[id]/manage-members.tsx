import Head from "next/head";
import { useRef, useState, useContext, ReactElement } from "react";
import GlobalSessionContext from "../../../store/global-session-context";
import useApi from "../../../hooks/useApi";
import useClass from "../../../hooks/useClass";
import AddModal from "../../../components/Classes/ManageMembers/AddModal";
import InnerLayout from "../../../components/Layouts/InnerLayout/InnerLayout";
import HeaderToggle from "../../../components/Layouts/MainLayout/HeaderToggle";
import MainLayout from "../../../components/Layouts/MainLayout/MainLayout";
import { PrimaryButton, TertiaryButton } from "../../../components/UI/Buttons";
import Table from "../../../components/UI/Table/Table";
import CLASSES_TABS from "../../../constants/classesConstants";
import SkeletonTable from "../../../components/UI/SkeletonTable";
import { MANAGE_MEMBERS_COLUMNS, MANAGE_MEMBERS_SIZES } from "../../../constants/classesConstants";

import classes from "../../../styles/classManageMembers.module.scss";

const ClassesManage = (): JSX.Element => {
	const ref = useRef<HTMLDivElement | null>(null);
	const { post } = useApi();
	const { classObject, setClassObject, classLoaded } = useClass();
	const [showAddModal, setShowAddModal] = useState(false);
	const { globalSession } = useContext(GlobalSessionContext);

	// TODO types
	const renderBtns = [
		(key: number, data: any[], selectedRowIds: Record<string, any>) => (
			<TertiaryButton
				key={key}
				onClick={async () => {
					await post(
						"/api/classes/remove-users",
						{
							classId: classObject.id,
							licenseId: globalSession.groups[globalSession.recentGroups[0]].licenseId,
							licenseIds: Object.keys(selectedRowIds).map((i) => data[parseInt(i)].licenseId),
							date: new Date().toString(),
						},
						() => {
							setClassObject((state) => ({ ...state, students: state.students.filter((_, i) => !Object.keys(selectedRowIds).includes(i.toString())) }));
						}
					);
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
				<title>Manage Members • {classObject?.name} | CreateBase</title>
				<meta name="description" content="View your class announcements" />
			</Head>
			<h1>
				Manage Members
				<PrimaryButton className={classes.addBtn} onClick={() => setShowAddModal(true)} mainLabel="Add" iconLeft={<i className="material-icons-outlined">person_add</i>} /> <HeaderToggle />
			</h1>
			{classLoaded ? <Table columns={MANAGE_MEMBERS_COLUMNS} data={classObject.students} pageSizes={MANAGE_MEMBERS_SIZES} renderBtns={renderBtns} /> : <SkeletonTable rows={3} />}
			{showAddModal && <AddModal setShow={setShowAddModal} classObject={classObject} setClassObject={setClassObject} />}
		</div>
	);
};

ClassesManage.getLayout = function getLayout(page: ReactElement) {
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
