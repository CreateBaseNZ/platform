import { useEffect, useState } from "react";
import classes from "./AdminConsole.module.scss";

const columns = {
	learners: ["disp Name", "username", "joined", "invited By"],
	educators: ["disp Name", "username", "email", "joined", "invited By"],
	admins: ["disp Name", "username", "email", "joined", "invited By"],
};

const learnersData = [
	{ dispName: "Dainty Mink", username: "jamie-lee_monroe", joined: "21 Aug 2021", invitedBy: "jane_mary_doe" },
	{ dispName: "Ridiculous Sailfish", username: "karolina-hancock", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ dispName: "Joyful Komodo Dragon", username: "Aaryan_Braun", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ dispName: "Dainty Aphid", username: "jane_mary_doe", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ dispName: "Nice Clownfish", username: "Maizieryan", joined: "18 Aug 2021", invitedBy: "jane_mary_doe" },
	{ dispName: "Yummy Trout", username: "Benny_bautista", joined: "17 Aug 2021", invitedBy: "jane_mary_doe" },
	{ dispName: "Generous Tarantula", username: "Linzi-Griffin", joined: "17 Aug 2021", invitedBy: "jane_mary_doe" },
];
const educatorsData = [
	{ dispName: "Mrs. Doe", username: "jane_mary_doe", email: "jm.doe@park.school.nz", joined: "24 Aug 2021", invitedBy: "park_admin_0" },
	{ dispName: "Mrs. Doe", username: "jane_mary_doe", email: "jm.doe@park.school.nz", joined: "24 Aug 2021", invitedBy: "park_admin_0" },
	{ dispName: "Mrs. Doe", username: "jane_mary_doe", email: "jm.doe@park.school.nz", joined: "24 Aug 2021", invitedBy: "park_admin_0" },
	{ dispName: "Mrs. Doe", username: "jane_mary_doe", email: "jm.doe@park.school.nz", joined: "24 Aug 2021", invitedBy: "park_admin_0" },
];
const adminsData = [
	{ dispName: "Mrs Doe", username: "jane_mary_doe", email: "jm.doe@hayes.school.nz", joined: "24 Aug 2021", invitedBy: "jane_mary_doe" },
	{ dispName: "Mrs Sivan", username: "valerius-sivan", email: "jm.doe@hayes.school.nz", joined: "24 Aug 2021", invitedBy: "jane_mary_doe" },
	{ dispName: "Mr Phoebe", username: "jane_mary_doe", email: "jm.doe@hayes.school.nz", joined: "24 Aug 2021", invitedBy: "jane_mary_doe" },
	{ dispName: "Ms Radmir", username: "maret_radmir", email: "jm.doe@hayes.school.nz", joined: "24 Aug 2021", invitedBy: "valerius-sivan" },
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

	useEffect(() => {
		setIsChecked((state) => ({ ...state, [tab]: allUsers[tab].some((d) => d.checked) }));
	}, [tab, allUsers]);

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

	const setSizeHandler = (selected) => {
		setSize(selected);
	};

	return (
		<div className={classes.adminConsole}>
			<div className={classes.controls}>
				<div className={classes.mainBtnContainer}>
					<button className={`${classes.tab} ${tab === "learners" ? classes.active : ""}`} onClick={() => setTab("learners")}>
						<i className="material-icons-outlined">backpack</i> Learners
					</button>
					<button className={`${classes.tab} ${tab === "educators" ? classes.active : ""}`} onClick={() => setTab("educators")}>
						<i className="material-icons-outlined">school</i> Educators
					</button>
					<button className={`${classes.tab} ${tab === "admins" ? classes.active : ""}`} onClick={() => setTab("admins")}>
						<i className="material-icons-outlined">verified_user</i> Admins
					</button>
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
				<button className={`${classes.colName} ${classes.check} ${isChecked[tab] ? classes.checked : ""}`}>
					<i className="material-icons-outlined">done</i>
				</button>
				{columns[tab].map((c) => (
					<button key={c} className={`${classes.colName} ${classes[c.replace(" ", "")]}`}>
						{c}
					</button>
				))}
			</div>
			<div className={classes.table}>
				{allUsers[tab].map((values, i) => (
					<div
						key={i}
						className={`${classes.row} ${values.checked ? classes.checkedRow : ""} ${allUsers[tab][i + 1] && allUsers[tab][i + 1].checked ? classes.sharpBottom : ""}`}
						onClick={checkHandler.bind(this, i)}>
						<button className={`${classes.colName} ${classes.check} ${values.checked ? classes.checked : ""}`}>
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
						{size} <i className="material-icons-outlined">expand_less</i>
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
			</div>
		</div>
	);
};

export default AdminConsole;
