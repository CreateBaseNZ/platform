import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import useOrganisationHelper from "../../hooks/useOrganisationHelper";
import UserSessionContext from "../../store/user-session";
// import Table from "./Table";
// import TableControls from "./TableControls";
// import TableFooter from "./TableFooter";
// import TableHead from "./TableHead";
import GROUP_CONFIG, { COLUMNS, SIZES } from "../../constants/manageGroup";
import MainLayout from "../Layouts/MainLayout/MainLayout";

import classes from "/styles/manageGroup.module.scss";

const ManageGroup = ({ collapseHeader, setCollapseHeader }) => {
	const { userSession } = useContext(UserSessionContext);
	const { getOrgUsers } = useOrganisationHelper();
	const [tab, setTab] = useState(GROUP_CONFIG[userSession.view.groupType].userTypes[0].name);
	const [allUsers, setAllUsers] = useState(Object.assign({}, ...Object.entries({ ...GROUP_CONFIG[userSession.view.groupType].userTypes }).map(([_, b]) => ({ [b.name]: [] }))));
	const [isChecked, setIsChecked] = useState(Object.assign({}, ...Object.entries({ ...GROUP_CONFIG[userSession.view.groupType].userTypes }).map(([_, b]) => ({ [b.name]: 0 }))));
	const [size, setSize] = useState(10);
	const [page, setPage] = useState(0);
	const [sort, setSort] = useState({ colName: "index", ascending: null });
	const [showSizeMenu, setShowSizeMenu] = useState(false);
	const [search, setSearch] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
	const [showChangePassword, setShowChangePassword] = useState(false);

	console.log(allUsers);

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
	}, []);

	useEffect(() => {
		const n = allUsers[tab].filter((d) => d.checked).length;
		setIsChecked((state) => ({ ...state, [tab]: n }));
		if (n === 0) {
			setShowRemoveConfirm(false);
		}
	}, [tab, allUsers]);

	const removeUserHandler = () => {
		//TODO [IGNORE]
		setShowRemoveConfirm(false);
	};

	const promoteHandler = () => {};

	const checkHandler = (row) => {
		setAllUsers((state) => ({
			...state,
			[tab]: state[tab].map((values, i) => {
				if (i === row) {
					return { ...values, checked: !values.checked };
				} else {
					return values;
				}
			}),
		}));
	};

	const toggleAllCheckboxHandler = () => {
		if (isChecked[tab]) {
			setAllUsers((state) => ({
				...state,
				[tab]: state[tab].map((values) => ({ ...values, checked: false })),
			}));
		} else {
			setAllUsers((state) => ({
				...state,
				[tab]: state[tab].map((values) => ({ ...values, checked: true })),
			}));
		}
	};

	const searchHandler = (e) => {
		setIsLoading(true);
		setSearch(e.target.value);
	};

	const setSizeHandler = (selected) => {
		setSize(selected);
	};

	const sortByColHandler = (col) => {
		const colName = col.replace(" ", "");
		setSort((state) => {
			if (state.colName === colName) {
				if (!state.ascending) {
					return { colName: "index", ascending: null };
				} else {
					return { colName: colName, ascending: false };
				}
			} else {
				return { colName: colName, ascending: true };
			}
		});
	};

	return (
		<div className={classes.manageUsers}>
			<Head>
				<title>Manage • {userSession.view.groupName} | CreateBase</title>
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
			/>
			<TableHead isChecked={isChecked} tab={tab} toggleAllCheckboxHandler={toggleAllCheckboxHandler} columns={COLUMNS} sort={sort} sortByColHandler={sortByColHandler} />
			<Table allUsers={allUsers} tab={tab} page={page} size={size} checkHandler={checkHandler} columns={COLUMNS} sort={sort} search={search} isLoading={isLoading} setIsLoading={setIsLoading} />
			<TableFooter
				showSizeMenu={showSizeMenu}
				setShowSizeMenu={setShowSizeMenu}
				size={size}
				sizes={SIZES}
				setSizeHandler={setSizeHandler}
				page={page}
				setPage={setPage}
				allUsers={allUsers}
				tab={tab}
			/> */}
		</div>
	);
};

ManageGroup.getLayout = function getLayout(page) {
	return <MainLayout page="manage-group">{page}</MainLayout>;
};

ManageGroup.authorisation = "admin";

export default ManageGroup;
