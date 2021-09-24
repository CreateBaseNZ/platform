import { useContext, useEffect, useState } from "react";
import router from "next/router";
import Link from "next/link";
import useOrganisationHelper from "../../hooks/useOrganisationHelper";
import VisualBellContext from "../../store/visual-bell-context";
import classes from "./ManageUsers.module.scss";
import Table from "./Table";
import TableControls from "./TableControls";
import TableFooter from "./TableFooter";
import TableHead from "./TableHead";
import { PrimaryButton } from "../UI/Buttons";

//TODO "invited By", "joined"
const columns = {
	learners: ["display Name", "username", "last Visited"],
	educators: ["display Name", "username", "email", "last Visited"],
	admins: ["display Name", "username", "email", "last Visited"],
};

const sizes = [10, 20, 50, 100, "All"];
const allSize = 9999;
const tabs = [
	{ label: "learners", icon: "backpack" },
	{ label: "educators", icon: "school" },
	{ label: "admins", icon: "verified_user" },
];

const ManageUsers = ({ user, setUser, collapseHeader, setCollapseHeader }) => {
	const vbCtx = useContext(VisualBellContext);
	const { getOrgUsers, changeUserPassword } = useOrganisationHelper({ ...vbCtx });
	const [tab, setTab] = useState(tabs[0].label);
	const [allUsers, setAllUsers] = useState({
		learners: [],
		educators: [],
		admins: [],
	});
	const [isChecked, setIsChecked] = useState({ learners: 0, educators: 0, admins: 0 });
	const [size, setSize] = useState(10);
	const [page, setPage] = useState(0);
	const [sort, setSort] = useState({ colName: "index", ascending: null });
	const [showSizeMenu, setShowSizeMenu] = useState(false);
	const [search, setSearch] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
	const [showChangePassword, setShowChangePassword] = useState(false);

	useEffect(async () => {
		if (user.type !== "admin" && user.type !== "educator") {
			return null;
		}
		const initData = { learners: [], educators: [], admins: [] };
		const rawData = await getOrgUsers();
		for (const user of rawData.licenses) {
			initData[user.access + "s"].push({
				displayName: user.profile.displayName,
				username: user.username,
				email: user.profile?.account?.email || "",
				lastVisited: user.date.visited,
				checked: false,
				index: initData[user.access + "s"].length,
			});
		}
		setAllUsers(initData);
		setIsLoading(false);
	}, []);

	useEffect(() => {
		const n = allUsers[tab].filter((d) => d.checked).length;
		setIsChecked((state) => ({ ...state, [tab]: n }));
		if (n === 0) {
			setShowRemoveConfirm(false);
		}
	}, [tab, allUsers]);

	if (user.type !== "admin" && user.type !== "educator") {
		router.replace("/user");
		return null;
	}

	if (!user.verified) {
		return (
			<div className={classes.notVerified}>
				<h1>Your account must be verified before proceeding</h1>
				<Link href="/user/my-account/verification">
					<div>
						<PrimaryButton className={classes.verify} mainLabel="Verify my account" />
					</div>
				</Link>
			</div>
		);
	}

	const changePasswordHandler = async (input) => {
		console.log(input);
		for (const user of allUsers[tab].filter((d) => d.checked)) {
			console.log(user);
			await changeUserPassword({
				details: { username: user.username, updates: { password: input.password } },
				successHandler: () => {},
			});
		}
		setShowChangePassword(false);
		vbCtx.setBell({
			type: "success",
			message: "Passwords reset",
		});
	};

	const removeUserHandler = () => {
		//TODO
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
		selected === "All" ? setSize(allSize) : setSize(selected);
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
			<TableControls
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
				changePasswordHandler={changePasswordHandler}
			/>
			<TableHead isChecked={isChecked} tab={tab} toggleAllCheckboxHandler={toggleAllCheckboxHandler} columns={columns} sort={sort} sortByColHandler={sortByColHandler} />
			<Table allUsers={allUsers} tab={tab} page={page} size={size} checkHandler={checkHandler} columns={columns} sort={sort} search={search} isLoading={isLoading} setIsLoading={setIsLoading} />
			<TableFooter
				showSizeMenu={showSizeMenu}
				setShowSizeMenu={setShowSizeMenu}
				allSize={allSize}
				size={size}
				sizes={sizes}
				setSizeHandler={setSizeHandler}
				page={page}
				setPage={setPage}
				allUsers={allUsers}
				tab={tab}
			/>
		</div>
	);
};

export default ManageUsers;
