import { useContext, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import useOrganisationHelper from "../../hooks/useOrganisationHelper";
import UserSessionContext from "../../store/user-session";
import Table from "./Table";
// import TableControls from "./TableControls";
import GROUP_CONFIG, { COLUMNS, SIZES } from "../../constants/manageGroup";

import classes from "/styles/manageGroup.module.scss";
import { useRouter } from "next/router";
import MainLayoutContext from "../../store/main-layout-context";

const ManageGroup = ({ role }) => {
	const router = useRouter();
	const { userSession } = useContext(UserSessionContext);
	const { getOrgUsers } = useOrganisationHelper();
	const { headerIsCollapsed, setHeaderIsCollapsed } = useContext(MainLayoutContext);
	const [allUsers, setAllUsers] = useState(Object.assign({}, ...Object.entries({ ...GROUP_CONFIG[userSession.recentGroups[0].type].roles }).map(([_, b]) => ({ [b.name]: [] }))));
	const [isLoading, setIsLoading] = useState(true);
	const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);

	console.log(role);

	if (!role) {
		router.replace("/manage-group/students");
		return null;
	}

	useEffect(async () => {
		await getOrgUsers({
			successHandler: (data) => {
				let result = Object.keys(data.users).reduce((res, key) => {
					return {
						...res,
						[key]: data.users[key].map((user) => ({ firstName: user.firstName, lastName: user.lastName, email: user.email, checked: false, index: data.users[key].length })),
					};
				}, {});
				setAllUsers(result);
			},
		});
		setIsLoading(false);
		console.log("fetched data");
	}, []);

	const removeUserHandler = () => {
		//TODO [IGNORE]
		setShowRemoveConfirm(false);
	};

	const promoteHandler = () => {};

	const searchHandler = (e) => {
		setIsLoading(true);
		setSearch(e.target.value);
	};

	const data = useMemo(
		() => [
			{ firstName: "John", lastName: "Doe", email: "johndoe@gmail.com" },
			{ firstName: "Doe", lastName: "John", email: "doejohn@gmail.com" },
			{ firstName: "Dohn", lastName: "Joe", email: "dohnjoe@gmail.com" },
		],
		[]
	);

	const columns = useMemo(() => COLUMNS, []);

	return (
		<div className={classes.manageGroup}>
			<Head>
				<title>
					Manage {role} • {userSession.recentGroups[0].name} | CreateBase
				</title>
				<meta name="description" content="Log into your CreateBase account" />
			</Head>
			{/* <TableControls
				isChecked={isChecked}
				tab={tab}
				setTab={setTab}
				tabs={tabs}
				allUsers={allUsers}
				collapseHeader={collapseHeader}
				setCollapseHeader={setCollapseHeader}
				search={search}
				searchHandler={searchHandler}
				removeUserHandler={removeUserHandler}
				showRemoveConfirm={showRemoveConfirm}
				setShowRemoveConfirm={setShowRemoveConfirm}
				showChangePassword={showChangePassword}
				setShowChangePassword={setShowChangePassword}
			/> */}
			<h2 className={classes.header}>
				Manage {role}
				<button className={classes.toggleHeader} onClick={() => setHeaderIsCollapsed((state) => !state)} title="Expand table view">
					<span>{headerIsCollapsed ? "Collapse" : "Expand"}</span>
					<i className="material-icons-outlined" style={{ transform: headerIsCollapsed && "rotate(180deg)" }}>
						expand_less
					</i>
				</button>
			</h2>
			<Table columns={columns} data={data} pageSizes={SIZES} />
		</div>
	);
};

export default ManageGroup;
