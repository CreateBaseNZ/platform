import router from "next/router";
import { useEffect, useState } from "react";
import classes from "./AdminConsole.module.scss";
import Table from "./Table";
import TableControls from "./TableControls";
import TableFooter from "./TableFooter";
import TableHead from "./TableHead";

//TODO "invited By"

const columns = {
	learners: ["display Name", "username", "joined"],
	educators: ["display Name", "username", "email", "joined"],
	admins: ["display Name", "username", "email", "joined"],
};

const learnersData = [
	{ displayName: "Dainty Mink", username: "jamie-lee_monroe", joined: "2021-08-21", invitedBy: "jane_mary_doe" },
	{ displayName: "Ridiculous Sailfish", username: "karolina-hancock", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Joyful Komodo Dragon", username: "Aaryan_Braun", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Aphid", username: "jane_mary_doe", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Nice Clownfish", username: "Maizieryan", joined: "2021-04-23", invitedBy: "jane_mary_doe" },
	{ displayName: "Yummy Trout", username: "Benny_bautista", joined: "2021-03-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Generous Tarantula", username: "Linzi-Griffin", joined: "2021-03-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Mink", username: "jamie-lee_monroe", joined: "2021-08-21", invitedBy: "jane_mary_doe" },
	{ displayName: "Ridiculous Sailfish", username: "karolina-hancock", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Joyful Komodo Dragon", username: "Aaryan_Braun", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Aphid", username: "jane_mary_doe", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Nice Clownfish", username: "Maizieryan", joined: "2021-04-23", invitedBy: "jane_mary_doe" },
	{ displayName: "Yummy Trout", username: "Benny_bautista", joined: "2021-03-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Generous Tarantula", username: "Linzi-Griffin", joined: "2021-03-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Mink", username: "jamie-lee_monroe", joined: "2021-08-21", invitedBy: "jane_mary_doe" },
	{ displayName: "Ridiculous Sailfish", username: "karolina-hancock", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Joyful Komodo Dragon", username: "Aaryan_Braun", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Aphid", username: "jane_mary_doe", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Nice Clownfish", username: "Maizieryan", joined: "2021-04-23", invitedBy: "jane_mary_doe" },
	{ displayName: "Yummy Trout", username: "Benny_bautista", joined: "2021-03-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Generous Tarantula", username: "Linzi-Griffin", joined: "2021-03-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Ridiculous Sailfish", username: "karolina-hancock", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Joyful Komodo Dragon", username: "Aaryan_Braun", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Aphid", username: "jane_mary_doe", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Nice Clownfish", username: "Maizieryan", joined: "2021-04-23", invitedBy: "jane_mary_doe" },
	{ displayName: "Yummy Trout", username: "Benny_bautista", joined: "2021-03-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Generous Tarantula", username: "Linzi-Griffin", joined: "2021-03-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Mink", username: "jamie-lee_monroe", joined: "2021-08-21", invitedBy: "jane_mary_doe" },
	{ displayName: "Ridiculous Sailfish", username: "karolina-hancock", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Joyful Komodo Dragon", username: "Aaryan_Braun", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Aphid", username: "jane_mary_doe", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Nice Clownfish", username: "Maizieryan", joined: "2021-04-23", invitedBy: "jane_mary_doe" },
	{ displayName: "Yummy Trout", username: "Benny_bautista", joined: "2021-03-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Generous Tarantula", username: "Linzi-Griffin", joined: "2021-03-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Mink", username: "jamie-lee_monroe", joined: "2021-08-21", invitedBy: "jane_mary_doe" },
	{ displayName: "Ridiculous Sailfish", username: "karolina-hancock", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Joyful Komodo Dragon", username: "Aaryan_Braun", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Aphid", username: "jane_mary_doe", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Nice Clownfish", username: "Maizieryan", joined: "2021-04-23", invitedBy: "jane_mary_doe" },
	{ displayName: "Yummy Trout", username: "Benny_bautista", joined: "2021-03-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Generous Tarantula", username: "Linzi-Griffin", joined: "2021-03-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Mink", username: "jamie-lee_monroe", joined: "2021-08-21", invitedBy: "jane_mary_doe" },
	{ displayName: "Ridiculous Sailfish", username: "karolina-hancock", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Joyful Komodo Dragon", username: "Aaryan_Braun", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Aphid", username: "jane_mary_doe", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Nice Clownfish", username: "Maizieryan", joined: "2021-04-23", invitedBy: "jane_mary_doe" },
	{ displayName: "Yummy Trout", username: "Benny_bautista", joined: "2021-03-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Generous Tarantula", username: "Linzi-Griffin", joined: "2021-03-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Ridiculous Sailfish", username: "karolina-hancock", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Joyful Komodo Dragon", username: "Aaryan_Braun", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Aphid", username: "jane_mary_doe", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Nice Clownfish", username: "Maizieryan", joined: "2021-04-23", invitedBy: "jane_mary_doe" },
	{ displayName: "Yummy Trout", username: "Benny_bautista", joined: "2021-03-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Generous Tarantula", username: "Linzi-Griffin", joined: "2021-03-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Ridiculous Sailfish", username: "karolina-hancock", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Joyful Komodo Dragon", username: "Aaryan_Braun", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Aphid", username: "jane_mary_doe", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Nice Clownfish", username: "Maizieryan", joined: "2021-04-23", invitedBy: "jane_mary_doe" },
	{ displayName: "Yummy Trout", username: "Benny_bautista", joined: "2021-03-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Generous Tarantula", username: "Linzi-Griffin", joined: "2021-03-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Ridiculous Sailfish", username: "karolina-hancock", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Joyful Komodo Dragon", username: "Aaryan_Braun", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Aphid", username: "jane_mary_doe", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Nice Clownfish", username: "Maizieryan", joined: "2021-04-23", invitedBy: "jane_mary_doe" },
	{ displayName: "Yummy Trout", username: "Benny_bautista", joined: "2021-03-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Generous Tarantula", username: "Linzi-Griffin", joined: "2021-03-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Mink", username: "jamie-lee_monroe", joined: "2021-08-21", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Mink", username: "jamie-lee_monroe", joined: "2021-08-21", invitedBy: "jane_mary_doe" },
	{ displayName: "Ridiculous Sailfish", username: "karolina-hancock", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Joyful Komodo Dragon", username: "Aaryan_Braun", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Aphid", username: "jane_mary_doe", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Nice Clownfish", username: "Maizieryan", joined: "2021-04-23", invitedBy: "jane_mary_doe" },
	{ displayName: "Yummy Trout", username: "Benny_bautista", joined: "2021-03-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Generous Tarantula", username: "Linzi-Griffin", joined: "2021-03-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Ridiculous Sailfish", username: "karolina-hancock", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Joyful Komodo Dragon", username: "Aaryan_Braun", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Aphid", username: "jane_mary_doe", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Nice Clownfish", username: "Maizieryan", joined: "2021-04-23", invitedBy: "jane_mary_doe" },
	{ displayName: "Yummy Trout", username: "Benny_bautista", joined: "2021-03-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Generous Tarantula", username: "Linzi-Griffin", joined: "2021-03-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Mink", username: "jamie-lee_monroe", joined: "2021-08-21", invitedBy: "jane_mary_doe" },
	{ displayName: "Ridiculous Sailfish", username: "karolina-hancock", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Joyful Komodo Dragon", username: "Aaryan_Braun", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Aphid", username: "jane_mary_doe", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Nice Clownfish", username: "Maizieryan", joined: "2021-04-23", invitedBy: "jane_mary_doe" },
	{ displayName: "Yummy Trout", username: "Benny_bautista", joined: "2021-03-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Generous Tarantula", username: "Linzi-Griffin", joined: "2021-03-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Mink", username: "jamie-lee_monroe", joined: "2021-08-21", invitedBy: "jane_mary_doe" },
	{ displayName: "Ridiculous Sailfish", username: "karolina-hancock", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Joyful Komodo Dragon", username: "Aaryan_Braun", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Aphid", username: "jane_mary_doe", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Nice Clownfish", username: "Maizieryan", joined: "2021-04-23", invitedBy: "jane_mary_doe" },
	{ displayName: "Yummy Trout", username: "Benny_bautista", joined: "2021-03-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Generous Tarantula", username: "Linzi-Griffin", joined: "2021-03-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Mink", username: "jamie-lee_monroe", joined: "2021-08-21", invitedBy: "jane_mary_doe" },
	{ displayName: "Ridiculous Sailfish", username: "karolina-hancock", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Joyful Komodo Dragon", username: "Aaryan_Braun", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Aphid", username: "jane_mary_doe", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Nice Clownfish", username: "Maizieryan", joined: "2021-04-23", invitedBy: "jane_mary_doe" },
	{ displayName: "Yummy Trout", username: "Benny_bautista", joined: "2021-03-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Generous Tarantula", username: "Linzi-Griffin", joined: "2021-03-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Ridiculous Sailfish", username: "karolina-hancock", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Joyful Komodo Dragon", username: "Aaryan_Braun", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Aphid", username: "jane_mary_doe", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Nice Clownfish", username: "Maizieryan", joined: "2021-04-23", invitedBy: "jane_mary_doe" },
	{ displayName: "Yummy Trout", username: "Benny_bautista", joined: "2021-03-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Generous Tarantula", username: "Linzi-Griffin", joined: "2021-03-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Ridiculous Sailfish", username: "karolina-hancock", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Joyful Komodo Dragon", username: "Aaryan_Braun", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Aphid", username: "jane_mary_doe", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Nice Clownfish", username: "Maizieryan", joined: "2021-04-23", invitedBy: "jane_mary_doe" },
	{ displayName: "Yummy Trout", username: "Benny_bautista", joined: "2021-03-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Generous Tarantula", username: "Linzi-Griffin", joined: "2021-03-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Ridiculous Sailfish", username: "karolina-hancock", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Joyful Komodo Dragon", username: "Aaryan_Braun", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Aphid", username: "jane_mary_doe", joined: "2021-02-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Nice Clownfish", username: "Maizieryan", joined: "2021-04-23", invitedBy: "jane_mary_doe" },
	{ displayName: "Yummy Trout", username: "Benny_bautista", joined: "2021-03-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Generous Tarantula", username: "Linzi-Griffin", joined: "2021-03-12", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Mink", username: "jamie-lee_monroe", joined: "2021-08-21", invitedBy: "jane_mary_doe" },
];
const educatorsData = [
	{ displayName: "Mrs. Doe", username: "jane_mary_doe", email: "jm.doe@park.school.nz", joined: "2021-03-23", invitedBy: "park_admin_0" },
	{ displayName: "Mrs. Doe", username: "jane_mary_doe", email: "jm.doe@park.school.nz", joined: "2021-03-23", invitedBy: "park_admin_0" },
	{ displayName: "Mrs. Doe", username: "jane_mary_doe", email: "jm.doe@park.school.nz", joined: "2021-03-23", invitedBy: "park_admin_0" },
	{ displayName: "Mrs. Doe", username: "jane_mary_doe", email: "jm.doe@park.school.nz", joined: "2021-03-23", invitedBy: "park_admin_0" },
];
const adminsData = [
	{ displayName: "Mrs Doe", username: "jane_mary_doe", email: "jm.doe@hayes.school.nz", joined: "2021-03-23", invitedBy: "jane_mary_doe" },
	{ displayName: "Mrs Sivan", username: "valerius-sivan", email: "jm.doe@hayes.school.nz", joined: "2021-03-23", invitedBy: "jane_mary_doe" },
	{ displayName: "Mr Phoebe", username: "jane_mary_doe", email: "jm.doe@hayes.school.nz", joined: "2021-03-23", invitedBy: "jane_mary_doe" },
	{ displayName: "Ms Radmir", username: "maret_radmir", email: "jm.doe@hayes.school.nz", joined: "2021-03-23", invitedBy: "valerius-sivan" },
];

const sizes = [10, 20, 50, 100, "All"];
const allSize = 9999;
const tabs = [
	{ label: "learners", icon: "backpack" },
	{ label: "educators", icon: "school" },
	{ label: "admins", icon: "verified_user" },
];

const initData = {
	learners: learnersData.map((d, i) => ({ ...d, checked: false, index: i })),
	educators: educatorsData.map((d, i) => ({ ...d, checked: false, index: i })),
	admins: adminsData.map((d, i) => ({ ...d, checked: false, index: i })),
};

const AdminConsole = ({ user, setUser, collapseHeader, setCollapseHeader }) => {
	const [tab, setTab] = useState(tabs[0].label);
	const [allUsers, setAllUsers] = useState(initData);
	const [isChecked, setIsChecked] = useState({ learners: 0, educators: 0, admins: 0 });
	const [size, setSize] = useState(10);
	const [page, setPage] = useState(0);
	const [sort, setSort] = useState({ colName: "index", ascending: null });
	const [showSizeMenu, setShowSizeMenu] = useState(false);
	const [search, setSearch] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);

	useEffect(() => {
		const n = allUsers[tab].filter((d) => d.checked).length;
		setIsChecked((state) => ({ ...state, [tab]: n }));
		if (n === 0) {
			setShowRemoveConfirm(false);
		}
	}, [tab, allUsers]);

	if (user.type !== "admin") {
		router.replace("/user");
		return null;
	}

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
		<div className={classes.adminConsole}>
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

export default AdminConsole;
