import Head from "next/head";

import classes from "./MyAccount.module.scss";

const MyVerify = ({ user, setUser }) => {
	return (
		<div className={classes.myView}>
			<Head>
				<title>Verify • {user.displayName} | CreateBase</title>
				<meta name="description" content="Verify your account to secure your account and join or register an organisation. CreateBase" />
			</Head>
			<div className={classes.section}>
				<h2>Verify account</h2>
			</div>
		</div>
	);
};

export default MyVerify;
