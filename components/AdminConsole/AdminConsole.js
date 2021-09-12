import { useState } from "react";
import classes from "./AdminConsole.module.scss";

const columns = ["disp Name", "username", "email", "joined", "invited By"];

const learnersData = [
	{ dispName: "Mrs. Doe", username: "jane_mary_doe", email: "jm.doe@park.school.nz", joined: "24 Aug 2021", invitedBy: "park_admin_0" },
	{ dispName: "Mrs. Doe", username: "jane_mary_doe", email: "jm.doe@park.school.nz", joined: "24 Aug 2021", invitedBy: "park_admin_0" },
	{ dispName: "Mrs. Doe", username: "jane_mary_doe", email: "jm.doe@park.school.nz", joined: "24 Aug 2021", invitedBy: "park_admin_0" },
	{ dispName: "Mrs. Doe", username: "jane_mary_doe", email: "jm.doe@park.school.nz", joined: "24 Aug 2021", invitedBy: "park_admin_0" },
];
const educatorsData = [
	{ dispName: "Mrs. Doe", username: "jane_mary_doe", email: "jm.doe@park.school.nz", joined: "24 Aug 2021", invitedBy: "park_admin_0" },
	{ dispName: "Mrs. Doe", username: "jane_mary_doe", email: "jm.doe@park.school.nz", joined: "24 Aug 2021", invitedBy: "park_admin_0" },
	{ dispName: "Mrs. Doe", username: "jane_mary_doe", email: "jm.doe@park.school.nz", joined: "24 Aug 2021", invitedBy: "park_admin_0" },
	{ dispName: "Mrs. Doe", username: "jane_mary_doe", email: "jm.doe@park.school.nz", joined: "24 Aug 2021", invitedBy: "park_admin_0" },
];
const adminsData = [
	{ dispName: "Mrs. Doe", username: "jane_mary_doe", email: "jm.doe@park.school.nz", joined: "24 Aug 2021", invitedBy: "park_admin_0" },
	{ dispName: "Mrs. Doe", username: "jane_mary_doe", email: "jm.doe@park.school.nz", joined: "24 Aug 2021", invitedBy: "park_admin_0" },
	{ dispName: "Mrs. Doe", username: "jane_mary_doe", email: "jm.doe@park.school.nz", joined: "24 Aug 2021", invitedBy: "park_admin_0" },
	{ dispName: "Mrs. Doe", username: "jane_mary_doe", email: "jm.doe@park.school.nz", joined: "24 Aug 2021", invitedBy: "park_admin_0" },
];

const AdminConsole = ({ user, setUser, collapseHeader, setCollapseHeader }) => {
	const [tab, setTab] = useState("learners");
	const [allUsers, setAllUsers] = useState({
		learners: learnersData.map((d) => ({ ...d, checked: false })),
		educators: educatorsData.map((d) => ({ ...d, checked: false })),
		admins: adminsData.map((d) => ({ ...d, checked: false })),
	});

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
				<button className={`${classes.colName} ${classes.check} ${allUsers[tab].some((d) => d.checked) ? classes.checked : ""}`}>
					<i className="material-icons-outlined">done</i>
				</button>
				{columns.map((c) => (
					<button key={c} className={`${classes.colName} ${classes[c.replace(" ", "")]}`}>
						{c}
					</button>
				))}
			</div>
			<div className={classes.table}>
				{tab === "learners" &&
					allUsers[tab].map((values, i) => (
						<div className={`${classes.row} ${values.checked ? classes.checkedRow : ""}`} onClick={checkHandler.bind(this, i)}>
							<button className={`${classes.colName} ${classes.check} ${values.checked ? classes.checked : ""}`}>
								<i className="material-icons-outlined">done</i>
							</button>
							{columns.map((c) => (
								<div className={`${classes.cell} ${classes[c.replace(" ", "")]}`}>{values[c.replace(" ", "")]}</div>
							))}
						</div>
					))}
			</div>
		</div>
	);
};

export default AdminConsole;
