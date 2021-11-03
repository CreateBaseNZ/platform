import { useState } from "react";
import router from "next/router";
import DeleteAccModal from "../../MyAccount/DeleteAccModal";

import MY_ACCOUNT_TABS from "../../../constants/myAccountTabs";

import classes from "./MyAccountLayout.module.scss";

const MyAccountLayout = ({ name, children }) => {
	const [deletingAcc, setDeletingAcc] = useState(false);

	return (
		<div className={`${classes.myAccount} roundScrollbar`}>
			<div className={classes.leftColumn}>
				<h1>My Account</h1>
				<div className={classes.menu}>
					{MY_ACCOUNT_TABS.map((t) => (
						<button key={t.title} className={name === t.name ? classes.active : ""} onClick={() => router.push(`/my-account/${t.name}`)}>
							<i className="material-icons">{t.icon}</i>
							{t.title}
						</button>
					))}
				</div>
			</div>
			<div className={classes.rightColumn}>{children}</div>
			{deletingAcc && <DeleteAccModal setDeletingAcc={setDeletingAcc} />}
		</div>
	);
};

export default MyAccountLayout;
