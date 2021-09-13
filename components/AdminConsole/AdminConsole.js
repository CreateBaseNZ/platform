import { useEffect, useState } from "react";
import classes from "./AdminConsole.module.scss";

const columns = {
	learners: ["display Name", "username", "joined", "invited By"],
	educators: ["display Name", "username", "email", "joined", "invited By"],
	admins: ["display Name", "username", "email", "joined", "invited By"],
};

const learnersData = [
	{ displayName: "Dainty Mink", username: "jamie-lee_monroe", joined: "21 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Ridiculous Sailfish", username: "karolina-hancock", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Joyful Komodo Dragon", username: "Aaryan_Braun", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Aphid", username: "jane_mary_doe", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Nice Clownfish", username: "Maizieryan", joined: "18 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Yummy Trout", username: "Benny_bautista", joined: "17 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Generous Tarantula", username: "Linzi-Griffin", joined: "17 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Mink", username: "jamie-lee_monroe", joined: "21 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Ridiculous Sailfish", username: "karolina-hancock", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Joyful Komodo Dragon", username: "Aaryan_Braun", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Aphid", username: "jane_mary_doe", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Nice Clownfish", username: "Maizieryan", joined: "18 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Yummy Trout", username: "Benny_bautista", joined: "17 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Generous Tarantula", username: "Linzi-Griffin", joined: "17 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Mink", username: "jamie-lee_monroe", joined: "21 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Ridiculous Sailfish", username: "karolina-hancock", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Joyful Komodo Dragon", username: "Aaryan_Braun", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Aphid", username: "jane_mary_doe", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Nice Clownfish", username: "Maizieryan", joined: "18 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Yummy Trout", username: "Benny_bautista", joined: "17 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Generous Tarantula", username: "Linzi-Griffin", joined: "17 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Ridiculous Sailfish", username: "karolina-hancock", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Joyful Komodo Dragon", username: "Aaryan_Braun", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Aphid", username: "jane_mary_doe", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Nice Clownfish", username: "Maizieryan", joined: "18 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Yummy Trout", username: "Benny_bautista", joined: "17 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Generous Tarantula", username: "Linzi-Griffin", joined: "17 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Mink", username: "jamie-lee_monroe", joined: "21 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Ridiculous Sailfish", username: "karolina-hancock", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Joyful Komodo Dragon", username: "Aaryan_Braun", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Aphid", username: "jane_mary_doe", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Nice Clownfish", username: "Maizieryan", joined: "18 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Yummy Trout", username: "Benny_bautista", joined: "17 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Generous Tarantula", username: "Linzi-Griffin", joined: "17 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Mink", username: "jamie-lee_monroe", joined: "21 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Ridiculous Sailfish", username: "karolina-hancock", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Joyful Komodo Dragon", username: "Aaryan_Braun", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Aphid", username: "jane_mary_doe", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Nice Clownfish", username: "Maizieryan", joined: "18 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Yummy Trout", username: "Benny_bautista", joined: "17 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Generous Tarantula", username: "Linzi-Griffin", joined: "17 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Mink", username: "jamie-lee_monroe", joined: "21 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Ridiculous Sailfish", username: "karolina-hancock", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Joyful Komodo Dragon", username: "Aaryan_Braun", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Aphid", username: "jane_mary_doe", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Nice Clownfish", username: "Maizieryan", joined: "18 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Yummy Trout", username: "Benny_bautista", joined: "17 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Generous Tarantula", username: "Linzi-Griffin", joined: "17 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Ridiculous Sailfish", username: "karolina-hancock", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Joyful Komodo Dragon", username: "Aaryan_Braun", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Aphid", username: "jane_mary_doe", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Nice Clownfish", username: "Maizieryan", joined: "18 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Yummy Trout", username: "Benny_bautista", joined: "17 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Generous Tarantula", username: "Linzi-Griffin", joined: "17 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Ridiculous Sailfish", username: "karolina-hancock", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Joyful Komodo Dragon", username: "Aaryan_Braun", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Aphid", username: "jane_mary_doe", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Nice Clownfish", username: "Maizieryan", joined: "18 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Yummy Trout", username: "Benny_bautista", joined: "17 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Generous Tarantula", username: "Linzi-Griffin", joined: "17 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Ridiculous Sailfish", username: "karolina-hancock", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Joyful Komodo Dragon", username: "Aaryan_Braun", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Aphid", username: "jane_mary_doe", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Nice Clownfish", username: "Maizieryan", joined: "18 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Yummy Trout", username: "Benny_bautista", joined: "17 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Generous Tarantula", username: "Linzi-Griffin", joined: "17 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Mink", username: "jamie-lee_monroe", joined: "21 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Mink", username: "jamie-lee_monroe", joined: "21 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Ridiculous Sailfish", username: "karolina-hancock", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Joyful Komodo Dragon", username: "Aaryan_Braun", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Aphid", username: "jane_mary_doe", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Nice Clownfish", username: "Maizieryan", joined: "18 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Yummy Trout", username: "Benny_bautista", joined: "17 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Generous Tarantula", username: "Linzi-Griffin", joined: "17 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Ridiculous Sailfish", username: "karolina-hancock", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Joyful Komodo Dragon", username: "Aaryan_Braun", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Aphid", username: "jane_mary_doe", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Nice Clownfish", username: "Maizieryan", joined: "18 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Yummy Trout", username: "Benny_bautista", joined: "17 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Generous Tarantula", username: "Linzi-Griffin", joined: "17 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Mink", username: "jamie-lee_monroe", joined: "21 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Ridiculous Sailfish", username: "karolina-hancock", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Joyful Komodo Dragon", username: "Aaryan_Braun", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Aphid", username: "jane_mary_doe", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Nice Clownfish", username: "Maizieryan", joined: "18 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Yummy Trout", username: "Benny_bautista", joined: "17 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Generous Tarantula", username: "Linzi-Griffin", joined: "17 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Mink", username: "jamie-lee_monroe", joined: "21 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Ridiculous Sailfish", username: "karolina-hancock", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Joyful Komodo Dragon", username: "Aaryan_Braun", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Aphid", username: "jane_mary_doe", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Nice Clownfish", username: "Maizieryan", joined: "18 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Yummy Trout", username: "Benny_bautista", joined: "17 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Generous Tarantula", username: "Linzi-Griffin", joined: "17 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Mink", username: "jamie-lee_monroe", joined: "21 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Ridiculous Sailfish", username: "karolina-hancock", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Joyful Komodo Dragon", username: "Aaryan_Braun", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Aphid", username: "jane_mary_doe", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Nice Clownfish", username: "Maizieryan", joined: "18 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Yummy Trout", username: "Benny_bautista", joined: "17 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Generous Tarantula", username: "Linzi-Griffin", joined: "17 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Ridiculous Sailfish", username: "karolina-hancock", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Joyful Komodo Dragon", username: "Aaryan_Braun", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Aphid", username: "jane_mary_doe", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Nice Clownfish", username: "Maizieryan", joined: "18 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Yummy Trout", username: "Benny_bautista", joined: "17 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Generous Tarantula", username: "Linzi-Griffin", joined: "17 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Ridiculous Sailfish", username: "karolina-hancock", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Joyful Komodo Dragon", username: "Aaryan_Braun", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Aphid", username: "jane_mary_doe", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Nice Clownfish", username: "Maizieryan", joined: "18 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Yummy Trout", username: "Benny_bautista", joined: "17 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Generous Tarantula", username: "Linzi-Griffin", joined: "17 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Ridiculous Sailfish", username: "karolina-hancock", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Joyful Komodo Dragon", username: "Aaryan_Braun", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Aphid", username: "jane_mary_doe", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Nice Clownfish", username: "Maizieryan", joined: "18 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Yummy Trout", username: "Benny_bautista", joined: "17 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Generous Tarantula", username: "Linzi-Griffin", joined: "17 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Dainty Mink", username: "jamie-lee_monroe", joined: "21 Aug 2021", invitedBy: "jane_mary_doe" },
];
const educatorsData = [
	{ displayName: "Mrs. Doe", username: "jane_mary_doe", email: "jm.doe@park.school.nz", joined: "24 Aug 2021", invitedBy: "park_admin_0" },
	{ displayName: "Mrs. Doe", username: "jane_mary_doe", email: "jm.doe@park.school.nz", joined: "24 Aug 2021", invitedBy: "park_admin_0" },
	{ displayName: "Mrs. Doe", username: "jane_mary_doe", email: "jm.doe@park.school.nz", joined: "24 Aug 2021", invitedBy: "park_admin_0" },
	{ displayName: "Mrs. Doe", username: "jane_mary_doe", email: "jm.doe@park.school.nz", joined: "24 Aug 2021", invitedBy: "park_admin_0" },
];
const adminsData = [
	{ displayName: "Mrs Doe", username: "jane_mary_doe", email: "jm.doe@hayes.school.nz", joined: "24 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Mrs Sivan", username: "valerius-sivan", email: "jm.doe@hayes.school.nz", joined: "24 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Mr Phoebe", username: "jane_mary_doe", email: "jm.doe@hayes.school.nz", joined: "24 Aug 2021", invitedBy: "jane_mary_doe" },
	{ displayName: "Ms Radmir", username: "maret_radmir", email: "jm.doe@hayes.school.nz", joined: "24 Aug 2021", invitedBy: "valerius-sivan" },
];

const sizes = [10, 20, 50, 100, "All"];

const AdminConsole = ({ user, setUser, collapseHeader, setCollapseHeader }) => {
	const [tab, setTab] = useState("learners");
	const [allUsers, setAllUsers] = useState({
		learners: learnersData.map((d) => ({ ...d, checked: false })),
		educators: educatorsData.map((d) => ({ ...d, checked: false })),
		admins: adminsData.map((d) => ({ ...d, checked: false })),
	});
	const [isChecked, setIsChecked] = useState({ learners: false, educators: false, admins: false });
	const [size, setSize] = useState(20);
	const [showSizeMenu, setShowSizeMenu] = useState(false);
	const [page, setPage] = useState(0);

	console.log(page);

	useEffect(() => {
		setIsChecked((state) => ({ ...state, [tab]: allUsers[tab].slice(page * size, page * size + size).some((d) => d.checked) }));
	}, [tab, allUsers, page, size]);

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
					<button key={c} className={`${classes.colName} ${classes[c.replace(" ", "")]}`}>
						{c}
					</button>
				))}
			</div>
			<div className={`${classes.table} roundScrollbar`}>
				{allUsers[tab].slice(page * size, page * size + size).map((values, i) => (
					<div
						key={i}
						className={`${classes.row} ${values.checked ? classes.checkedRow : ""} ${allUsers[tab][i + 1] && allUsers[tab][i + 1].checked ? classes.sharpBottom : ""}`}
						onClick={checkHandler.bind(this, i)}>
						<button className={` ${classes.check} ${values.checked ? classes.checked : ""}`}>
							<i className="material-icons-outlined">done</i>
						</button>
						{columns[tab].map((c) => (
							<div key={`${c}-${i}`} className={`${classes.cell} ${classes[c.replace(" ", "")]}`}>
								{values[c.replace(" ", "")]}
							</div>
						))}
					</div>
				))}
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
