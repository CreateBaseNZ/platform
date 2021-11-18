import { useContext, useState, useEffect, useRef } from "react";
import router from "next/router";
import Head from "next/head";
import axios from "axios";
import useHandleResponse from "../../hooks/useHandleResponse";
import GlobalSessionContext from "../../store/global-session-context";
import HeaderToggle from "../Layouts/MainLayout/HeaderToggle";
import Table from "../UI/Table/Table";
import { PrimaryButton, TertiaryButton } from "../UI/Buttons";
import { COLUMNS, SIZES } from "../../constants/manageGroup";

import classes from "../../styles/manageGroup.module.scss";
import AddGroupUserModal from "./AddGroupUserModal";

const ManageGroup = ({ role }) => {
	const ref = useRef();
	const { globalSession, setGlobalSession } = useContext(GlobalSessionContext);
	const { handleResponse } = useHandleResponse();
	const [data, setData] = useState([]);
	const [showAddModal, setShowAddModal] = useState(false);

	useEffect(async () => {
		const details = {
			licenseId: globalSession.groups[globalSession.recentGroups[0]].licenseId,
			schoolId: globalSession.groups[globalSession.recentGroups[0]].id,
		};
		let data = {};
		const DUMMY_STATUS = "succeeded";
		try {
			data = (await axios.post("/api/groups/fetch-users", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: details, status: DUMMY_STATUS }))["data"];
		} catch (error) {
			data.status = "error";
		} finally {
			handleResponse({
				data,
				failHandler: () => {
					if (data.content === "unauthorised") {
						router.replace("/404");
					}
				},
				successHandler: () => ref.current && setData(data.content.filter((user) => user.role === role && user.status !== "deactivated")),
			});
		}
		() => (ref.current = null);
	}, []);

	useEffect(() => {
		if (router.query.add) {
			setShowAddModal(true);
		}
	}, [router.query.add]);

	if (!role) {
		router.replace("/manage-group/students");
		return null;
	}

	const renderBtns = [
		(key, data, selectedRowIds) =>
			role === "teacher" &&
			globalSession.groups[globalSession.recentGroups[0]].role === "admin" && (
				<TertiaryButton
					key={key}
					onClick={async () => {
						const details = {
							groupId: globalSession.groups[globalSession.recentGroups[0]].id,
							licenseIds: Object.keys(selectedRowIds).map((i) => data[i].licenseIds),
							date: new Date().toString(),
						};
						let _data;
						const DUMMY_STATUS = "succeeded";
						try {
							_data = (await axios.post("/api/groups/promote-users", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: details, status: DUMMY_STATUS }))["data"];
						} catch (error) {
							_data.status = "error";
						} finally {
							console.log(Object.keys(selectedRowIds));
							handleResponse({
								data: _data,
								failHandler: () => {},
								successHandler: () => {
									setData((state) => state.filter((_, i) => !Object.keys(selectedRowIds).includes(i.toString())));
									setGlobalSession((state) => ({
										...state,
										groups: state.groups.map((group) =>
											group.id === details.groupId
												? {
														...group,
														numOfUsers: { ...group.numOfUsers, teachers: group.numOfUsers.teachers - details.licenseIds.length, admins: group.numOfUsers.admins + details.licenseIds.length },
												  }
												: group
										),
									}));
								},
							});
						}
					}}
					mainLabel="Promote"
					className={classes.promoteBtn}
					iconLeft={<i className="material-icons-outlined">add_moderator</i>}
				/>
			),
		(key, data, selectedRowIds) => (
			<TertiaryButton
				key={key}
				onClick={async () => {
					const details = {
						groupId: globalSession.groups[globalSession.recentGroups[0]].id,
						licenseIds: Object.keys(selectedRowIds).map((i) => data[i].licenseIds),
						date: new Date().toString(),
					};
					let _data;
					const DUMMY_STATUS = "succeeded";
					try {
						_data = (await axios.post("/api/groups/remove-users", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: details, status: DUMMY_STATUS }))["data"];
					} catch (error) {
						_data.status = "error";
					} finally {
						console.log(Object.keys(selectedRowIds));
						handleResponse({
							data: _data,
							failHandler: () => {},
							successHandler: () => {
								setData((state) => state.filter((_, i) => !Object.keys(selectedRowIds).includes(i.toString())));
								setGlobalSession((state) => ({
									...state,
									groups: state.groups.map((group) =>
										group.id === details.groupId ? { ...group, numOfUsers: { ...group.numOfUsers, [role]: group.numOfUsers[role] - details.licenseIds.length } } : group
									),
								}));
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

	return (
		<div className={classes.manageGroup}>
			<Head>
				<title>
					Manage {role}s • {globalSession.groups[globalSession.recentGroups[0]].name} | CreateBase
				</title>
				<meta name="description" content="Log into your CreateBase account" />
			</Head>
			<h2 ref={ref} className={classes.header}>
				Manage {role}s
				<PrimaryButton className={classes.addBtn} onClick={() => setShowAddModal(true)} mainLabel="Add" iconLeft={<i className="material-icons-outlined">person_add</i>} />
				<HeaderToggle />
			</h2>
			<Table columns={COLUMNS} data={data} pageSizes={SIZES} renderBtns={renderBtns} />
			{showAddModal && <AddGroupUserModal setShow={setShowAddModal} role={role} />}
		</div>
	);
};

export default ManageGroup;
