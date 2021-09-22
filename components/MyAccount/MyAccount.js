import { useEffect, useState } from "react";
import Head from "next/head";
import DeleteAccModal from "./DeleteAccModal";
import MyProfile from "./MyProfile";
import MyOrg from "./MyOrg";

import classes from "./MyAccount.module.scss";
import MySecurity from "./MySecurity";
import { useRouter } from "next/dist/client/router";
import MyVerification from "./MyVerification";

const menu = [
	{ query: "profile", h1: "Profile", icon: "assignment_ind", show: () => true },
	{ query: "verification", h1: "Verification", icon: "how_to_reg", show: (type) => ["admin", "educator"].includes(type) },
	{ query: "org", h1: "Organisation", icon: "supervisor_account", show: () => true },
	{ query: "security", h1: "Security", icon: "lock", show: () => true },
];

const MyAccount = ({ user, setUser }) => {
	const router = useRouter();
	const [deletingAcc, setDeletingAcc] = useState(false);
	const [activeTab, setActiveTab] = useState(menu[0].query);

	useEffect(() => {
		console.log(router.query);
		const query = router.query.view[2];
		if (query === "verification") {
			if (user.type === "educator" || user.type === "admin") {
				setActiveTab(query);
			} else {
				router.replace("/user/my-account/profile");
			}
		} else if (query) {
			setActiveTab(query);
		} else {
			setActiveTab("profile");
		}
	}, [router.query]);

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
								<button key={tab.h1} className={activeTab === tab.query ? classes.active : ""} onClick={() => router.push(`/user/my-account/${tab.query}`)}>
									<i className="material-icons">{tab.icon}</i>
									<div className={classes.title}>{tab.h1}</div>
								</button>
							)
					)}
				</div>
			</div>
			<div className={classes.rightColumn}>
				{activeTab === "profile" && <MyProfile user={user} setUser={setUser} />}
				{activeTab === "verification" && <MyVerification user={user} setUser={setUser} />}
				{activeTab === "org" && <MyOrg user={user} setUser={setUser} />}
				{activeTab === "security" && <MySecurity user={user} setUser={setUser} />}
			</div>
			{deletingAcc && <DeleteAccModal setDeletingAcc={setDeletingAcc} />}
		</div>
	);
};

export default MyAccount;
