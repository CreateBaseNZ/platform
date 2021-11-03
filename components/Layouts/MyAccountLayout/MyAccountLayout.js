import { useContext, useEffect, useState } from "react";
import DeleteAccModal from "../../MyAccount/DeleteAccModal";

import GlobalSessionContext from "../../../store/global-session-context";
// import MyProfile from "./MyProfile";
// import MyOrg from "./MyOrg";

// import MySecurity from "./MySecurity";
import router from "next/router";
// import MyVerification from "./MyVerification";
import MY_ACCOUNT_TABS from "../../../constants/myAccountTabs";

import classes from "./MyAccountLayout.module.scss";

const MyAccountLayout = ({ name, children }) => {
	const { globalSession } = useContext(GlobalSessionContext);
	const [deletingAcc, setDeletingAcc] = useState(false);

	return (
		<div className={`${classes.myAccount} roundScrollbar`}>
			<div className={classes.leftColumn}>
				<h1>My Account</h1>
				<div className={classes.menu}>
					{MY_ACCOUNT_TABS.map((t) => (
						<button key={t.title} className={name === t.name ? classes.active : ""} onClick={() => router.push(`/user/my-account/${t.name}`)}>
							<i className="material-icons">{t.icon}</i>
							<div className={classes.title}>{t.title}</div>
						</button>
					))}
				</div>
			</div>
			<div className={classes.rightColumn}>
				{/* {activeTab === "profile" && <MyProfile user={user} setUser={setUser} />}
				{activeTab === "verification" && <MyVerification user={user} setUser={setUser} />}
				{activeTab === "org" && <MyOrg user={user} setUser={setUser} />}
				{activeTab === "security" && <MySecurity user={user} setUser={setUser} />} */}
				{children}
			</div>
			{deletingAcc && <DeleteAccModal setDeletingAcc={setDeletingAcc} />}
		</div>
	);
};

export default MyAccountLayout;
