import { useContext, useState } from "react";
import Head from "next/head";
import VisualBellContext from "../../store/visual-bell-context";
import OrgCard from "./OrgCard";
import DeleteAccModal from "./DeleteAccModal";
import MyProfile from "./MyProfile";
import MyOrg from "./MyOrg";

import classes from "./MyAccount.module.scss";
import MySecurity from "./MySecurity";

const menu = [
	{ h1: "Profile", h2: "Display name", icon: "assignment_ind" },
	{ h1: "Organisation", h2: "Register, Join, View", icon: "supervisor_account" },
	{ h1: "Security", h2: "Password", icon: "lock" },
];

const MyAccount = ({ user, setUser }) => {
	const ctx = useContext(VisualBellContext);
	const [deletingAcc, setDeletingAcc] = useState(false);
	const [activeTab, setActiveTab] = useState(menu[0].h1);

	return (
		<div className={`${classes.myAccount} roundScrollbar`}>
			<Head>
				<title>{user.displayName && user.displayName + " | "} CreateBase</title>
				<meta name="description" content="Edit account settings for your CreateBase account. Join an existing organisation or register yours." />
			</Head>
			<div className={classes.leftColumn}>
				<h1>My Account</h1>
				<div className={classes.menu}>
					{menu.map((tab) => (
						<button key={tab.h1} className={activeTab === tab.h1 ? classes.active : ""} onClick={() => setActiveTab(tab.h1)}>
							<i className="material-icons">{tab.icon}</i>
							<div className={classes.title}>{tab.h1}</div>
						</button>
					))}
				</div>
			</div>
			<div className={classes.rightColumn}>
				{activeTab === "Profile" && <MyProfile user={user} setUser={setUser} />}
				{activeTab === "Organisation" && <MyOrg user={user} setUser={setUser} />}
				{activeTab === "Security" && <MySecurity user={user} setUser={setUser} />}
			</div>
			{deletingAcc && <DeleteAccModal setDeletingAcc={setDeletingAcc} />}
		</div>
	);
};

export default MyAccount;
