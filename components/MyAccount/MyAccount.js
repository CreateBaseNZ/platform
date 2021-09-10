import { useState } from "react";
import Head from "next/head";
import DeleteAccModal from "./DeleteAccModal";
import MyProfile from "./MyProfile";
import MyOrg from "./MyOrg";

import classes from "./MyAccount.module.scss";
import MySecurity from "./MySecurity";

const menu = [
	{ h1: "Profile", icon: "assignment_ind", show: () => true },
	{ h1: "Verify", icon: "how_to_reg", show: (type) => ["admin", "educator"].includes(type) },
	{ h1: "Organisation", icon: "supervisor_account", show: (type) => ["admin", "educator"].includes(type) },
	{ h1: "Security", icon: "lock", show: () => true },
];

const MyAccount = ({ user, setUser }) => {
	const [deletingAcc, setDeletingAcc] = useState(false);
	const [activeTab, setActiveTab] = useState(menu[0].h1);

	console.log(user);

	return (
		<div className={`${classes.myAccount} roundScrollbar`}>
			<Head>
				<title>{user.displayName && user.displayName + " | "} CreateBase</title>
				<meta name="description" content="Edit account settings for your CreateBase account. Join an existing organisation or register yours." />
			</Head>
			<div className={classes.leftColumn}>
				<h1>My Account</h1>
				<div className={classes.menu}>
					{menu.map(
						(tab) =>
							tab.show(user.type) && (
								<button key={tab.h1} className={activeTab === tab.h1 ? classes.active : ""} onClick={() => setActiveTab(tab.h1)}>
									<i className="material-icons">{tab.icon}</i>
									<div className={classes.title}>{tab.h1}</div>
								</button>
							)
					)}
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
