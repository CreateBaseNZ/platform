import { useEffect, useState } from "react";
import classes from "./AdminConsole.module.scss";
import Table from "./Table";

const columns = {
	learners: ["display Name", "username", "joined", "invited By"],
	educators: ["display Name", "username", "email", "joined", "invited By"],
	admins: ["display Name", "username", "email", "joined", "invited By"],
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

const initData = {
	learners: learnersData.map((d) => ({ ...d, checked: false })),
	educators: educatorsData.map((d) => ({ ...d, checked: false })),
	admins: adminsData.map((d) => ({ ...d, checked: false })),
};

const AdminConsole = ({ user, setUser, collapseHeader, setCollapseHeader }) => {
	const [tab, setTab] = useState("learners");
	const [allUsers, setAllUsers] = useState(initData);
	const [isChecked, setIsChecked] = useState({ learners: false, educators: false, admins: false });
	const [size, setSize] = useState(20);
	const [page, setPage] = useState(0);
	const [sort, setSort] = useState({ colName: null, ascending: null });
	const [showSizeMenu, setShowSizeMenu] = useState(false);

	console.log(allUsers);

	useEffect(() => {
		setIsChecked((state) => ({ ...state, [tab]: allUsers[tab].some((d) => d.checked) }));
	}, [tab, allUsers]);

	// useEffect(() => {
	// 	setAllUsers((state) => {
	// 		let view = [...initData[tab]];
	// 		if (sort.colName) {
	// 			view.sort((a, b) => {
	// 				if (sort.ascending) {
	// 					if (a[sort.colName].toUpperCase() < b[sort.colName].toUpperCase()) {
	// 						return -1;
	// 					}
	// 					if (a[sort.colName].toUpperCase() > b[sort.colName].toUpperCase()) {
	// 						return 1;
	// 					}
	// 				} else {
	// 					if (a[sort.colName].toUpperCase() < b[sort.colName].toUpperCase()) {
	// 						return 1;
	// 					}
	// 					if (a[sort.colName].toUpperCase() > b[sort.colName].toUpperCase()) {
	// 						return -1;
	// 					}
	// 				}
	// 			});
	// 		}
	// 		return { ...state, [tab]: view };
	// 	});
	// }, [sort, tab]);

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

	const setSizeHandler = (selected) => {
		setSize(selected);
	};

	const sortByColHandler = (col) => {
		const colName = col.replace(" ", "");
		setSort((state) => {
			if (state.colName === colName) {
				if (!state.ascending) {
					return { colName: null, ascending: null };
				} else {
					return { colName: colName, ascending: false };
				}
			} else {
				return { colName: colName, ascending: true };
			}
		});
	};

	const renderPagination = () => {
		const nPages = Math.ceil(allUsers[tab].length / size);
		const renderPages = () => {
			if (nPages <= 7) {
				return (
					<>
						{[...Array(nPages).keys()].map((p) => (
							<button key={p} className={`${classes.pageBtn} ${p === page ? classes.activePage : ""}`} onClick={() => setPage(p)}>
								{p + 1}
							</button>
						))}
					</>
				);
			} else {
				if (page <= 3) {
					return (
						<>
							{[...Array(5).keys()].map((p) => (
								<button key={p} className={`${classes.pageBtn} ${p === page ? classes.activePage : ""}`} onClick={() => setPage(p)}>
									{p + 1}
								</button>
							))}
							<button className={classes.pageBtn} style={{ pointerEvents: "none" }}>
								...
							</button>
							<button className={classes.pageBtn} onClick={() => setPage(nPages - 1)}>
								{nPages}
							</button>
						</>
					);
				} else if (nPages - page <= 4) {
					return (
						<>
							<button className={classes.pageBtn} onClick={() => setPage(0)}>
								1
							</button>
							<button className={classes.pageBtn}>...</button>
							{[...Array(5).keys()].reverse().map((p) => (
								<button key={p} className={`${classes.pageBtn} ${nPages - p - 1 === page ? classes.activePage : ""}`} onClick={() => setPage(nPages - p - 1)}>
									{nPages - p}
								</button>
							))}
						</>
					);
				} else {
					return (
						<>
							<button className={classes.pageBtn} onClick={() => setPage(0)}>
								1
							</button>
							<button className={classes.pageBtn} style={{ pointerEvents: "none" }}>
								...
							</button>
							{[-1, 0, 1].map((p) => (
								<button key={p} className={`${classes.pageBtn} ${p === 0 ? classes.activePage : ""}`} onClick={() => setPage(page + p)}>
									{page + p + 1}
								</button>
							))}
							<button className={classes.pageBtn} style={{ pointerEvents: "none" }}>
								...
							</button>
							<button className={classes.pageBtn} onClick={() => setPage(nPages - 1)}>
								{nPages}
							</button>
						</>
					);
				}
			}
		};
		return (
			<>
				<i className={`material-icons-outlined ${classes.pageBtn} ${page === 0 || nPages <= 7 ? classes.disabled : ""}`} onClick={() => setPage((state) => state - 1)}>
					navigate_before
				</i>
				<div className={classes.pages}>{renderPages()}</div>
				<i className={`material-icons-outlined ${classes.pageBtn} ${page + 1 === nPages || nPages <= 7 ? classes.disabled : ""}`} onClick={() => setPage((state) => state + 1)}>
					navigate_next
				</i>
			</>
		);
	};

	return (
		<div className={classes.adminConsole}>
			<div className={classes.controls}>
				<div className={classes.mainBtnContainer}>
					{!isChecked[tab] && (
						<>
							<button className={`${classes.tab} ${tab === "learners" ? classes.active : ""}`} onClick={() => setTab("learners")}>
								<i className="material-icons-outlined">backpack</i> Learners
							</button>
							<button className={`${classes.tab} ${tab === "educators" ? classes.active : ""}`} onClick={() => setTab("educators")}>
								<i className="material-icons-outlined">school</i> Educators
							</button>
							<button className={`${classes.tab} ${tab === "admins" ? classes.active : ""}`} onClick={() => setTab("admins")}>
								<i className="material-icons-outlined">verified_user</i> Admins
							</button>
						</>
					)}
					{isChecked[tab] && (
						<>
							<div className={classes.nSelected}>{allUsers[tab].filter((d) => d.checked).length} selected</div>
							<div className={classes.actions}>
								<button>
									<i className="material-icons-outlined">password</i>
									<div className={classes.title}>Reset password</div>
								</button>
								{tab !== "learner" && (
									<button>
										<i className="material-icons-outlined">add_moderator</i>
										<div className={classes.title}>Promote to Admin</div>
									</button>
								)}
								<button>
									<i className="material-icons-outlined">person_remove</i>
									<div className={classes.title}>Remove from org</div>
								</button>
							</div>
						</>
					)}
				</div>
				<div className={classes.otherBtnContainer}>
					<div className={classes.search}>
						<input placeholder="Search" />
						<i className="material-icons-outlined">search</i>
					</div>
					<button className={classes.toggleHeader} onClick={() => setCollapseHeader((state) => !state)}>
						<span>{collapseHeader ? "Collapse" : "Expand"}</span>
						<i className="material-icons-outlined" style={{ transform: collapseHeader && "rotate(180deg)" }}>
							expand_less
						</i>
					</button>
				</div>
			</div>
			<div className={classes.tableHead}>
				<button className={`${classes.colName} ${classes.check} ${isChecked[tab] ? classes.checked : ""}`} onClick={toggleAllCheckboxHandler} title={isChecked[tab] ? "Deselect all" : "Select all"}>
					<i className="material-icons-outlined">remove</i>
				</button>
				{columns[tab].map((c) => (
					<button key={c} className={`${classes.colName} ${classes[c.replace(" ", "")]} ${sort.colName === c.replace(" ", "") ? classes.active : ""}`} onClick={sortByColHandler.bind(this, c)}>
						<span>{c}</span> <i className={`material-icons-outlined ${sort.ascending ? classes.ascending : classes.descending}`}>arrow_upward</i>
					</button>
				))}
			</div>
			<div className={`${classes.table} roundScrollbar`}>
				<Table allUsers={allUsers} tab={tab} page={page} size={size} checkHandler={checkHandler} columns={columns} sort={sort} />
			</div>
			<div className={classes.tableFooter}>
				<div className={classes.viewSize}>
					View
					<button className={`${classes.viewSizeBtn} ${showSizeMenu ? classes.show : ""}`} onClick={() => setShowSizeMenu((state) => !state)} onBlur={() => setShowSizeMenu(false)}>
						<span>{size}</span> <i className="material-icons-outlined">expand_less</i>
						<div className={classes.viewSizeMenu}>
							{sizes.map((o) => (
								<div key={o} onClick={() => setSizeHandler(o)}>
									{o}
								</div>
							))}
						</div>
					</button>
					per page
				</div>
				<div className={classes.pagination}>{renderPagination()}</div>
				<div className={classes.results}>
					{page * size + 1} - {Math.min(page * size + size + 1, allUsers[tab].length)} of {allUsers[tab].length} {tab}
				</div>
			</div>
		</div>
	);
};

export default AdminConsole;
