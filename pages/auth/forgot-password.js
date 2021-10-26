import { useRouter } from "next/router";
import Head from "next/head";
import AuthBackground from "../../components/Auth/AuthBackground";
import ForgotPasswordForm from "../../components/Auth/ForgotPasswordForm";

import classes from "/styles/auth.module.scss";

const ForgotPassword = () => {
	const router = useRouter();

	return (
		<div className={classes.auth}>
			<Head>
				<title>Forgot Password | CreateBase</title>
				<meta name="description" content="Log into your CreateBase account" />
			</Head>
			<AuthBackground>
				<ForgotPasswordForm code={router?.query?.ocl} email={router?.query?.email} />
			</AuthBackground>
		</div>
	);
};

export default ForgotPassword;
