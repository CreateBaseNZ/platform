import Head from "next/head";
import AuthBackground from "../../components/Auth/AuthBackground";
import AuthCard from "../../components/Auth/AuthCard";

import classes from "/styles/auth.module.scss";

const Signup = () => {
	return (
		<div className={classes.auth}>
			<Head>
				<title>Sign Up | CreateBase</title>
				<meta name="description" content="Log into your CreateBase account" />
			</Head>
			<AuthBackground>
				<AuthCard isSignup={true} />
			</AuthBackground>
		</div>
	);
};

export default Signup;
